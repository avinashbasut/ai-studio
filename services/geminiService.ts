import { GoogleGenAI, Type } from "@google/genai";
import type { TranscriptSegment } from "../types";

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll alert the user.
  alert("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Generates a timestamped transcript from raw text.
 * @param audioText The raw text from an audio file.
 * @returns An array of timestamped transcript segments.
 */
export const generateTranscription = async (
  audioText: string
): Promise<TranscriptSegment[]> => {
  const prompt = `
    Analyze the following block of text, which represents a script or dialogue.
    Your task is to break it down into logical segments and assign a plausible, sequential timestamp (in MM:SS format) to each segment.
    The response must be a JSON array of objects, where each object has a "timestamp" and a "text" key.

    Example:
    Input: "First, we set up the lights. Okay, is everyone ready? And... action! The detective walks into the dimly lit room."
    Output: [
      {"timestamp": "00:01", "text": "First, we set up the lights."},
      {"timestamp": "00:04", "text": "Okay, is everyone ready?"},
      {"timestamp": "00:06", "text": "And... action!"},
      {"timestamp": "00:08", "text": "The detective walks into the dimly lit room."}
    ]

    Text to process:
    "${audioText}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timestamp: {
                type: Type.STRING,
                description: "The timestamp in MM:SS format.",
              },
              text: {
                type: Type.STRING,
                description: "The text segment for that timestamp.",
              },
            },
            required: ["timestamp", "text"],
          },
        },
      },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as TranscriptSegment[];
  } catch (error) {
    console.error("Error generating transcription:", error);
    throw new Error("Failed to generate transcription.");
  }
};

/**
 * Generates a creative suggestion for a script.
 * @param script The user's script content.
 * @param suggestionType The type of suggestion requested.
 * @returns A string containing the AI's suggestion.
 */
export const getScriptSuggestion = async (
  script: string,
  suggestionType: 'dialogue' | 'flow' | 'consistency'
): Promise<string> => {
  let promptHeader = '';
  switch (suggestionType) {
    case 'dialogue':
      promptHeader = 'You are a professional screenwriter. Based on the script below, suggest a piece of alternative or additional dialogue that would enhance the scene. Be creative and concise. Explain your suggestion briefly.';
      break;
    case 'flow':
      promptHeader = 'You are a script editor. Analyze the scene flow of the script below. Provide specific suggestions on how to improve the pacing, transitions, or emotional arc. Focus on actionable feedback.';
      break;
    case 'consistency':
      promptHeader = 'You are a continuity expert. Read the script below and check for any inconsistencies in character actions, dialogue, plot points, or timelines. If you find any, point them out and suggest a fix.';
      break;
  }

  const fullPrompt = `
    ${promptHeader}

    **Script:**
    ---
    ${script}
    ---

    **Your Suggestion:**
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error(`Error getting script suggestion (type: ${suggestionType}):`, error);
    throw new Error("Failed to get script suggestion.");
  }
};

/**
 * Generates a storyboard image from a text prompt.
 * @param prompt The description of the scene to visualize.
 * @returns A base64-encoded data URL for the generated image.
 */
export const generateStoryboardImage = async (
  prompt: string
): Promise<string> => {
  const fullPrompt = `
    A cinematic, high-quality storyboard panel illustration.
    Style: digital painting, clear lines, atmospheric lighting, focused on storytelling, 16:9 aspect ratio.
    Scene: ${prompt}
  `;

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated by the API.");
    }
  } catch (error) {
    console.error("Error generating storyboard image:", error);
    throw new Error("Failed to generate storyboard image.");
  }
};
