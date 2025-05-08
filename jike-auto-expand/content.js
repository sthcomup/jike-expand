// 自动点击"查看更多"按钮
function clickAllSeeMore() {
  let count = 0;
  document.querySelectorAll('div.jk-1c0hwpa').forEach(el => {
    if (el.innerText.trim() === '查看更多') {
      el.click();
      count++;
      console.log('[Jike-AutoExpand] 点击了一个"查看更多"按钮:', el);
    }
  });
  if (count === 0) {
    console.log('[Jike-AutoExpand] 没有找到"查看更多"按钮');
  } else {
    console.log(`[Jike-AutoExpand] 本次共点击了 ${count} 个"查看更多"按钮`);
  }
}

// 初始点击一次
console.log('[Jike-AutoExpand] 插件已注入，开始自动展开动态');
clickAllSeeMore();

// 监听 DOM 变化，自动点击新出现的"查看更多"
const observer = new MutationObserver(() => {
  console.log('[Jike-AutoExpand] 检测到 DOM 变化，尝试自动展开');
  clickAllSeeMore();
});
observer.observe(document.body, { childList: true, subtree: true });

// 悬浮窗功能：鼠标悬停在转发动态上时展示内容，浮窗固定在右侧空白区域
(function() {
  // 创建悬浮窗元素
  let hoverBox = document.createElement('div');
  hoverBox.style.position = 'fixed';
  hoverBox.style.top = '100px';
  hoverBox.style.right = '40px';
  hoverBox.style.width = '360px';
  hoverBox.style.maxHeight = '60vh';
  hoverBox.style.overflowY = 'auto';
  hoverBox.style.background = 'rgba(255,255,255,0.98)';
  hoverBox.style.boxShadow = '0 2px 16px rgba(0,0,0,0.18)';
  hoverBox.style.borderRadius = '10px';
  hoverBox.style.padding = '20px';
  hoverBox.style.display = 'none';
  hoverBox.style.pointerEvents = 'auto';
  hoverBox.style.fontSize = '15px';
  hoverBox.style.color = '#222';
  hoverBox.style.lineHeight = '1.7';
  hoverBox.style.wordBreak = 'break-all';
  hoverBox.style.transition = 'opacity 0.2s';
  hoverBox.style.opacity = '0.98';
  hoverBox.style.zIndex = '9999';
  document.body.appendChild(hoverBox);

  // 监听鼠标移入/移出
  function addHoverListenersToCards() {
    document.querySelectorAll('.jk-1caakmw').forEach(card => {
      if (card._jikeHoverBound) return;
      card._jikeHoverBound = true;
      card.addEventListener('mouseenter', function(e) {
        const main = card.querySelector('.jk-1s7grah');
        if (main) {
          hoverBox.innerText = main.innerText;
          hoverBox.style.display = 'block';
        }
      });
      card.addEventListener('mouseleave', function() {
        hoverBox.style.display = 'none';
      });
    });
  }

  // 初始绑定
  addHoverListenersToCards();
  // 监听 DOM 变化，动态绑定
  const cardObserver = new MutationObserver(addHoverListenersToCards);
  cardObserver.observe(document.body, { childList: true, subtree: true });
})();

// 评论展开功能：点击评论按钮后在原动态下方展开评论，不跳转新页面
(function() {
  // 评论展开容器 class
  const COMMENT_CONTAINER_CLASS = 'jike-comment-container';

  // 监听评论按钮点击
  function addCommentClickListeners() {
    document.querySelectorAll('.jk-dbwa1i').forEach(btn => {
      if (btn._jikeCommentBound) return;
      btn._jikeCommentBound = true;
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();

        // 找到当前动态的主容器
        let card = btn.closest('.jk-1caakmw');
        if (!card) return;

        // 检查是否已展开
        let old = card.querySelector('.' + COMMENT_CONTAINER_CLASS);
        if (old) {
          old.remove();
          return;
        }

        // 创建评论容器
        let commentBox = document.createElement('div');
        commentBox.className = COMMENT_CONTAINER_CLASS;
        commentBox.style.background = '#f7f7fa';
        commentBox.style.margin = '16px 0 0 0';
        commentBox.style.padding = '16px';
        commentBox.style.borderRadius = '8px';
        commentBox.style.fontSize = '14px';
        commentBox.innerText = '这里是评论内容（可替换为真实评论数据）';

        // 插入到动态下方
        card.appendChild(commentBox);

        // TODO: 这里可用 fetch 请求真实评论接口，渲染评论内容
      });
    });
  }

  // 初始绑定
  addCommentClickListeners();
  // 监听 DOM 变化，动态绑定
  const commentObserver = new MutationObserver(addCommentClickListeners);
  commentObserver.observe(document.body, { childList: true, subtree: true });
})(); 