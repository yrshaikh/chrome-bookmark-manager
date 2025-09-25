import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@/components/ui/button';
import '@/globals.css';

const PopupApp: React.FC = () => {
  const handleOpenModal = () => {
    // Get the active tab and send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'open-modal' 
        });
        // Close the popup after sending the message
        window.close();
      }
    });
  };

  return (
    <div className="w-full h-full p-4 bg-background">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <h1 className="text-lg font-bold text-foreground mb-2">
            Bookmark Manager
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your bookmarks with ease
          </p>
        </div>
        
        <Button 
          onClick={handleOpenModal}
          className="w-full"
          size="lg"
        >
          Open Bookmark Manager
        </Button>
        
        <div className="text-xs text-muted-foreground text-center mt-4 space-y-1">
          <p>💡 Quick access:</p>
          <div className="flex items-center justify-center space-x-1">
            <kbd className="px-1 py-0.5 text-xs font-mono bg-muted rounded">
              Cmd+Shift+K
            </kbd>
            <span>(Mac)</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <kbd className="px-1 py-0.5 text-xs font-mono bg-muted rounded">
              Ctrl+Shift+K
            </kbd>
            <span>(Windows/Linux)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Initialize the popup
const container = document.getElementById('popup-root');
if (container) {
  const root = createRoot(container);
  root.render(<PopupApp />);
}
