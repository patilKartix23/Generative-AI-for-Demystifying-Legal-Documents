const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const OpenAI = require('openai');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize AI client (supports both OpenAI and xAI Grok via OpenRouter)
let aiClient = null;
let aiModel = 'mock';

if (process.env.OPENROUTER_API_KEY) {
  // Use xAI Grok via OpenRouter (preferred - free with 2M context)
  aiClient = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
  });
  aiModel = 'x-ai/grok-4-fast:free';
  console.log('🤖 Using xAI Grok 4 Fast via OpenRouter');
} else if (process.env.OPENAI_API_KEY) {
  // Fallback to OpenAI
  aiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  aiModel = 'gpt-4';
  console.log('🤖 Using OpenAI GPT-4');
} else {
  console.log('🤖 Using mock AI responses (add API key to enable real AI)');
}

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:8080',
    'http://localhost:8081'
  ],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// File upload configuration
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'));
    }
  }
});

// Utility function to extract text from different file types
async function extractTextFromFile(file) {
  const { buffer, mimetype, originalname } = file;
  
  console.log(`📄 Extracting text from: ${originalname} (${mimetype}, ${buffer.length} bytes)`);
  
  try {
    switch (mimetype) {
      case 'application/pdf':
        console.log('🔍 Processing PDF with pdf-parse...');
        const pdfData = await pdfParse(buffer);
        console.log(`✅ PDF processed: ${pdfData.text.length} characters extracted`);
        return pdfData.text;
      
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        console.log('🔍 Processing DOCX with mammoth...');
        const docxResult = await mammoth.extractRawText({ buffer });
        console.log(`✅ DOCX processed: ${docxResult.value.length} characters extracted`);
        return docxResult.value;
      
      case 'application/msword':
        console.log('🔍 Processing DOC with mammoth...');
        // For older .doc files, mammoth can also handle some cases
        const docResult = await mammoth.extractRawText({ buffer });
        console.log(`✅ DOC processed: ${docResult.value.length} characters extracted`);
        return docResult.value;
      
      case 'text/plain':
        console.log('🔍 Processing TXT file...');
        const text = buffer.toString('utf-8');
        console.log(`✅ TXT processed: ${text.length} characters extracted`);
        return text;
      
      default:
        console.log(`❌ Unsupported file type: ${mimetype}`);
        throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error(`❌ Text extraction failed for ${originalname}:`, error.message);
    throw new Error(`Failed to extract text: ${error.message}`);
  }
}

// AI Analysis function
async function analyzeDocumentWithAI(text, documentType = 'legal document') {
  if (!aiClient) {
    // Return mock analysis if no AI client is configured
    return {
      summary: "This appears to be a legal document with various terms and conditions. To get a detailed, user-friendly analysis, please configure your AI API key.",
      documentType: "Legal Document",
      whatItMeans: "This document creates legal obligations between parties. Real analysis available with API configuration.",
      keyPoints: [
        "This is a demo analysis - configure your xAI Grok API key for real insights",
        "The document contains standard legal language",
        "Full analysis requires AI integration"
      ],
      potentialRisks: [
        {
          risk: "Cannot provide real risk assessment without AI configuration",
          impact: "You're missing detailed analysis of potential issues",
          advice: "Add your xAI Grok API key to get comprehensive risk analysis"
        }
      ],
      redFlags: ["API key not configured - real analysis unavailable"],
      yourRights: ["Cannot determine specific rights without AI analysis"],
      yourObligations: ["Cannot identify specific obligations without AI analysis"],
      beforeSigning: [
        "Configure your xAI Grok API key for detailed analysis",
        "Upload the document again after configuration",
        "Consider consulting a lawyer for important agreements"
      ],
      overallAssessment: "Demo mode active. Configure xAI Grok 4 Fast (free with 2M context) API key to get real, user-friendly legal document analysis.",
      complexity: "unknown",
      riskLevel: "unknown",
      aiProvider: "mock"
    };
  }

  try {
    // Use different text limits based on AI model
    const textLimit = aiModel === 'x-ai/grok-4-fast:free' ? 50000 : 8000; // Grok can handle much more text
    const limitedText = text.substring(0, textLimit);
    
    const prompt = `You are a friendly legal expert helping everyday people understand legal documents. Analyze this ${documentType} and explain it in simple, clear language that anyone can understand.

Document Text:
"""
${limitedText}
"""

Please provide your analysis in the following JSON structure:
{
  "summary": "A clear, 2-3 sentence explanation of what this document is about in everyday language",
  "documentType": "What type of legal document this is (e.g., 'Rental Agreement', 'Employment Contract', 'Terms of Service')",
  "whatItMeans": "A simple explanation of what signing this document means for the person",
  "keyPoints": [
    "Most important things you need to know (in simple words)",
    "Your main rights and responsibilities",
    "Important deadlines or requirements"
  ],
  "potentialRisks": [
    {
      "risk": "What could go wrong (in plain English)",
      "impact": "How this could affect you",
      "advice": "What you should do about it"
    }
  ],
  "redFlags": [
    "Things that seem unfair or unusual",
    "Clauses that heavily favor the other party",
    "Anything that might be hard to comply with"
  ],
  "yourRights": [
    "Important rights you have under this agreement",
    "Protections available to you",
    "What the other party must do for you"
  ],
  "yourObligations": [
    "What you must do if you sign this",
    "Important rules you need to follow",
    "Payments or actions required from you"
  ],
  "beforeSigning": [
    "Questions you should ask",
    "Things to clarify or negotiate",
    "When you might want to consult a lawyer"
  ],
  "overallAssessment": "Is this generally fair/standard, or are there concerns? Should a regular person be worried about anything specific?",
  "complexity": "simple|moderate|complex - How difficult is this for a regular person to understand?",
  "riskLevel": "low|medium|high - Overall risk level for the person signing"
}

Write everything as if you're explaining to a friend who has no legal background. Use everyday words instead of legal jargon. Be helpful and honest about potential issues.`;

    const completion = await aiClient.chat.completions.create({
      model: aiModel,
      messages: [
        {
          role: "system",
          content: "You are a helpful legal advisor who specializes in explaining complex legal documents in simple, everyday language. Your goal is to help regular people understand what they're signing and make informed decisions. Always be clear, honest, and use plain English instead of legal jargon."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: aiModel === 'x-ai/grok-4-fast:free' ? 4000 : 2000, // Use more tokens for Grok with 2M context
      temperature: 0.3
    });

    const analysisText = completion.choices[0].message.content;
    
    // Try to parse JSON from the response
    let analysis;
    try {
      // Extract JSON from the response (sometimes AI includes extra text)
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      analysis = {
        summary: "We analyzed your document and found important information",
        documentType: "Legal Document",
        whatItMeans: "This appears to be a legal agreement that creates obligations for both parties",
        keyPoints: ["Please review the full analysis above for detailed information"],
        potentialRisks: [],
        redFlags: [],
        yourRights: [],
        yourObligations: [],
        beforeSigning: ["Consider consulting with a legal professional"],
        overallAssessment: analysisText,
        complexity: "moderate",
        riskLevel: "medium"
      };
    }

    // Add AI provider info to analysis
    analysis.aiProvider = aiModel === 'x-ai/grok-4-fast:free' ? 'xAI Grok 4 Fast' : 
                         aiModel === 'gpt-4' ? 'OpenAI GPT-4' : 'mock';

    return analysis;
  } catch (error) {
    console.error('AI API error:', error);
    throw new Error(`AI analysis failed: ${error.message}`);
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0' 
  });
});

// Simple file upload test endpoint
app.post('/api/test-upload', upload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    console.log(`🧪 Test upload received: ${file.originalname} (${file.mimetype}, ${file.size} bytes)`);
    
    res.json({
      success: true,
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      message: 'File uploaded successfully (test endpoint)'
    });
  } catch (error) {
    console.error('Test upload error:', error);
    res.status(500).json({ 
      error: 'Test upload failed', 
      details: error.message 
    });
  }
});

