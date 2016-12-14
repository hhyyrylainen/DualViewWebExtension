
// Native callbacks //
function onResponse(response) {
  console.log("Received " + response.content);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

// A basic log callback for the context menu items
function onCreated(n) {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
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
        console.log("One image: " + info.srcUrl);

        
        break;
        
    case "download-whole-page":
        console.log("Download whole page clicked: " + info.pageUrl);
        
        
        var sending = browser.runtime.sendNativeMessage(
            "dualview_bridge",
            "page here: ");
        sending.then(onResponse, onError);
        
        break;
        
    case "download-linked-page":
        console.log("Download link clicked: " + info.linkUrl);
        
        break;
    }
});
