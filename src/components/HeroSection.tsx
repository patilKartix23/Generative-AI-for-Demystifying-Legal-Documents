import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Shield, Brain, Clock } from "lucide-react";

interface HeroSectionProps {
  onNavigate?: (view: 'hero' | 'upload' | 'dashboard' | 'test' | 'how-it-works') => void;
}

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">LegalEase</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <button 
              onClick={() => onNavigate?.('how-it-works')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Decode Legal
                <span className="gradient-hero bg-clip-text text-transparent"> Documents</span>
                <br />with AI
              </h2>
              <p className="text-xl text-muted-foreground max-w-lg">
                Transform complex legal jargon into plain English. Get instant risk assessments, 
                clause-by-clause breakdowns, and actionable insights for any legal document.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
                onClick={() => onNavigate?.('upload')}
              >
                Start Analyzing Documents
                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => onNavigate?.('how-it-works')}
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-warning" />
                <span>Results in seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <span>AI-powered analysis</span>
              </div>
            </div>
          </div>

          {/* Demo Card */}
          <div className="lg:pl-8">
            <Card className="p-6 shadow-strong bg-card/95 backdrop-blur-sm border-border/50">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                  <div className="w-8 h-8 rounded bg-primary-light flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Rental Agreement Analysis</h3>
                    <p className="text-sm text-muted-foreground">Completed in 23 seconds</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Risk Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-warning rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-warning">6/10</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between py-2 px-3 bg-success-light rounded-lg">
                      <span>Standard lease terms</span>
                      <span className="text-success font-medium">Low Risk</span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-warning-light rounded-lg">
                      <span>Security deposit clause</span>
                      <span className="text-warning font-medium">Review Needed</span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-destructive-light rounded-lg">
                      <span>Early termination penalty</span>
                      <span className="text-destructive font-medium">High Risk</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    View Full Analysis
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};