import React, { useState, useEffect } from 'react';
import { getScriptSuggestion } from '../services/geminiService';
import { realtimeService } from '../services/realtimeService';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Loader } from './common/Loader';
import { Icon } from './common/Icon';

type SuggestionType = 'dialogue' | 'flow' | 'consistency';

const ScriptsTab: React.FC = () => {
  const [script, setScript] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSuggestion, setActiveSuggestion] = useState<SuggestionType | null>(null);

  useEffect(() => {
    const handleScriptUpdate = (newContent: string) => {
      setScript(newContent);
    };

    const initialContent = realtimeService.connect(handleScriptUpdate);
    setScript(initialContent);

    return () => {
      realtimeService.disconnect(handleScriptUpdate);
    };
  }, []);

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setScript(newContent); // Update local state immediately for responsiveness
    realtimeService.updateScript(newContent); // Broadcast change to others
  };

  const handleSuggestion = async (type: SuggestionType) => {
    if (!script.trim()) {
      setError('Please write some script content first.');
      return;
    }
    setIsLoading(true);
    setActiveSuggestion(type);
    setError(null);
    setSuggestion('');
    try {
      const result = await getScriptSuggestion(script, type);
      setSuggestion(result);
    } catch (err) {
      setError('An error occurred while getting suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 animate-fade-in">
      <div className="md:w-2/3 flex flex-col">
        <Card className="flex-grow flex flex-col p-0 min-h-[500px]">
           <div className="flex items-center justify-end px-4 py-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-green-400">
                  <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-semibold">Live</span>
              </div>
          </div>
          <textarea
            value={script}
            onChange={handleScriptChange}
            placeholder="Start writing your script here..."
            className="flex-grow w-full p-4 bg-transparent border-none focus:ring-0 text-gray-200 resize-none font-mono text-sm leading-relaxed"
          />
        </Card>
      </div>
      <div className="md:w-1/3 flex flex-col">
        <Card className="mb-4">
            <h2 className="text-xl font-semibold mb-3 text-white">AI Script Assistant</h2>
            <div className="flex flex-col space-y-2">
                <Button onClick={() => handleSuggestion('dialogue')} disabled={isLoading} variant="secondary">
                    {isLoading && activeSuggestion === 'dialogue' ? <Loader/> : <Icon name="dialogue" className="mr-2" />} Suggest Dialogue
                </Button>
                <Button onClick={() => handleSuggestion('flow')} disabled={isLoading} variant="secondary">
                     {isLoading && activeSuggestion === 'flow' ? <Loader/> : <Icon name="flow" className="mr-2" />} Improve Scene Flow
                </Button>
                 <Button onClick={() => handleSuggestion('consistency')} disabled={isLoading} variant="secondary">
                     {isLoading && activeSuggestion === 'consistency' ? <Loader/> : <Icon name="check" className="mr-2" />} Check Consistency
                </Button>
            </div>
        </Card>
        <Card className="flex-grow flex flex-col">
            <h3 className="text-lg font-semibold mb-2 text-white">Suggestion</h3>
            <div className="flex-grow overflow-y-auto bg-gray-900/70 p-3 rounded-md text-gray-300 text-sm whitespace-pre-wrap border border-white/10 min-h-[200px]">
                 {isLoading && (
                    <div className="flex items-center justify-center h-full">
                         <div className="text-center">
                            <Loader />
                            <p className="mt-2 text-gray-400">Thinking...</p>
                        </div>
                    </div>
                )}
                {!isLoading && !suggestion && (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>AI suggestions will appear here.</p>
                    </div>
                )}
                {suggestion}
            </div>
             {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
        </Card>
      </div>
    </div>
  );
};

export default ScriptsTab;