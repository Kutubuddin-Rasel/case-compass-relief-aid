
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FileText, Download, Trash } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
}

interface CaseDocumentsProps {
  documents: Document[];
  isAdmin: boolean;
  caseId: string;
}

const CaseDocuments = ({ documents, isAdmin, caseId }: CaseDocumentsProps) => {
  const [documentsList, setDocumentsList] = useState<Document[]>(documents);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('medical');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    // In a real app, you would upload the file to a server here
    const newDocument = {
      id: `doc${Date.now()}`,
      name: selectedFile.name,
      type: documentType,
      uploadedAt: new Date().toISOString(),
      uploadedBy: isAdmin ? 'Admin User' : 'John Doe',
    };
    
    setDocumentsList([...documentsList, newDocument]);
    setSelectedFile(null);
    
    // Reset the file input
    const fileInput = document.getElementById('document-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    
    toast.success('Document uploaded successfully');
  };
  
  const handleDelete = (docId: string) => {
    setDocumentsList(documentsList.filter(doc => doc.id !== docId));
    toast.success('Document deleted successfully');
  };
  
  const handleDownload = (doc: Document) => {
    // In a real app, this would trigger a file download
    toast.success(`Downloading ${doc.name}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-md border">
        <h3 className="text-lg font-medium mb-3">Documents</h3>
        
        {(isAdmin || true) && (
          <div className="mb-6 p-4 border rounded-md bg-gray-50">
            <h4 className="font-medium mb-3">Upload New Document</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                <select
                  className="w-full p-2 border rounded"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  <option value="medical">Medical</option>
                  <option value="legal">Legal</option>
                  <option value="financial">Financial</option>
                  <option value="consent">Consent</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
                <input
                  id="document-upload"
                  type="file"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  onChange={handleFileChange}
                />
              </div>
              
              <Button onClick={handleUpload} disabled={!selectedFile}>
                Upload Document
              </Button>
            </div>
          </div>
        )}
        
        {documentsList.length > 0 ? (
          <div className="divide-y border rounded-md">
            {documentsList.map((doc) => (
              <div key={doc.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-xs text-gray-500">
                      {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()} by {doc.uploadedBy}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border rounded-md">
            <FileText className="mx-auto h-8 w-8 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
            <p className="mt-1 text-sm text-gray-500">
              No documents have been uploaded for this case yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseDocuments;
