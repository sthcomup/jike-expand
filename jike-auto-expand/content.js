// 自动点击“查看更多”按钮
function clickAllSeeMore() {
  let count = 0;
  document.querySelectorAll('div.jk-1c0hwpa').forEach(el => {
    if (el.innerText.trim() === '查看更多') {
      el.click();
      count++;
      console.log('[Jike-AutoExpand] 点击了一个“查看更多”按钮:', el);
    }
  });
  if (count === 0) {
    console.log('[Jike-AutoExpand] 没有找到“查看更多”按钮');
  } else {
    console.log(`[Jike-AutoExpand] 本次共点击了 ${count} 个“查看更多”按钮`);
  }
}

// 初始点击一次
console.log('[Jike-AutoExpand] 插件已注入，开始自动展开动态');
clickAllSeeMore();

// 监听 DOM 变化，自动点击新出现的“查看更多”
const observer = new MutationObserver(() => {
  console.log('[Jike-AutoExpand] 检测到 DOM 变化，尝试自动展开');
  clickAllSeeMore();
});
observer.observe(document.body, { childList: true, subtree: true }); 