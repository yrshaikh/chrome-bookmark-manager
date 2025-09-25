// Background script for handling Chrome extension events
chrome.commands.onCommand.addListener((command) => {
  console.log('Command received:', command);
  
  if (command === 'open-modal') {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        // Send message to content script to open modal
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'open-modal',
          command: command 
        });
      }
    });
  }
});

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome Bookmark Manager extension installed');
});
