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


// Remove the current rules 
/* chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // Replace the current rules
    chrome.declarativeContent.onPageChanged.addRules([
    {
        conditions: [

       //Create a new event Object with PageStateMatcher that
       //matches page urls that follolw http and https schemes
    
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
*/

let domain = ""

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        let url = tabs[0].url;
        console.log(url)
        domain = url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
        console.log(domain);
        // `domain` now has a value like 'example.com'
    });
});

chrome.runtime.onMessage.addListener(sendDomain)

function sendDomain(request, sender, sendResponse){
    if (request.text == "getDomain"){
        sendResponse(domain)
    }
}