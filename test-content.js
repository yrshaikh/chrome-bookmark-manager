// Simple test content script
console.log('🧪 TEST: Content script loaded successfully!');

// Set up message listener at top level
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('🧪 TEST: Message received:', message);
  if (message.action === 'open-modal') {
    console.log('🧪 TEST: Would open modal here!');
    sendResponse({success: true});
  }
  return true;
});

console.log('🧪 TEST: Message listener registered');
