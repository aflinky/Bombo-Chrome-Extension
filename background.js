"use strict";

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked() {
    // console.log("Hey");
    // let currentTab = chrome.tabs.getCurrent(function (tab) {
    //     return tab.id;
    // });

    // //sends object, of our tab open when we clicked, and its tab id
    // chrome.runtime.sendMessage({firstTabId: tab.id});
      
    //this works -- redirects our prompt page to a new window
    let newWindow = window.open(chrome.extension.getURL("pop-up-start.html"),"gc-popout-window","width=200,height=200");
    let windowLocation = newWindow.location.href;

    // console.log(newWindow);
    //url on firs
    // chrome.pageAction.onClicked.addListener(buttonClickedAGAIN);
}

// function buttonClickedAGAIN() {
//     console.log("woohoo");
// }

// console.log("hello world!");
chrome.tabs.query({currentWindow: true}, function(result) {
    result.forEach(function(tab) {
        console.log(tab)
    });
});