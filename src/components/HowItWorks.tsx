import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Brain, Eye, CheckCircle, AlertTriangle } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-blue-600" />,
      title: "Upload Your Document",
      description: "Simply drag and drop or click to upload your legal document. We support PDF, DOC, DOCX, and TXT files up to 10MB.",
      details: [
        "Secure file upload with encryption",
        "Support for multiple file formats",
        "Real-time upload progress tracking",
        "File validation and size limits"
      ]
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Text Extraction",
      description: "Our system extracts and processes the text content from your document while preserving the structure and meaning.",
      details: [
        "Advanced OCR for scanned documents", 
        "Smart text extraction from PDFs",
        "Word document parsing",
        "Maintains document formatting context"
      ]
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "AI Analysis",
      description: "xAI Grok 4 Fast analyzes your document using advanced natural language processing to understand legal concepts and implications.",
      details: [
        "Powered by xAI Grok 4 Fast (2M context window)",
        "Legal language understanding",
        "Risk assessment algorithms",
        "Plain English translation"
      ]
    },
    {
      icon: <Eye className="w-8 h-8 text-orange-600" />,
      title: "User-Friendly Results",
      description: "Receive a comprehensive analysis in simple, easy-to-understand language that explains what the document means for you.",
      details: [
        "Plain English explanations",
        "Key points highlighted",
        "Risk levels clearly marked",
        "Actionable recommendations"
      ]
    }
  ];

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: "What You Get",
      items: [
        "Document summary in simple terms",
        "Your rights and responsibilities explained",
        "Potential risks and red flags identified", 
        "Important clauses highlighted",
        "Advice on what to consider before signing",
        "Overall risk assessment"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      title: "Why It Matters",
      items: [
        "Avoid signing unfavorable agreements",
        "Understand your legal obligations",
        "Make informed decisions",
        "Save time and legal fees",
        "Spot potentially problematic clauses",
        "Know your rights before committing"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">How It Works</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Transform complex legal documents into clear, understandable insights with our AI-powered analysis system
        </p>
      </div>

      {/* Step-by-step process */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">Simple 4-Step Process</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    {step.icon}
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Step {index + 1}
                    </Badge>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* What you get section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {feature.icon}
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technology section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Powered by Advanced AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
              xAI Grok 4 Fast
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <h4 className="font-semibold">2M Context Window</h4>
              <p className="text-sm text-muted-foreground">
                Can analyze extremely long and complex legal documents
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Real-time Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Get results in seconds, not hours or days
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Legal Expertise</h4>
              <p className="text-sm text-muted-foreground">
                Trained on vast legal knowledge for accurate insights
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supported documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Supported Document Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <FileText className="w-8 h-8 mx-auto text-red-600" />
              <h4 className="font-semibold">PDF Files</h4>
              <p className="text-sm text-muted-foreground">Standard PDF documents</p>
            </div>
            <div className="space-y-2">
              <FileText className="w-8 h-8 mx-auto text-blue-600" />
              <h4 className="font-semibold">Word Documents</h4>
              <p className="text-sm text-muted-foreground">DOC and DOCX files</p>
            </div>
            <div className="space-y-2">
              <FileText className="w-8 h-8 mx-auto text-green-600" />
              <h4 className="font-semibold">Text Files</h4>
              <p className="text-sm text-muted-foreground">Plain text documents</p>
            </div>
            <div className="space-y-2">
              <FileText className="w-8 h-8 mx-auto text-purple-600" />
              <h4 className="font-semibold">Legal Agreements</h4>
              <p className="text-sm text-muted-foreground">Contracts, leases, terms</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy and security */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-800">Privacy & Security</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-green-700">
            Your documents are processed securely and are not stored on our servers after analysis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
              <p className="font-semibold">Encrypted Upload</p>
              <p className="text-green-600">All files encrypted in transit</p>
            </div>
            <div>
              <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
              <p className="font-semibold">No Storage</p>
              <p className="text-green-600">Documents deleted after analysis</p>
            </div>
            <div>
              <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
              <p className="font-semibold">Privacy First</p>
              <p className="text-green-600">Your data stays private</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};