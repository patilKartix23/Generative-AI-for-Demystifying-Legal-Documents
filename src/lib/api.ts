// API configuration and service functions for LegalEase frontend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface DocumentAnalysis {
  summary: string;
  documentType: string;
  whatItMeans: string;
  keyPoints: string[];
  potentialRisks: Array<{
    risk: string;
    impact: string;
    advice: string;
  }>;
  redFlags: string[];
  yourRights: string[];
  yourObligations: string[];
  beforeSigning: string[];
  overallAssessment: string;
  complexity: 'simple' | 'moderate' | 'complex';
  riskLevel: 'low' | 'medium' | 'high';
  aiProvider?: string;
  metadata?: {
    fileName: string;
    fileSize: number;
    mimeType: string;
    uploadDate: string;
    textLength: number;
    processingTime: string;
    aiEnabled: boolean;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  details?: string;
}

// Health check endpoint
export async function checkApiHealth(): Promise<ApiResponse<{ status: string; timestamp: string; version: string }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`API health check failed: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API health check failed:', error);
    return { 
      error: 'Unable to connect to backend API',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Upload and analyze document
export async function analyzeDocument(file: File): Promise<ApiResponse<DocumentAnalysis>> {
  try {
    console.log(`📤 Uploading file: ${file.name} (${file.type}, ${file.size} bytes)`);
    
    const formData = new FormData();
    formData.append('document', file);

    const response = await fetch(`${API_BASE_URL}/analyze-document`, {
      method: 'POST',
      body: formData,
    });

    console.log(`📥 Response status: ${response.status}`);

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorData;
      
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        const errorText = await response.text();
        errorData = { error: errorText || `HTTP ${response.status}` };
      }
      
      console.error('❌ Backend error:', errorData);
      throw new Error(errorData.details || errorData.error || `Analysis failed: ${response.status}`);
    }

    const data: DocumentAnalysis = await response.json();
    console.log(`✅ Analysis complete for ${file.name}`);
    return { data };
  } catch (error) {
    console.error('❌ Document analysis failed:', error);
    return { 
      error: 'Document analysis failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Test AI functionality
export async function testAI(text?: string): Promise<ApiResponse<DocumentAnalysis & { aiEnabled: boolean; message: string }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/test-ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `AI test failed: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('AI test failed:', error);
    return { 
      error: 'AI test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Utility function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Utility function to get risk color
export function getRiskColor(risk: string): string {
  switch (risk) {
    case 'low': return 'success';
    case 'medium': return 'warning';
    case 'high': return 'destructive';
    default: return 'secondary';
  }
}