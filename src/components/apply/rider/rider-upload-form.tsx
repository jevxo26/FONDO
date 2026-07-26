import React from "react";
import { Upload, CheckCircle2 } from "lucide-react";

export interface UploadedDoc {
  id: string;
  label: string;
  fileName?: string;
  completed: boolean;
}

interface Props {
  docs: UploadedDoc[];
  setDocs: React.Dispatch<React.SetStateAction<UploadedDoc[]>>;
  onFocus: () => void;
}

export function FormUploadDocuments({ docs, setDocs, onFocus }: Props) {
  const handleSimulatedUpload = (id: string) => {
    setDocs((prev) => prev.map((doc) => (doc.id === id ? { ...doc, fileName: `${id}_scanned.jpg`, completed: true } : doc)));
  };

  const handleRemoveDoc = (id: string) => {
    setDocs((prev) => prev.map((doc) => (doc.id === id ? { ...doc, fileName: undefined, completed: false } : doc)));
  };

  return (
    <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 space-y-6" onFocus={onFocus}>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">08</span>
          <h3 className="font-heading text-xl font-bold text-foreground">Upload Required Documents</h3>
        </div>
        <Upload className="size-5 text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((doc) => (
          <div key={doc.id} className="bg-card border-2 border-dashed border-border rounded-3xl p-4 flex flex-col justify-between items-center text-center hover:border-primary transition-colors">
            {doc.completed ? (
              <div className="space-y-2 w-full">
                <div className="size-12 rounded-full bg-success/10 text-success mx-auto flex items-center justify-center">
                  <CheckCircle2 className="size-6" />
                </div>
                <div className="text-xs font-bold text-foreground truncate">{doc.label}</div>
                <div className="text-[10px] text-muted-foreground truncate">{doc.fileName}</div>
                <button type="button" onClick={() => handleRemoveDoc(doc.id)} className="px-3 py-1 bg-destructive/10 text-destructive rounded-lg text-[10px] font-bold hover:bg-destructive/20">
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2 w-full py-2">
                <div className="size-10 rounded-2xl bg-secondary text-primary mx-auto flex items-center justify-center">
                  <Upload className="size-5" />
                </div>
                <div className="text-xs font-bold text-foreground">{doc.label}</div>
                <button type="button" onClick={() => handleSimulatedUpload(doc.id)} className="w-full py-2 bg-secondary hover:bg-muted text-foreground text-xs font-bold rounded-xl transition-colors cursor-pointer">
                  Select File
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}