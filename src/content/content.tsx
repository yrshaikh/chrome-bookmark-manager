import React from 'react';
import { createRoot } from 'react-dom/client';
import { BookmarkModal } from '@/components/BookmarkModal';
// CSS will be loaded dynamically when modal opens

console.log('📂 Chrome Bookmark Manager content script file loaded');

// Global state for modal
let globalModalState = {
  isOpen: false,
  setIsOpen: null as ((value: boolean) => void) | null
};

// Load CSS dynamically when needed
let cssLoaded = false;
const loadCSS = () => {
  if (cssLoaded) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('popup.css');
  document.head.appendChild(link);
  cssLoaded = true;
  console.log('🎨 CSS loaded dynamically');
};

// Set up message listener at top level (outside React)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Content script received message:', message);
  if (message.action === 'open-modal') {
    console.log('🔓 Opening modal from message listener');
    
    // Load CSS before opening modal
    loadCSS();
    
    globalModalState.isOpen = true;
    if (globalModalState.setIsOpen) {
      globalModalState.setIsOpen(true);
    }
    sendResponse({success: true}); // Send response back to background script
  }
  return true; // Keep message channel open for async response
});

console.log('📞 Message listener registered at top level');

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
  const [isModalOpen, setIsModalOpen] = React.useState(globalModalState.isOpen);
  
  // Connect global state to React state
  React.useEffect(() => {
    globalModalState.setIsOpen = setIsModalOpen;
    // Set initial state if modal should be open
    if (globalModalState.isOpen) {
      setIsModalOpen(true);
    }
  }, []);
  
  // Update pointer events based on modal state
  React.useEffect(() => {
    const container = document.getElementById('chrome-bookmark-manager-modal');
    if (container) {
      container.style.pointerEvents = isModalOpen ? 'auto' : 'none';
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    globalModalState.isOpen = false;
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
    
    console.log('✅ Chrome Bookmark Manager content script initialized and ready');
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
