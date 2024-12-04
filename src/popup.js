document.addEventListener('DOMContentLoaded', async () => {
  // 从 storage 获取数据
  const data = await chrome.storage.local.get(['copyCount', 'recentCopies']);

  // 更新复制次数
  document.getElementById('copyCount').textContent = data.copyCount || 0;

  // 更新最近复制记录
  const recentCopiesDiv = document.getElementById('recentCopies');
  const recentCopies = data.recentCopies || [];

  recentCopiesDiv.innerHTML = recentCopies
    .map(copy => `
      <div class="copy-record">
        <span class="full-text" title="${copy}">${copy}</span>
      </div>
    `).join('');
  recentCopiesDiv.addEventListener("click", async (e) => {
    console.log(e.target.className, 'ddddddd');
    if (e.target.className === "copy-record") {
      const fullText = e.target.title;
      try {
        await navigator.clipboard.writeText(fullText);
        e.target.style.backgroundColor = "#e0f2fe";
        setTimeout(() => {
          e.target.style.backgroundColor = "";
        }, 200);
      } catch (err) {
        console.error('复制失败:', err);
      }
    }
  })

  // 在 DOMContentLoaded 事件处理程序中添加
  document.getElementById('settingsBtn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

});
