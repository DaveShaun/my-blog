---
title: '我的建站之旅：从免费域名到 AI 助攻'
description: '一篇关于如何从零开始，借助 DigitalPlat 免费域名、Cloudflare 托管，以及 AI 编程工具 OpenCode 和 MiMoCode，搭建起这个博客的完整记录。'
pubDate: 'Aug 06 2025'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

## 一切的起点

我一直想拥有一个属于自己的个人博客。不是挂在第三方平台上的那种，而是真正拥有独立的域名、独立的服务器、独立的内容。但作为一个"折腾爱好者"，我总在纠结：花几十块钱买个域名到底值不值？服务器又要怎么选？技术栈用哪个？

直到有一天，我偶然间发现了月半菌的博客文章 —— [使用 DigitalPlat 快速获得永久免费域名，Cloudflare 可托管](https://www.ybjun.com/posts/dpdns-free-domain/)。

## 注册免费域名

这篇文章介绍了一个叫 **DigitalPlat** 的开源项目，由非营利组织 The Hack Foundation 运营。通过它，你可以获得一个永久免费的顶级域名（`.dpdns.org`），并且支持 Cloudflare 托管。

整个注册流程并不复杂：

1. 用真实邮箱注册 DigitalPlat 账号
2. 通过 GitHub OAuth 完成 KYC 验证（需要注册满 30 天且有活跃记录）
3. 在 Dashboard 中选择心仪的子域名
4. 将域名的 NS 记录指向 Cloudflare 的域名服务器
5. 完成 WHOIS 隐私保护设置

唯一需要注意的是，免费域名每年需要续签一次（到期前 180 天内），不过到期前会邮件提醒，所以不用担心。

注册完成后，我在 Cloudflare 上完成了域名的托管和 DNS 配置。至此，我有了一个属于自己的域名：`northernhiwisen.dpdns.org`。

## 技术选型：让 AI 帮忙搞定

域名有了，但博客用什么搭？我开始调研各种方案：Hexo、Hugo、Next.js、Astro……选择太多，反而难以抉择。

这时候，我决定让 AI 来帮忙。我先使用了 **OpenCode**，让它帮我对比各种博客框架的优缺点，最终 Astro 脱颖而出 —— 它性能出色、SEO 友好、支持 Markdown 和 MDX，还有丰富的集成生态（RSS、Sitemap 等）。

后来我又切换到了 **MiMoCode**，在这个 AI 助手的帮助下，我基于 Astro 的官方博客模板快速搭建了项目结构，配置了 TypeScript、部署脚本，以及 GitHub Pages 的自动发布流程。

整个过程比我预想中顺利得多。AI 不仅帮我写代码，还帮我理清了部署流程中的各种细节 —— 比如 GitHub Pages 的 `base` 路径配置、`gh-pages` 分支的自动化推送、CNAME 文件的作用等等。

## 部署上线

最终的部署方案非常简洁：

- 代码托管在 GitHub
- `npm run deploy` 一键构建并推送到 `gh-pages` 分支
- Cloudflare 负责 DNS 解析和 CDN 加速
- 通过 `public/CNAME` 文件绑定自定义域名

## 写在最后

从发现那篇文章到博客上线，整个过程充满了探索的乐趣。DigitalPlat 让我零成本拥有了域名，Cloudflare 提供了稳定免费的 CDN 和 DNS 服务，而 OpenCode 和 MiMoCode 这两个 AI 工具则大大降低了技术门槛，让我能更专注于内容本身。

这个博客现在还是一个"毛坯房"，后续我会继续完善它的设计和功能。但至少，它已经存在了 —— 在互联网的某个角落，有了一个属于我自己的小角落。

如果你也有类似的想法，不妨从现在开始。折腾本身，就是乐趣的一部分。
