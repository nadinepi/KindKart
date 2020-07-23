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
    }])
})

