import React, { useState } from 'react';
import type { StoryboardCard as StoryboardCardType } from '../types';
import { generateStoryboardImage } from '../services/geminiService';
import { INITIAL_STORYBOARD_CARDS } from '../constants';
import { Button } from './common/Button';
import { Loader } from './common/Loader';
import { Icon } from './common/Icon';
import { Card } from './common/Card';


const StoryboardCard: React.FC<{
  card: StoryboardCardType;
  onUpdate: (id: number, updates: Partial<StoryboardCardType>) => void;
  onGenerate: (id: number, prompt: string) => void;
  isBeingDragged: boolean;
  dragHandlers: {
    onDragStart: () => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: () => void;
    onDragEnd: () => void;
  }
}> = ({ card, onUpdate, onGenerate, isBeingDragged, dragHandlers }) => {
  return (
    <Card 
        className={`p-4 flex flex-col space-y-3 transition-opacity cursor-grab ${isBeingDragged ? 'opacity-30' : ''}`}
        draggable
        {...dragHandlers}
      >
      <div className="aspect-video bg-black/30 rounded-lg flex items-center justify-center overflow-hidden relative border border-white/10">
        {card.isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <Loader />
            <p className="text-sm mt-2 text-gray-300">Generating Image...</p>
          </div>
        )}
        {card.imageUrl ? (
          <img src={card.imageUrl} alt={card.prompt} className="w-full h-full object-cover" />
        ) : (
          <Icon name="image" className="text-gray-600 h-12 w-12" />
        )}
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-400">Scene Prompt</label>
        <div className="flex items-center gap-2 mt-1">
           <input
            type="text"
            value={card.prompt}
            onChange={(e) => onUpdate(card.id, { prompt: e.target.value })}
            placeholder="e.g., A detective in a rain-soaked alley"
            className="w-full p-2 bg-gray-900/70 border border-white/10 rounded-md focus:ring-1 focus:ring-cyan focus:border-cyan text-sm"
            disabled={card.isLoading}
          />
           <Button 
            onClick={() => onGenerate(card.id, card.prompt)} 
            disabled={card.isLoading || !card.prompt}
            size="sm"
            className="flex-shrink-0"
            variant="primary"
            >
            <Icon name="sparkles" />
          </Button>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-400">Notes</label>
        <textarea
          value={card.notes}
          onChange={(e) => onUpdate(card.id, { notes: e.target.value })}
          placeholder="Camera angles, character actions..."
          className="w-full p-2 mt-1 bg-gray-900/70 border border-white/10 rounded-md focus:ring-1 focus:ring-cyan focus:border-cyan text-sm resize-none h-20"
          disabled={card.isLoading}
        />
      </div>
    </Card>
  );
};


const StoryboardsTab: React.FC = () => {
  const [cards, setCards] = useState<StoryboardCardType[]>(
    Array.from({ length: INITIAL_STORYBOARD_CARDS }, (_, i) => ({
      id: i + 1,
      prompt: '',
      notes: '',
      imageUrl: null,
      isLoading: false,
    }))
  );
  const [draggedCardId, setDraggedCardId] = useState<number | null>(null);


  const updateCard = (id: number, updates: Partial<StoryboardCardType>) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, ...updates } : card))
    );
  };

  const handleGenerateImage = async (id: number, prompt: string) => {
    updateCard(id, { isLoading: true });
    try {
      const imageUrl = await generateStoryboardImage(prompt);
      updateCard(id, { imageUrl });
    } catch (error) {
      console.error("Failed to generate image for card", id, error);
      // You could add an error state to the card here
    } finally {
      updateCard(id, { isLoading: false });
    }
  };
  
  const addCard = () => {
    setCards(prev => [...prev, {
      id: prev.length > 0 ? Math.max(...prev.map(c => c.id)) + 1 : 1,
      prompt: '',
      notes: '',
      imageUrl: null,
      isLoading: false,
    }])
  }

  const handleDrop = (targetCardId: number) => {
    if (draggedCardId === null || draggedCardId === targetCardId) {
      return;
    }

    setCards(currentCards => {
      const draggedIndex = currentCards.findIndex(c => c.id === draggedCardId);
      const targetIndex = currentCards.findIndex(c => c.id === targetCardId);

      if (draggedIndex === -1 || targetIndex === -1) {
        return currentCards;
      }
      
      const reorderedCards = Array.from(currentCards);
      const [draggedItem] = reorderedCards.splice(draggedIndex, 1);
      reorderedCards.splice(targetIndex, 0, draggedItem);
      
      return reorderedCards;
    });
  };

  return (
    <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-400">Use AI to generate visuals for your scenes.</p>
            <Button onClick={addCard} variant="secondary">
                <Icon name="add" className="mr-2" /> Add Scene Card
            </Button>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <StoryboardCard
            key={card.id}
            card={card}
            onUpdate={updateCard}
            onGenerate={handleGenerateImage}
            isBeingDragged={draggedCardId === card.id}
            dragHandlers={{
              onDragStart: () => setDraggedCardId(card.id),
              onDragOver: (e) => e.preventDefault(),
              onDrop: () => handleDrop(card.id),
              onDragEnd: () => setDraggedCardId(null),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryboardsTab;