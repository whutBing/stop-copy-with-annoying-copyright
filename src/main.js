var hasRegistered = false;
// console.log("begin!!!!!");
document.addEventListener("beforecopy", function (event) {
  // console.log("before copy~~~");
  if (!hasRegistered) {
    hasRegistered = true;
    // register once event
    document.oncopy = (event) =>
      event.clipboardData.setData("text", window.getSelection(0).toString());
  }
});
