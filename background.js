"use strict";

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked() {
  // console.log("Hey");
  // let currentTab = chrome.tabs.getCurrent(function (tab) {
  //     return tab.id;
  // });

  // //sends object, of our tab open when we clicked, and its tab id
  // chrome.runtime.sendMessage({firstTabId: tab.id});

  //redirects our prompt page to a new window
  let newWindow = window.open(chrome.extension.getURL("pop-up-start.html"), "gc-popout-window", "width=200,height=200");
  let windowLocation = newWindow.location.href;

}

chrome.tabs.query({ currentWindow: true }, function (result) {
  result.forEach(function (tab) {
    console.log(tab)
  });
});