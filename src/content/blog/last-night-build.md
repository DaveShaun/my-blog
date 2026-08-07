---
title: '昨晚的建站折腾：从 Matrix 终端到 GitHub Actions'
description: '一次关于博客主题重构、部署流程优化和与 AI 协作的深度记录。'
pubDate: 'Aug 07 2026'
---

## 一切的起点

昨晚我打开终端，准备对博客进行一次大的改造。这个博客最初是基于 Astro 框架搭建的，使用 `gh-pages` 部署到 GitHub Pages，挂载在 `northernhiwisen.dpdns.org` 这个通过 DigitalPlat 申请的免费域名上。

问题很多：默认的博客模板风格与我的期望不符、部署流程经常卡死、所有页面需要统一的视觉风格。我决定把这些一次性解决。

## 第一步：Matrix 终端风格的诞生

我想要一种"黑客帝国"式的终端界面。于是我开始设计：

- 黑色背景 + 绿色荧光字体（`#00ff41 on #000000`）
- 经典的 Matrix 数字雨动画，用 `<canvas>` 实现
- 等宽字体 + 磷光 glow 效果 + CRT 扫描线叠加
- ASCII art 替代所有图片
- 打字机风格的渐入动画

主页变成了一个终端窗口，里面有 `$ whoami`、`$ ls nav/` 这样的命令行交互展示。博客列表页变成了 `ls -la ./posts/` 风格的文件列表。关于页面变成了 `cat ~/.identity` 风格的个人信息展示。

## 第二步：base 路径的坑

过程中遇到第一个坑：Astro 配置中 `base: '/my-blog'` 导致资源路径不匹配。因为使用自定义域名时，GitHub Pages 从域名根目录提供服务，而不是 `/my-blog`。改成 `base: '/'` 后资源加载恢复正常。

## 第三步：gh-pages 分支的噩梦

接下来是部署问题。使用 `gh-pages` npm 包推送部署时，构建反复失败，持续时间 0ms——这意味着是验证错误而非内容错误。

经过反复排查，发现 `gh-pages` 分支上积累了不属于 `dist/` 目录的多余文件（`.vscode`、`.wrangler`、`.gitignore`），这些是之前部署的残留。GitHub Pages 构建时处理这些文件失败。

更糟糕的是，CDN 缓存导致即使构建成功，线上看到的还是旧版本。最长的一次构建等待了 30 分钟还是卡死状态。

## 第四步：切换到 GitHub Actions

痛定思痛，决定放弃 `gh-pages` 包，切换到 GitHub Actions 部署。

创建 `.github/workflows/deploy.yml`：
- `build` 任务：checkout → 安装 Node 22 → `npm ci` → `npm run build` → 上传 artifact
- `deploy` 任务：使用 `actions/deploy-pages@v4` 自动部署

通过 API 将 GitHub Pages 源从 branch 切换为 workflow。

第一次用 GitHub Actions 部署时，构建耗时 8 秒。对比之前 `gh-packages` 的 7 分钟到 30 分钟卡死，简直是两个世界。

## 第五步：PAT 权限的教训

推送 workflow 文件时，GitHub 拒绝了——当前 PAT 缺少 `workflow` scope。重新生成了带 `workflow` 权限的 PAT 后才成功推送。

## 第六步：全站统一

逐步将所有页面统一为终端风格：
- 博客列表页 → 文件列表风格
- 文章页 → ASCII art 边框 + 终端元信息
- 关于页 → 个人信息网格 + ASCII 头像
- 导航栏统一为 Homepage / Blog / Novel / About

创建了独立的 Novel 页面，用于展示小说与创意写作。

## 第七步：微信验证

微信要求部署验证文件到网站根目录。重新创建了之前误删的验证文件，通过 GitHub Actions 部署后秒级生效。

## 总结

这次折腾的核心收获：

1. **部署方式的选择**：GitHub Actions 远比 `gh-pages` 包可靠，日志透明，部署快速
2. **缓存是隐形的敌人**：CDN 缓存和旧分支残留文件是部署问题的常见根源
3. **AI 协作的效率**：与 AI 的对话式开发让设计迭代变得极快——想法到实现的时间大幅缩短
4. **权限管理**：GitHub PAT 的 scope 权限要提前规划，避免推送时才发现权限不足

整个网站从一个普通的博客模板，变成了一个具有 Matrix 终端美学风格的作品集站点。折腾本身，就是乐趣的一部分。
