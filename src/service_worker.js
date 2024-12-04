// 保存最近的复制记录
let recentCopies = [];
let copyCount = 0;

// 检查当前URL是否在允许列表中
async function checkUrlEnabled(url) {
  // 排除 chrome:// 和 chrome-extension:// 等特殊页面
  if (url.startsWith('chrome://') || url.startsWith('chrome-extension://')) {
    return false;
  }

  const data = await chrome.storage.local.get('userUrls');
  const userUrls = data.userUrls || [];
  return userUrls.some(pattern => url.includes(pattern));
}

// 监听标签页更新
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      console.log(tab.url, 'ddddddddd');
      const isEnabled = await checkUrlEnabled(tab.url);
      if (isEnabled) {
        // 在允许的URL上注入脚本
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['src/main.js']
        });
      }
    } catch (error) {
      console.error('Error checking URL:', error);
    }
  }
});

// 处理复制消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type == "badge") {
    copyCount = message.data;
    chrome.action.setBadgeText({
      text: copyCount > 99 ? "99+" : copyCount + "",
    });

    // 如果有复制的内容，添加到最近记录
    if (message.content) {
      // 保留最近3条记录
      recentCopies.unshift(message.content);
      if (recentCopies.length > 3) {
        recentCopies.pop();
      }
      // 保存到 storage
      chrome.storage.local.set({
        copyCount: copyCount,
        recentCopies: recentCopies
      });
    }
  }
});
