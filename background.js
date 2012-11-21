
// IGNORE WHITESPACE IN GITHUB COMMITS
// Timo Hofmeijer 2012

chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
    sendResponse({isOn:localStorage.state});
});

// CALLED WHEN THE URL OF A TAB CHANGES.
function checkForValidUrl(tabId, changeInfo, tab) {

  // IF THE URL CONTAINS 'github.com'
  if (tab.url.indexOf('github.com') > -1 && changeInfo.status == "complete") { // PREVENT FIRING TWICE WITH changeInfo.status

    // ... SHOW THE PAGE ACTION
    chrome.pageAction.show(tabId);
    // alert('localStorage:'+localStorage.state);
    // IF NO 'ignore whitespace' MARK IS FOUND
    if (localStorage.state == 'false'){
        localStorage.state = false;
        // alert('is off');
        chrome.pageAction.setIcon({tabId:tabId, path:'/off-19.png'});
        if(tab.url.toString().match(/\?w=/)){
            // alert('remove');
            // REMOVE MARK TO URL
            chrome.tabs.update(tab.id, {url: tab.url.replace(/\?w=1/g, '')});
        }
    }
    else {
        // alert('is on');
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

    // IN THE FUTURE I WANT THE PAGEACTION TO TOGGLE THE W TAG AND STORE ITS STATE LOCALLY
    chrome.pageAction.onClicked.addListener(function(tab) {
        if(!localStorage.block){
            if(localStorage.state == 'true'){
                // alert('turn off');
                localStorage.state = false;
                chrome.pageAction.setIcon({tabId:tabId, path:'/off-19.png'});
                if(tab.url.toString().match(/\?w=/)){
                    // REMOVE MARK TO URL
                    chrome.tabs.update(tab.id, {url: tab.url.replace(/\?w=1/g, '')});
                }
            }
            else{
                localStorage.state = true;
                // alert('turn on');
                chrome.pageAction.setIcon({tabId:tabId, path:'/on-19.png'});
                if(tab.url.toString().match(/\/commit\//)){
                    // ADD MARK TO URL
                    chrome.tabs.update(tab.id, {url: tab.url+'?w=1'});
                }
            }
            localStorage.block = true;
        }

        setTimeout(function(){
            delete localStorage.block;
        },500);
    });
  }
}



// LISTEN FOR ANY CHANGES TO THE URL OF ANY TAB.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
