var hasRegistered = false;
var copyTimes = 0;
console.log("begin!!!!!");
document.addEventListener("beforecopy", async function (event) {
  debugger;
  console.log("before copy~~~");
  if (!hasRegistered) {
    hasRegistered = true;
    document.oncopy = (event) => {
      const selectedText = window.getSelection(0).toString();
      event.clipboardData.setData("text", selectedText);

      // 发送复制次数和内容到 service worker
      chrome.runtime.sendMessage({
        type: "badge",
        data: ++copyTimes,
        content: selectedText.substring(0, 50) + (selectedText.length > 50 ? '...' : '') // 只保存前50个字符
      });
    }
  }
});

// 技术进行badge显示
// var copyTimes = 0;
// document.addEventListener("aftercopy", function (e) {
//   console.log("aftercopy~~~");
//   // await chrome.runtime.sendMessage({ type: "badge", data: ++copyTimes });
// });
document.addEventListener("aftercopy", function (event) {
  // 复制操作完成后的处理
  console.log("dddsdddcopy");
});