// File upload and analysis endpoint
app.post('/api/analyze-document', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    console.log(`Processing file: ${file.originalname} (${file.mimetype})`);

    // Extract text from the uploaded file
    const extractedText = await extractTextFromFile(file);
    
    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ error: 'No text could be extracted from the file' });
    }

    console.log(`Extracted ${extractedText.length} characters from document`);

    // Analyze with AI (or mock if no API key)
    const analysis = await analyzeDocumentWithAI(extractedText);

    // Add metadata
    const result = {
      ...analysis,
      metadata: {
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        uploadDate: new Date().toISOString(),
        textLength: extractedText.length,
        processingTime: new Date().toISOString(),
        aiEnabled: !!aiClient,
        aiProvider: analysis.aiProvider || 'mock'
      }
    };

    res.json(result);

  } catch (error) {
    console.error('Document analysis error:', error);
    res.status(500).json({ 
      error: 'Document analysis failed', 
      details: error.message 
    });
  }
});

// Test endpoint for AI functionality
app.post('/api/test-ai', async (req, res) => {
  try {
    const testText = req.body.text || "This is a simple rental agreement for testing purposes.";
    const analysis = await analyzeDocumentWithAI(testText);
    res.json({
      ...analysis,
      aiEnabled: !!aiClient,
      message: aiClient ? 
        `Real AI analysis using ${analysis.aiProvider}` : 
        "Mock analysis - add xAI Grok or OpenAI API key for real results"
    });
  } catch (error) {
    console.error('AI test error:', error);
    res.status(500).json({ 
      error: 'AI test failed', 
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error', 
    details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LegalEase backend server running on port ${PORT}`);
  console.log(`📁 API endpoints available at http://localhost:${PORT}/api/`);
  
  if (aiClient) {
    if (aiModel === 'x-ai/grok-4-fast:free') {
      console.log(`🤖 AI Provider: xAI Grok 4 Fast (FREE with 2M context) ✅`);
    } else {
      console.log(`🤖 AI Provider: OpenAI GPT-4 ✅`);
    }
  } else {
    console.log(`🔑 AI API key: ❌ (using mock responses)`);
    console.log(`💡 Add OPENROUTER_API_KEY for xAI Grok (free) or OPENAI_API_KEY to .env file`);
  }
});

module.exports = app;