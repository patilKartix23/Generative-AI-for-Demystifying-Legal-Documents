# 📄 LegalEase - AI-Powered Legal Document Analysis

> Transform complex legal jargon into plain English with AI-powered document analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

## 🎯 Overview

LegalEase is a comprehensive web application that uses advanced AI to analyze legal documents and provide clear, user-friendly explanations. Built for non-lawyers who need to understand contracts, agreements, and other legal documents without requiring a law degree.

### ✨ Key Features

- 🤖 **AI-Powered Analysis**: Leverages xAI Grok 4 Fast with 2M context window
- 📝 **Plain English Translation**: Converts legal jargon into understandable language
- ⚡ **Real-time Processing**: Get analysis results in seconds
- 🛡️ **Risk Assessment**: Identifies potential risks and red flags
- 📋 **Comprehensive Reports**: Detailed breakdown of rights, obligations, and recommendations
- 🔒 **Privacy First**: Documents are processed securely and not stored
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Live Demo

**Frontend**: [http://localhost:8080](http://localhost:8080)  
**Backend API**: [http://localhost:3001](http://localhost:3001)

## 📋 What You Get

When you upload a legal document, LegalEase provides:

- **Document Summary**: Clear explanation of what the document is about
- **Key Points**: Most important things you need to know
- **Your Rights**: What protections and benefits you have
- **Your Obligations**: What you must do and responsibilities
- **Potential Risks**: Things that could go wrong and their impact
- **Red Flags**: Unusual or concerning clauses to watch out for
- **Before Signing**: Important questions and considerations
- **Overall Assessment**: General fairness and risk evaluation

## 🛠️ Technology Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** for fast development and building
- **shadcn/ui** for beautiful, accessible UI components
- **Tailwind CSS** for responsive styling
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **xAI Grok 4 Fast** via OpenRouter API for AI analysis
- **Multer** for file upload handling
- **pdf-parse** for PDF text extraction
- **mammoth** for Word document processing
- **CORS** enabled for cross-origin requests

### Supported Document Formats
- 📄 **PDF** (.pdf)
- 📝 **Microsoft Word** (.doc, .docx)
- 📋 **Text Files** (.txt)
- **File Size Limit**: 10MB per document

## 🎯 How It Works

### 1. 📤 Upload Your Document
- Drag and drop or click to upload
- Supports PDF, DOC, DOCX, and TXT files
- Real-time upload progress tracking
- Secure file validation

### 2. 🔍 Text Extraction
- Advanced text extraction from PDFs
- Smart Word document parsing
- Maintains document structure and context
- OCR capabilities for scanned documents

### 3. 🧠 AI Analysis
- Powered by xAI Grok 4 Fast (2M context window)
- Legal language understanding
- Risk assessment algorithms
- Plain English translation

### 4. 📊 User-Friendly Results
- Comprehensive analysis in simple terms
- Visual risk indicators
- Actionable recommendations
- Easy-to-understand explanations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- xAI API key (for AI analysis)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/patilKartix23/Generative-AI-for-Demystifying-Legal-Documents.git
cd Generative-AI-for-Demystifying-Legal-Documents
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Set up environment variables**

Create `backend/.env` file:
```env
# AI Configuration
XAI_API_KEY=your_xai_api_key_here
OPENAI_API_KEY=your_openai_api_key_here (optional)

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:8080
```

5. **Start the backend server**
```bash
cd backend
node server.js
```

6. **Start the frontend development server**
```bash
cd ..
npm run dev
```

7. **Open your browser**
- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend API: [http://localhost:3001](http://localhost:3001)

## 🔧 Configuration

### AI Provider Setup

#### xAI Grok (Recommended - Free Tier Available)
1. Get your API key from [OpenRouter](https://openrouter.ai/)
2. Add to `backend/.env`: `XAI_API_KEY=your_key_here`
3. Model: `x-ai/grok-4-fast:free` (2M context window)

#### OpenAI (Alternative)
1. Get your API key from [OpenAI](https://openai.com/)
2. Add to `backend/.env`: `OPENAI_API_KEY=your_key_here`
3. Model: `gpt-4` or `gpt-3.5-turbo`

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `XAI_API_KEY` | xAI API key for Grok model | Required for AI analysis |
| `OPENAI_API_KEY` | OpenAI API key (alternative) | Optional |
| `PORT` | Backend server port | 3001 |
| `NODE_ENV` | Environment mode | development |
| `CORS_ORIGIN` | Frontend URL for CORS | http://localhost:8080 |

## 📂 Project Structure

```
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── DocumentUpload.tsx    # File upload interface
│   │   ├── AnalysisResult.tsx    # Analysis results display
│   │   ├── HowItWorks.tsx        # How it works explanation
│   │   └── HeroSection.tsx       # Landing page hero
│   ├── lib/                      # Utility functions
│   │   ├── api.ts                # API service functions
│   │   └── utils.ts              # Helper utilities
│   ├── pages/                    # Page components
│   │   ├── Index.tsx             # Main page
│   │   └── NotFound.tsx          # 404 page
│   └── App.tsx                   # Main app component
├── backend/                      # Backend source code
│   ├── server.js                 # Express server
│   ├── package.json              # Backend dependencies
│   └── .env                      # Environment variables
├── public/                       # Static assets
├── package.json                  # Frontend dependencies
└── README.md                     # This file
```

## 🧪 Testing

### Test the Backend API

```bash
# Health check
curl http://localhost:3001/api/health

# Test file upload (PowerShell)
Invoke-RestMethod -Uri "http://localhost:3001/api/analyze" -Method POST -Form @{document = Get-Item "path/to/document.pdf"}
```

### Test the Frontend
1. Open [http://localhost:8080](http://localhost:8080)
2. Upload a test document
3. View the analysis results

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:

```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
Deploy to services like Heroku, Railway, or any Node.js hosting:

```bash
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Documentation

### Endpoints

#### `GET /api/health`
Health check endpoint
- **Response**: `{ status: "healthy", timestamp: "...", version: "1.0.0" }`

#### `POST /api/analyze`
Analyze a legal document
- **Body**: FormData with `document` file
- **Response**: Document analysis object
- **Supported formats**: PDF, DOC, DOCX, TXT
- **Max file size**: 10MB

### Response Format

```json
{
  "analysis": {
    "summary": "Document summary in plain English",
    "documentType": "Type of legal document",
    "whatItMeans": "What this means for the user",
    "keyPoints": ["Important points to know"],
    "potentialRisks": [
      {
        "risk": "Description of risk",
        "impact": "How it affects you",
        "advice": "What to do about it"
      }
    ],
    "redFlags": ["Things to watch out for"],
    "yourRights": ["Your rights under this document"],
    "yourObligations": ["Your responsibilities"],
    "beforeSigning": ["Things to consider before signing"],
    "overallAssessment": "General assessment of the document",
    "complexity": "simple|moderate|complex",
    "riskLevel": "low|medium|high",
    "aiProvider": "xAI Grok 4 Fast"
  },
  "metadata": {
    "fileName": "document.pdf",
    "fileSize": 1024000,
    "processingTime": "2.3s"
  }
}
```

## 🔐 Privacy & Security

- ✅ **Encrypted uploads**: All files are encrypted during transmission
- ✅ **No storage**: Documents are deleted immediately after processing
- ✅ **Privacy first**: Your data is never stored or shared
- ✅ **Secure API**: Protected endpoints with proper validation
- ✅ **CORS protection**: Configured for secure cross-origin requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **xAI Grok** for powerful legal document analysis
- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for responsive styling
- **React** ecosystem for robust frontend development

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/patilKartix23/Generative-AI-for-Demystifying-Legal-Documents/issues) page
2. Create a new issue if your problem isn't already reported
3. Include error messages and steps to reproduce

---

**Built with ❤️ for making legal documents accessible to everyone**
