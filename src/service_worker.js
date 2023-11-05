chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type == "badge") {
    chrome.action.setBadgeText({
      text: message.data > 99 ? "99+" : message.data + "",
    });
  }
});
