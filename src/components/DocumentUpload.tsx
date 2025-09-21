import { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeDocument, DocumentAnalysis } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { AnalysisResult } from "./AnalysisResult";

interface UploadedFile {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  analysis?: DocumentAnalysis;
  error?: string;
}

export const DocumentUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<{ analysis: DocumentAnalysis; fileName: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  };

  const processFiles = async (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
    });

    if (validFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please upload PDF, DOC, DOCX, or TXT files under 10MB.",
        variant: "destructive"
      });
      return;
    }

    const uploadedFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      status: 'pending',
      progress: 0
    }));

    setFiles(prev => [...prev, ...uploadedFiles]);

    // Process each file with real API
    for (const uploadFile of uploadedFiles) {
      try {
        // Set to uploading status
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id ? { ...f, status: 'uploading', progress: 10 } : f
        ));

        // Call the real API
        const result = await analyzeDocument(uploadFile.file);

        if (result.error || !result.data) {
          throw new Error(result.error || 'Analysis failed');
        }

        // Success - update with analysis results
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id ? { 
            ...f, 
            status: 'success', 
            progress: 100,
            analysis: result.data 
          } : f
        ));

        toast({
          title: "Analysis complete",
          description: `Successfully analyzed ${uploadFile.file.name}`,
        });

      } catch (error) {
        // Error handling
        const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
        
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id ? { 
            ...f, 
            status: 'error', 
            progress: 0,
            error: errorMessage 
          } : f
        ));

        toast({
          title: "Analysis failed",
          description: `Failed to analyze ${uploadFile.file.name}: ${errorMessage}`,
          variant: "destructive"
        });
      }
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') return <FileText className="w-5 h-5 text-destructive" />;
    return <File className="w-5 h-5 text-primary" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {selectedAnalysis ? (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedAnalysis(null)}
            className="mb-4"
          >
            ← Back to Upload
          </Button>
          <AnalysisResult 
            analysis={selectedAnalysis.analysis} 
            fileName={selectedAnalysis.fileName} 
          />
        </div>
      ) : (
        <>
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Upload Your Legal Document</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Drop your contract, agreement, or legal document here. Our AI will explain it in simple terms that anyone can understand. We support PDF, DOC, DOCX, and TXT files up to 10MB.
            </p>
          </div>

      {/* Upload Zone */}
      <Card 
        className={cn(
          "relative border-2 border-dashed transition-all duration-300 cursor-pointer",
          isDragOver 
            ? "border-primary bg-primary-light/20 shadow-medium" 
            : "border-border hover:border-primary/50 hover:bg-primary-light/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="p-12 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Drop files here or click to upload</h3>
            <p className="text-muted-foreground">
              PDF, DOC, DOCX, TXT files up to 10MB
            </p>
          </div>

          <Button variant="outline" className="pointer-events-none">
            Choose Files
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Uploaded Documents</h3>
          <div className="space-y-3">
            {files.map((uploadFile) => (
              <div key={uploadFile.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex-shrink-0">
                  {getFileIcon(uploadFile.file)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{uploadFile.file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(uploadFile.file.size)}
                  </p>
                  
                  {uploadFile.status === 'uploading' && (
                    <div className="mt-2">
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${uploadFile.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Analyzing document... {Math.round(uploadFile.progress)}%
                      </p>
                    </div>
                  )}

                  {uploadFile.status === 'success' && uploadFile.analysis && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-success">✅ Analysis complete</p>
                      <p className="text-xs text-muted-foreground">
                        Risk: {uploadFile.analysis.riskLevel} | 
                        Type: {uploadFile.analysis.documentType}
                      </p>
                    </div>
                  )}

                  {uploadFile.status === 'error' && (
                    <div className="mt-2">
                      <p className="text-xs text-destructive">❌ Analysis failed</p>
                      {uploadFile.error && (
                        <p className="text-xs text-muted-foreground">{uploadFile.error}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  {uploadFile.status === 'success' && uploadFile.analysis && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedAnalysis({
                          analysis: uploadFile.analysis!,
                          fileName: uploadFile.file.name
                        });
                      }}
                    >
                      View Analysis
                    </Button>
                  )}
                  
                  {uploadFile.status === 'success' && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                  {uploadFile.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(uploadFile.id);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
        </>
      )}
    </div>
  );
};