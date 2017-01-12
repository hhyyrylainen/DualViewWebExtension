
// Native callbacks //
function onResponse(response) {
  console.log("Successfully received response from DualView++ Bridge: " + response.content);
}

function onError(error) {
  console.log(`Error communicating with DualView++ Bridge: ${error}`);
}

function onCreated(n) {
  if(browser.runtime.lastError){
    console.log(`Error registering DualView Context Menu entry: ${browser.runtime.lastError}`);
  }
}

// Register context menu items
browser.contextMenus.create({
  id: "download-one-image",
  title: browser.i18n.getMessage("contextMenuOpenSingleDualView"),
  contexts: ["image"]
}, onCreated);

browser.contextMenus.create({
  id: "download-whole-page",
  title: browser.i18n.getMessage("contextMenuOpenPageDualView"),
  contexts: ["page"]
}, onCreated);

browser.contextMenus.create({
  id: "download-linked-page",
  title: browser.i18n.getMessage("contextMenuOpenLinkDualView"),
  contexts: ["link"]
}, onCreated);

// Click handlers
browser.contextMenus.onClicked.addListener(function(info, tab) {
    switch (info.menuItemId) {
    case "download-one-image":
        
        var sending = browser.runtime.sendNativeMessage(
            "dualview_bridge",
            "--dl-image;" + info.srcUrl + ";--dl-referrer;" + tab.url);
        sending.then(onResponse, onError);
        
        break;
        
    case "download-whole-page":
        
        var sending = browser.runtime.sendNativeMessage(
            "dualview_bridge",
            "--dl-page;" + info.pageUrl);
        sending.then(onResponse, onError);
        
        break;
        
    case "download-linked-page":

        var sending = browser.runtime.sendNativeMessage(
            "dualview_bridge",
            "--dl-auto;" + info.linkUrl + ";--dl-referrer;" + tab.url);
        sending.then(onResponse, onError);
        
        break;
    }
});
