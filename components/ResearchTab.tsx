import React, { useState, useRef } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Icon } from './common/Icon';
import { Loader } from './common/Loader';

interface Document {
    name: string;
    type: string;
    size: string;
}

interface ResearchTabProps {
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ResearchTab: React.FC<ResearchTabProps> = ({ addNotification }) => {
    const [documents, setDocuments] = useState<Document[]>([
        { name: 'Location_Scouting_Notes.pdf', type: 'PDF', size: '2.3 MB' },
        { name: 'Character_Bios_Final.docx', type: 'DOCX', size: '87 KB' },
        { name: 'Historical_References.txt', type: 'TXT', size: '12 KB' },
        { name: 'Moodboard_Images.zip', type: 'ZIP', size: '15.8 MB' },
    ]);
    const [summarizingDoc, setSummarizingDoc] = useState<Document | null>(null);
    const [summary, setSummary] = useState<string>('');
    const [isSummarizing, setIsSummarizing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newDoc: Document = {
                name: file.name,
                type: file.type.split('/')[1]?.toUpperCase() || 'FILE',
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            };
            setDocuments(prev => [newDoc, ...prev]);
            addNotification(`Uploaded "${newDoc.name}" successfully.`, 'success');
            handleSummarize(newDoc);
            
            if(fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleSummarize = (doc: Document) => {
        setSummarizingDoc(doc);
        setIsSummarizing(true);
        setSummary('');

        // Simulate AI summarization API call
        setTimeout(() => {
            setSummary(`This document, "${doc.name}", appears to be a critical piece of research for the project. It details potential filming locations with notes on lighting, accessibility, and atmospheric quality. Key themes include urban decay and natural reclamation, suggesting a post-apocalyptic or dystopian setting. The document also cross-references character biographies, indicating a strong link between environment and character development.`);
            setIsSummarizing(false);
            addNotification(`AI summary for "${doc.name}" is ready.`, 'info');
        }, 2500);
    };


  return (
    <div className="animate-fade-in flex gap-6">
        <div className="w-2/3">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Research Documents</h2>
                    <Button onClick={handleUploadClick}>
                        <Icon name="upload" className="mr-2" />
                        Upload File
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                </div>
                <p className="text-gray-400 mb-6">Upload PDFs, notes, and other reference materials for your project.</p>
                
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg hover:bg-gray-700/50 transition-colors group">
                            <div className="flex items-center overflow-hidden">
                                <Icon name="file" className="text-cyan-light mr-4 flex-shrink-0" />
                                <div className="truncate">
                                    <p className="font-medium text-gray-200 truncate">{doc.name}</p>
                                    <p className="text-sm text-gray-500">{doc.type} - {doc.size}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <Button variant="ghost" size="sm" onClick={() => handleSummarize(doc)}>
                                    <Icon name="summary" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400">
                                    <Icon name="trash" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
        <div className="w-1/3">
            <Card className="sticky top-6">
                 <h2 className="text-xl font-semibold text-amber mb-4">AI Summarizer</h2>
                 {summarizingDoc ? (
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Summary for:</p>
                        <h3 className="font-semibold text-white truncate mb-4">{summarizingDoc.name}</h3>
                        {isSummarizing ? (
                             <div className="flex flex-col items-center justify-center h-48">
                                <Loader />
                                <p className="mt-3 text-gray-400">Analyzing document...</p>
                            </div>
                        ) : (
                            <div className="text-gray-300 text-sm leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
                               {summary}
                            </div>
                        )}
                    </div>
                 ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-center">
                        <Icon name="summary" className="h-12 w-12 text-gray-600 mb-4" />
                        <p className="text-gray-500">Upload or select a document to generate an AI summary.</p>
                    </div>
                 )}
            </Card>
        </div>
    </div>
  );
};

export default ResearchTab;