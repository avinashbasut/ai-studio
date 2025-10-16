// This is a mock/simulated real-time service to demonstrate multi-user collaboration.
// In a production app, this would be replaced with a real WebSocket, Firebase, or similar service.

type MessageCallback = (newContent: string) => void;

let scriptContent = `
INT. COFFEE SHOP - NIGHT

Rain lashes against the window. JANE (30s), nursing a cold coffee, stares blankly. LEO (30s), energetic, slides into the booth opposite her.

LEO
You look like you've seen a ghost.

JANE
Maybe I have. The ghost of my career.

LEO
(Smiling)
That's dramatic. It's just one bad review.
  `;

const listeners: Set<MessageCallback> = new Set();
let mockOtherUserInterval: number | null = null;

// Broadcasts the current script content to all connected clients.
const broadcast = () => {
  listeners.forEach(callback => callback(scriptContent));
};

// Starts a timer to simulate another user making edits.
const startMockUser = () => {
    if (mockOtherUserInterval) return;
    mockOtherUserInterval = window.setInterval(() => {
        // Appends a line to the script to simulate a collaborator's input.
        scriptContent += `\n\nLEO (CONT'D)\n(A line added in real-time by a collaborator.)`;
        broadcast();
    }, 15000); // Simulate an edit every 15 seconds.
}

// Stops the mock user simulation when no clients are connected.
const stopMockUser = () => {
    if (mockOtherUserInterval) {
        clearInterval(mockOtherUserInterval);
        mockOtherUserInterval = null;
    }
}

export const realtimeService = {
  /**
   * Connects a client to the service.
   * @param callback The function to call when the script content is updated.
   * @returns The initial script content.
   */
  connect: (callback: MessageCallback): string => {
    listeners.add(callback);
    console.log('A user connected to the real-time script service.');
    startMockUser();
    return scriptContent;
  },
  
  /**
   * Disconnects a client from the service.
   * @param callback The callback function to remove.
   */
  disconnect: (callback: MessageCallback) => {
    listeners.delete(callback);
    console.log('A user disconnected.');
    if(listeners.size === 0) {
        stopMockUser();
    }
  },

  /**
   * Called by a client to update the shared script content.
   * @param newContent The full new content of the script.
   */
  updateScript: (newContent: string) => {
    // In a real app, you'd send a diff/patch, not the whole content, for efficiency.
    if (scriptContent !== newContent) {
        scriptContent = newContent;
        // Broadcast the change to all connected clients.
        broadcast();
    }
  },
};
