document.addEventListener('DOMContentLoaded', function () {
  // jia
  document.oncopy =
    event => event.clipboardData.setData('text', window.getSelection(0).toString());
});

