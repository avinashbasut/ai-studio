import React, { useState } from 'react';
import { generateTranscription } from '../services/geminiService';
import type { TranscriptSegment } from '../types';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Loader } from './common/Loader';
import { Icon } from './common/Icon';

interface TranscriptsTabProps {
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const TranscriptsTab: React.FC<TranscriptsTabProps> = ({ addNotification }) => {
  const [audioText, setAudioText] = useState('');
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranscribe = async () => {
    if (!audioText.trim()) {
      setError('Please paste some text to transcribe.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setTranscript([]);
    try {
      const result = await generateTranscription(audioText);
      setTranscript(result);
      addNotification('Transcription successfully generated!', 'success');
    } catch (err) {
      setError('An error occurred during transcription. Please try again.');
      addNotification('Transcription failed.', 'error');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 animate-fade-in">
      <div className="md:w-1/2 flex flex-col">
        <Card className="flex-grow flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-white">Transcribe Audio</h2>
          <p className="text-gray-400 mb-4">Paste the content from an audio file to generate a timestamped transcript. (File upload coming soon!)</p>
          <textarea
            value={audioText}
            onChange={(e) => setAudioText(e.target.value)}
            placeholder="Paste audio text here..."
            className="flex-grow w-full p-3 bg-gray-900/70 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan focus:border-cyan transition-colors text-gray-200 resize-none min-h-[300px]"
          />
          <Button onClick={handleTranscribe} disabled={isLoading} className="mt-4">
            {isLoading ? <Loader /> : <><Icon name="mic" className="mr-2" /> Transcribe with AI</>}
          </Button>
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
        </Card>
      </div>
      <div className="md:w-1/2 flex flex-col">
         <Card className="flex-grow flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-white">Generated Transcript</h2>
            <div className="flex-grow overflow-y-auto pr-2 min-h-[300px]">
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <Loader />
                            <p className="mt-2 text-gray-400">Generating transcript...</p>
                        </div>
                    </div>
                )}
                {!isLoading && transcript.length === 0 && (
                     <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Your AI-generated transcript will appear here.</p>
                    </div>
                )}
                {transcript.length > 0 && (
                    <div className="space-y-4">
                        {transcript.map((segment, index) => (
                            <div key={index} className="flex gap-4 group">
                                <span className="font-mono text-sm text-cyan pt-1 transition-colors group-hover:text-cyan-light">{segment.timestamp}</span>
                                <p className="text-gray-300 flex-1 leading-relaxed">{segment.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
      </div>
    </div>
  );
};

export default TranscriptsTab;