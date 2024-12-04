document.addEventListener('DOMContentLoaded', async () => {
  const urlList = document.getElementById('urlList');
  const addUrlBtn = document.getElementById('addUrlBtn');

  // 加载保存的 URLs
  const loadUrls = async () => {
    const data = await chrome.storage.local.get('userUrls');
    const urls = data.userUrls || [];
    urlList.innerHTML = '';

    if (urls.length === 0) {
      urlList.innerHTML = '<div class="empty-message">暂无配置的 URL，点击下方按钮添加</div>';
      return;
    }

    urls.forEach((url, index) => {
      const urlItem = createUrlItem(url, index);
      urlList.appendChild(urlItem);
    });
  };

  // 创建单个 URL 项
  const createUrlItem = (url, index) => {
    const div = document.createElement('div');
    div.className = 'url-item';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'url-input';
    input.value = url;
    input.placeholder = '请输入网站域名，例如: github.com';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '删除';

    // 删除 URL
    deleteBtn.onclick = async () => {
      if (confirm('确定要删除这个 URL 吗？')) {
        const data = await chrome.storage.local.get('userUrls');
        const urls = data.userUrls || [];
        urls.splice(index, 1);
        await chrome.storage.local.set({ userUrls: urls });
        await loadUrls(); // 重新加载列表以更新索引
      }
    };

    // 编辑 URL
    let timeoutId;
    input.addEventListener('input', () => {
      // 防抖处理
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const data = await chrome.storage.local.get('userUrls');
        const urls = data.userUrls || [];
        urls[index] = input.value.trim();
        await chrome.storage.local.set({ userUrls: urls });

        // 显示保存成功提示
        const savedTip = document.createElement('span');
        savedTip.className = 'saved-tip';
        savedTip.textContent = '已保存';
        div.appendChild(savedTip);
        setTimeout(() => savedTip.remove(), 1000);
      }, 500);
    });

    div.appendChild(input);
    div.appendChild(deleteBtn);
    return div;
  };

  // 添加新 URL
  addUrlBtn.onclick = async () => {
    const data = await chrome.storage.local.get('userUrls');
    const urls = data.userUrls || [];
    urls.push('');
    await chrome.storage.local.set({ userUrls: urls });
    await loadUrls();
    // 聚焦到新添加的输入框
    const inputs = document.querySelectorAll('.url-input');
    inputs[inputs.length - 1].focus();
  };

  // 初始加载
  loadUrls();
}); 
