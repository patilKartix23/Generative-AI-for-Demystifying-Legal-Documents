import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { checkApiHealth, testAI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

export const ApiTest = () => {
  const [healthStatus, setHealthStatus] = useState<string>('Not checked');
  const [aiStatus, setAiStatus] = useState<string>('Not tested');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const testHealth = async () => {
    setLoading(true);
    try {
      const result = await checkApiHealth();
      if (result.data) {
        setHealthStatus(`✅ Healthy - ${result.data.status} (${result.data.version})`);
        toast({
          title: "API Health Check",
          description: "Backend API is running successfully!",
        });
      } else {
        setHealthStatus(`❌ Failed - ${result.error}`);
        toast({
          title: "API Health Check Failed",
          description: result.error || "Unknown error",
          variant: "destructive"
        });
      }
    } catch (error) {
      setHealthStatus(`❌ Error - ${error}`);
    }
    setLoading(false);
  };

  const testAIFunctionality = async () => {
    setLoading(true);
    try {
      const result = await testAI("This is a test rental agreement for API testing.");
      if (result.data) {
        const status = result.data.aiEnabled ? 
          `✅ AI Working - Real OpenAI analysis` : 
          `⚠️ Mock Mode - ${result.data.message}`;
        setAiStatus(status);
        toast({
          title: "AI Test Result",
          description: result.data.message || "AI test completed",
        });
      } else {
        setAiStatus(`❌ Failed - ${result.error}`);
        toast({
          title: "AI Test Failed",
          description: result.error || "Unknown error",
          variant: "destructive"
        });
      }
    } catch (error) {
      setAiStatus(`❌ Error - ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">API Connection Test</h2>
        <p className="text-muted-foreground">
          Test the connection between frontend and backend services
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">Backend Health Check</h3>
        <p className="text-sm text-muted-foreground">Status: {healthStatus}</p>
        <Button onClick={testHealth} disabled={loading}>
          Test Backend Connection
        </Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">AI Analysis Test</h3>
        <p className="text-sm text-muted-foreground">Status: {aiStatus}</p>
        <Button onClick={testAIFunctionality} disabled={loading}>
          Test AI Functionality
        </Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">API Configuration</h3>
        <div className="text-sm space-y-2">
          <p><strong>Frontend URL:</strong> http://localhost:8081</p>
          <p><strong>Backend URL:</strong> http://localhost:3001/api</p>
          <p><strong>AI Provider:</strong> xAI Grok 4 Fast (free with 2M context) or OpenAI GPT-4</p>
          <p><strong>Status:</strong> {process.env.NODE_ENV === 'development' ? 'Add API key to enable real AI analysis' : 'Configured'}</p>
        </div>
      </Card>
    </div>
  );
};