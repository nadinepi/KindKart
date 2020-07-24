console.log("background script running");


// listen for when someone clicks the page action
chrome.pageAction.onClicked.addListener( function () {
    // query the current tab on the current window
    chrome.tabs.query( { active: true, currentWindow: true }, function ( tabs ) {
      // exceute the main.js script on this tab
        chrome.tabs.executeScripts(
            tabs[0].id, 
            { file: 'popup.js' }
        );
    });
});

// Remove the current rules 
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // Replace the current rules
    chrome.declarativeContent.onPageChanged.addRules([
    {
        conditions: [
       /*
       Create a new event Object with PageStateMatcher that
       matches page urls that follolw http and https schemes
       */
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
                hostEquals: 'www.sephora.com',
                schemes: ['http', 'https']
                }
            })
        ], 
            actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

let domain = ""

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        url = tab.url;
        console.log(url)
        domain = url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
        console.log(domain);
        // `domain` now has a value like 'example.com'
    });

chrome.runtime.onMessage.addListener(sendDomain)
function sendDomain(request, sender, sendResponse){
    if (request.text == "getDomain"){
        sendResponse(domain)
    }
}