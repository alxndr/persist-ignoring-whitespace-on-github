
// IGNORE WHITESPACE IN GITHUB COMMITS
// Timo Hofmeijer 2012

function checkForValidUrl(tabId, changeInfo, tab) {

  // LOAD EXTENSION IF THE URL CONTAINS 'github.com'
  if (tab.url.indexOf('github.com') > -1 && changeInfo.status == "complete") { // PREVENT FIRING TWICE WITH changeInfo.status

    // ... SHOW THE PAGE ACTION
    chrome.pageAction.show(tabId);

    // IF NO 'ignore whitespace' MARK IS FOUND
    if (localStorage.state == 'false'){

        // SAVE STATE
        localStorage.state = false;

        // SET ICON
        chrome.pageAction.setIcon({tabId:tabId, path:'/off-19.png'});

        // REMOVE ?w=1 IF ANY
        if(tab.url.toString().match(/\?w=/)){
            chrome.tabs.update(tab.id, {url: tab.url.replace(/\?w=1/g, '')});
        }
    }
    else {

        // SET ICON
        chrome.pageAction.setIcon({tabId:tabId, path:'/on-19.png'});

        // ADD ?w=1 IF NOT PRESENT AND /commit/
        if(tab.url.toString().match(/\/commit\//) && !tab.url.toString().match(/\?w=/)){

            // RECONSTRUCT IN CASE OF HASHES
            var split = tab.url.split('#');
            var preHash = split[0];
            var postHash = split[1]? '#'+split[1] : '';
            var url = preHash + '?w=1' + postHash;

            // SET URL
            chrome.tabs.update(tab.id, { url: url });
        }
    }

    //////////////////////
    // ON ICON CLICK EVENT

    chrome.pageAction.onClicked.addListener(function(tab) {

        if(!localStorage.block){ // PREVENT FIRING MORE THAN ONCE ON A SINGLE CLICK

            // TURN ON
            if(localStorage.state == 'true') {

                // SAVE STATE
                localStorage.state = false;

                // SET ICON
                chrome.pageAction.setIcon({tabId:tabId, path:'/off-19.png'});

                // REMOVE ?w=1 IF ANY
                if(tab.url.toString().match(/\?w=/)) {
                    chrome.tabs.update(tab.id, {url: tab.url.replace(/\?w=1/g, '')});
                }
            }
            // TURN OFF
            else {

                // SAVE STATE
                localStorage.state = true;

                // SET ICON
                chrome.pageAction.setIcon({tabId:tabId, path:'/on-19.png'});

                // ADD MARK TO URL IF /commit/
                if(tab.url.toString().match(/\/commit\//)) {
                    chrome.tabs.update(tab.id, {url: tab.url+'?w=1'});
                }
            }
            localStorage.block = true;
        }

        setTimeout(function(){
            delete localStorage.block;
        },400);

    });
  }
}

// LISTEN FOR ANY CHANGES TO THE URL OF ANY TAB.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

// EXCHANGE STATE WITH contentscript.js
chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
    sendResponse({isOn:localStorage.state});
});
