// Background script for handling Chrome extension events
console.log('🚀 Background script loaded and initializing...');

chrome.commands.onCommand.addListener((command) => {
  console.log('🎯 Keyboard command received in background script:', command);
  alert('Shortcut key pressed: ' + command); // Temporary debugging alert
  
  if (command === 'open-modal') {
    console.log('📋 Processing open-modal command');
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log('📝 Active tabs found:', tabs);
      if (tabs[0]?.id) {
        console.log('💌 Sending message to content script on tab:', tabs[0].id);
        // Send message to content script to open modal
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'open-modal',
          command: command 
        });
      } else {
        console.log('❌ No active tab found');
      }
    });
  }
});

console.log('⚡ Command listener registered');

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('✅ Chrome Bookmark Manager extension installed');
});

console.log('🎉 Background script initialization complete');
