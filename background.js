// first event that service worker listens for (runtime.onInstalled())
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "ON",
    });
});
chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.executeScript({file:"amazon_click.js"});
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
      // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });
    }
});