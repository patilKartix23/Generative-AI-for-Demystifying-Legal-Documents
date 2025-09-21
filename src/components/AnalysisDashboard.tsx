import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye,
  Download,
  Share,
  MessageCircle,
  TrendingUp,
  Users,
  Calendar
} from "lucide-react";

interface RiskItem {
  clause: string;
  risk: 'low' | 'medium' | 'high';
  description: string;
}

interface DocumentAnalysis {
  title: string;
  type: string;
  uploadDate: string;
  complexity: number;
  overallRisk: number;
  processingTime: string;
  pageCount: number;
  wordCount: number;
  risks: RiskItem[];
}

const mockAnalysis: DocumentAnalysis = {
  title: "Residential Lease Agreement - 123 Main St",
  type: "Rental Agreement",
  uploadDate: "2024-01-15",
  complexity: 6.5,
  overallRisk: 6.2,
  processingTime: "23 seconds",
  pageCount: 8,
  wordCount: 2847,
  risks: [
    {
      clause: "Security Deposit Terms (Section 3.2)",
      risk: 'low',
      description: "Standard security deposit amount and terms"
    },
    {
      clause: "Early Termination Clause (Section 8.1)",
      risk: 'high',
      description: "Requires 3 months rent penalty for early termination"
    },
    {
      clause: "Maintenance Responsibilities (Section 5.4)",
      risk: 'medium',
      description: "Tenant responsible for HVAC repairs over $200"
    },
    {
      clause: "Automatic Renewal Terms (Section 9.3)",
      risk: 'medium',
      description: "Auto-renews unless 60-day notice given"
    },
    {
      clause: "Pet Policy (Section 6.7)",
      risk: 'low',
      description: "Standard pet deposit and monthly fees"
    }
  ]
};

export const AnalysisDashboard = () => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <Shield className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{mockAnalysis.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge variant="outline" className="bg-primary-light text-primary">
              {mockAnalysis.type}
            </Badge>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Analyzed {mockAnalysis.uploadDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {mockAnalysis.processingTime}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MessageCircle className="w-4 h-4" />
            Ask Questions
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Risk</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-warning">{mockAnalysis.overallRisk}/10</p>
                <Badge variant="secondary" className="bg-warning-light text-warning">Medium</Badge>
              </div>
            </div>
          </div>
          <Progress value={mockAnalysis.overallRisk * 10} className="mt-4" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <FileText className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Complexity</p>
              <p className="text-2xl font-bold text-foreground">{mockAnalysis.complexity}/10</p>
              <p className="text-xs text-muted-foreground">College level</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Document Size</p>
              <p className="text-2xl font-bold text-foreground">{mockAnalysis.pageCount}</p>
              <p className="text-xs text-muted-foreground">{mockAnalysis.wordCount.toLocaleString()} words</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Issues Found</p>
              <p className="text-2xl font-bold text-destructive">
                {mockAnalysis.risks.filter(r => r.risk === 'high').length}
              </p>
              <p className="text-xs text-muted-foreground">High risk clauses</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Risk Analysis */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Clause Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Clause Analysis</h2>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
                View Full Document
              </Button>
            </div>

            <div className="space-y-4">
              {mockAnalysis.risks.map((risk, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:shadow-soft transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getRiskIcon(risk.risk)}
                        <h3 className="font-medium text-foreground">{risk.clause}</h3>
                        <Badge 
                          variant={getRiskColor(risk.risk) as any}
                          className="ml-auto"
                        >
                          {risk.risk.charAt(0).toUpperCase() + risk.risk.slice(1)} Risk
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      Ask AI
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Risk Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Risk Distribution</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-sm font-medium">Low Risk</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {mockAnalysis.risks.filter(r => r.risk === 'low').length} clauses
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-sm font-medium">Medium Risk</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {mockAnalysis.risks.filter(r => r.risk === 'medium').length} clauses
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span className="text-sm font-medium">High Risk</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {mockAnalysis.risks.filter(r => r.risk === 'high').length} clause
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
            
            <div className="space-y-3">
              <Button variant="hero" className="w-full justify-start">
                <MessageCircle className="w-4 h-4" />
                Ask About This Document
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4" />
                Generate Summary Report
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Share className="w-4 h-4" />
                Share with Lawyer
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-warning-light/50 border-warning/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-medium text-warning">Attention Required</h4>
                <p className="text-sm text-muted-foreground">
                  This document contains 1 high-risk clause that may require legal review before signing.
                </p>
                <Button variant="warning" size="sm">
                  Review High-Risk Items
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};