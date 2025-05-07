# Jike 自动展开动态插件

## 项目简介

本插件用于自动展开即刻网页版（https://web.okjike.com/following）中的所有动态，无需手动点击“查看更多”按钮，提升浏览体验。

## 功能特性
- 自动检测并点击所有"查看更多"按钮，动态内容自动全部展开
- 支持页面异步加载内容，自动监听并展开新出现的动态
- 控制台输出详细日志，方便调试

## 安装与使用

1. 克隆或下载本项目到本地。
2. 打开 Chrome 浏览器，进入 `chrome://extensions/`，开启"开发者模式"。
3. 点击"加载已解压的扩展程序"，选择 `jike-auto-expand` 文件夹。
4. 访问 [https://web.okjike.com/following](https://web.okjike.com/following)，插件会自动展开所有动态。
5. 如需调试，可按 F12 打开控制台，查看 `[Jike-AutoExpand]` 日志。

## 注意事项
- 如页面结构有变动，需根据实际情况调整 `content.js` 中查找"查看更多"按钮的选择器。
- 本插件仅供学习与个人使用。

## 目录结构
```
jike-auto-expand/
├── manifest.json   # 插件配置文件
├── content.js      # 自动展开核心脚本
└── README.md       # 使用说明
``` 