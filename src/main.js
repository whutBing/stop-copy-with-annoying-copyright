var hasRegistered = false;
var copyTimes = 0;
console.log("begin!!!!!");
document.addEventListener("beforecopy", async function (event) {
  console.log("before copy~~~");
  if (!hasRegistered) {
    hasRegistered = true;
    // register once event
    document.oncopy = (event) =>
      event.clipboardData.setData("text", window.getSelection(0).toString());
  }
  await chrome.runtime.sendMessage({ type: "badge", data: ++copyTimes });
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
