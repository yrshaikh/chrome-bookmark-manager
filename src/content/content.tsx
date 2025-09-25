import React from 'react';
import { createRoot } from 'react-dom/client';
import { BookmarkModal } from '@/components/BookmarkModal';
import '@/globals.css';

// Create a container for our React app
const createModalContainer = (): HTMLDivElement => {
  const container = document.createElement('div');
  container.id = 'chrome-bookmark-manager-modal';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.zIndex = '2147483647'; // Maximum z-index
  container.style.pointerEvents = 'none'; // Allow clicks through when modal is closed
  
  // Import the Nunito Sans font
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);
  
  document.body.appendChild(container);
  return container;
};

// React component to manage modal state
const ModalManager: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  // Update pointer events based on modal state
  React.useEffect(() => {
    const container = document.getElementById('chrome-bookmark-manager-modal');
    if (container) {
      container.style.pointerEvents = isModalOpen ? 'auto' : 'none';
    }
  }, [isModalOpen]);

  // Listen for messages from background script
  React.useEffect(() => {
    const messageListener = (message: any) => {
      console.log('Content script received message:', message);
      if (message.action === 'open-modal') {
        setIsModalOpen(true);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BookmarkModal 
      isOpen={isModalOpen} 
      onClose={handleCloseModal}
    />
  );
};

// Initialize the content script
const init = () => {
  // Check if we're already initialized
  if (document.getElementById('chrome-bookmark-manager-modal')) {
    return;
  }

  try {
    const container = createModalContainer();
    const root = createRoot(container);
    root.render(<ModalManager />);
    
    console.log('Chrome Bookmark Manager content script initialized');
  } catch (error) {
    console.error('Error initializing Chrome Bookmark Manager:', error);
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
