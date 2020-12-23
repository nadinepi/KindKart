console.log("background script running");

const urls = ['checkout'];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (urls.some(url => tab.url.includes(url))) {
        chrome.browserAction.setPopup({
            tabId: tabId,
            popup: 'checkout.html'
        });
    } else {
        chrome.browserAction.setPopup({
            tabId: tabId,
            popup: 'popup.html'
        });
    }
});