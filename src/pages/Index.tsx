import { HeroSection } from "@/components/HeroSection";
import { DocumentUpload } from "@/components/DocumentUpload";
import { AnalysisDashboard } from "@/components/AnalysisDashboard";
import { ApiTest } from "@/components/ApiTest";
import { HowItWorks } from "@/components/HowItWorks";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'upload' | 'dashboard' | 'test' | 'how-it-works'>('hero');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'upload':
        return <DocumentUpload />;
      case 'dashboard':
        return <AnalysisDashboard />;
      case 'test':
        return <ApiTest />;
      case 'how-it-works':
        return <HowItWorks />;
      default:
        return <HeroSection onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation for demo purposes */}
      {currentView !== 'hero' && (
        <div className="fixed top-4 left-4 z-50 flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentView('hero')}
          >
            Home
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentView('how-it-works')}
          >
            How It Works
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentView('upload')}
          >
            Upload
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentView('test')}
          >
            API Test
          </Button>
        </div>
      )}

      {/* Demo buttons on hero page */}
      {currentView === 'hero' && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
          <Button 
            variant="hero" 
            onClick={() => setCurrentView('upload')}
          >
            Try Upload Demo
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('how-it-works')}
          >
            How It Works
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('dashboard')}
          >
            View Analysis Demo
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('test')}
          >
            Test API Connection
          </Button>
        </div>
      )}

      {renderCurrentView()}
    </div>
  );
};

export default Index;
