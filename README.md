#### 如何使用？

##### 1.浏览器扩展程序设置

```bash
// 1.可以在地址栏输入此 url或者在设置里打开
chrome://extensions/
// 2. 打开右上角开发者模式，如下图所示。
```

<img src="https://picture.zhengyabing.top/uPic/image-20231105095313411.png" alt="image-20231105095313411" style="zoom:33%;" />

##### 2. git 下载到本地

> git clone https://github.com/whutBing/stop-copy-with-annoying-copyright.git

##### 3.更改配置

> 需要进行一定的配置，将需要进行屏蔽版权信息的网站加入 `host_permissions` 数组，如下图所示。
>
> 配置可以参考：https://developer.chrome.com/docs/extensions/migrating/manifest/

<img src="https://picture.zhengyabing.top/uPic/image-20231105101159019.png" alt="image-20231105101159019" style="zoom:33%;" />

##### 4.加载程序

<img src="https://picture.zhengyabing.top/uPic/image-20231104225919234.png" alt="image-20231104225919234" style="zoom: 33%;" />

点击上述红框按钮，找到下载的程序，并将其加载进来。

##### 5.注意事项

1. 仅仅是去掉恼人的版权信息，请**合理合法**使用，**自行承担相应责任**。代码仅供学习参考。

2. 代码较少，原理就是在恰当的时机（beforecopy 执行时机，不知为什么` DOMContentLoaded`不行，待研究）重新设置了一下 oncopy 事件。

```js
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
```

3. TODO
   - 修复浏览器会报跨域的错误
   - 实现 background.js（比如计下数/记录最近三条记录，点击插件进行弹出）
   - 找一个帅气侧漏的 logo

---
