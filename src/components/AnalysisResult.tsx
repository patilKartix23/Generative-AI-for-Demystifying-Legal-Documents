import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DocumentAnalysis } from "@/lib/api";
import { AlertTriangle, CheckCircle, FileText, Info, Shield, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResultProps {
  analysis: DocumentAnalysis;
  fileName: string;
}

export const AnalysisResult = ({ analysis, fileName }: AnalysisResultProps) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'complex': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Document Analysis</h2>
        </div>
        <p className="text-muted-foreground">{fileName}</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Document Type</p>
              <p className="text-lg font-semibold">{analysis.documentType}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Risk Level</p>
              <Badge className={cn("text-sm", getRiskColor(analysis.riskLevel))}>
                {analysis.riskLevel.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Complexity</p>
              <Badge className={cn("text-sm", getComplexityColor(analysis.complexity))}>
                {analysis.complexity.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            What This Document Is About
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{analysis.summary}</p>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium text-sm text-muted-foreground mb-2">What this means for you:</p>
            <p>{analysis.whatItMeans}</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Key Things You Need to Know
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Red Flags */}
      {analysis.redFlags.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription>
            <p className="font-medium text-red-800 mb-2">⚠️ Things to Watch Out For:</p>
            <ul className="space-y-1">
              {analysis.redFlags.map((flag, index) => (
                <li key={index} className="text-red-700">• {flag}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Potential Risks */}
      {analysis.potentialRisks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Potential Risks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.potentialRisks.map((risk, index) => (
              <div key={index} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">{risk.risk}</h4>
                <p className="text-orange-700 mb-2"><strong>How this affects you:</strong> {risk.impact}</p>
                <p className="text-orange-700"><strong>What to do:</strong> {risk.advice}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Your Rights and Obligations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Rights */}
        {analysis.yourRights.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.yourRights.map((right, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{right}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Your Obligations */}
        {analysis.yourObligations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Your Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.yourObligations.map((obligation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 border-2 border-purple-600 rounded mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{obligation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Before Signing */}
      {analysis.beforeSigning.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Before You Sign
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.beforeSigning.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Overall Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{analysis.overallAssessment}</p>
          {analysis.aiProvider && (
            <p className="text-sm text-muted-foreground mt-4">
              Analysis powered by: {analysis.aiProvider}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};