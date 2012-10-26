
// // IGNORE WHITESPACE IN GITHUB COMMITS
// // Timo Hofmeijer 2012


// // CALLED WHEN THE URL OF A TAB CHANGES.
// function checkForValidUrl(tabId, changeInfo, tab) {

//   // IF THE URL CONTAINS 'github.com' AND IS NOT
//   if (tab.url.indexOf('github.com') > -1 && changeInfo.status == "complete") {

//     // ... SHOW THE PAGE ACTION
//     chrome.pageAction.show(tabId);
//     // alert('localStorage:'+localStorage.state);
//     // IF NO 'ignore whitespace' MARK IS FOUND
//     if (localStorage.state == 'false'){
//         localStorage.state = false;
//         // alert('is off');
//         chrome.pageAction.setIcon({tabId:tabId, path:'/test.png'});
//         if(tab.url.toString().match(/\?w=/)){
//             // alert('remove');
//             // REMOVE MARK TO URL
//             chrome.tabs.update(tab.id, {url: tab.url.replace(/\?w=1/, '')});
//         }
//     }
//     else {
//         // alert('is on');
//         chrome.pageAction.setIcon({tabId:tabId, path:'/icon-48.png'});
//         if(!tab.url.toString().match(/\?w=/)){
//             // alert('add');
//             // ADD MARK TO URL
//             chrome.tabs.update(tab.id, {url: tab.url+'?w=1'});
//         }
//     }

//     // IN THE FUTURE I WANT THE PAGEACTION TO TOGGLE THE W TAG AND STORE ITS STATE LOCALLY
//     chrome.pageAction.onClicked.addListener(function(tab) {
//         if(!localStorage.block){
//             if(localStorage.state == 'true'){
//                 // alert('turn off');
//                 localStorage.state = false;
//                 chrome.pageAction.setIcon({tabId:tabId, path:'/test.png'});
//                 if(tab.url.toString().match(/\?w=/)){
//                     // REMOVE MARK TO URL
//                     chrome.tabs.update(tab.id, {url: tab.url.replace(/\?w=1/, '')});
//                 }
//             }
//             else{
//                 localStorage.state = true;
//                 // alert('turn on');
//                 chrome.pageAction.setIcon({tabId:tabId, path:'/icon-48.png'});
//                 if(!tab.url.toString().match(/\?w=/)){
//                     // ADD MARK TO URL
//                     chrome.tabs.update(tab.id, {url: tab.url+'?w=1'});
//                 }
//             }
//             localStorage.block = true;
//         }

//         setTimeout(function(){
//             delete localStorage.block;
//         },500);
//     });
//   }
// }


// function toggleState(tabId, changeInfo, tab){

//         if(localStorage.state == 'true'){
//             alert('turn off');
//             localStorage.state = false;
//             chrome.pageAction.setIcon({tabId:tabId, path:'/test.png'});
//             if(tab.url.toString().match(/\?w=/)){
//                 // REMOVE MARK TO URL
//                 chrome.tabs.update(tab.id, {url: tab.url.replace(/\?w=1/, '')});
//             }
//         }
//         else{
//             localStorage.state = true;
//             alert('turn on');
//             chrome.pageAction.setIcon({tabId:tabId, path:'/icon-48.png'});
//             if(tab.url.toString().match(/\?w=/)){
//                 // ADD MARK TO URL
//                 chrome.tabs.update(tab.id, {url: tab.url+'?w=1'});
//             }
//         }
// }


// // LISTEN FOR ANY CHANGES TO THE URL OF ANY TAB.
// chrome.tabs.onUpdated.addListener(checkForValidUrl);
