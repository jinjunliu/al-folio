---
layout: post
title: Index Area Citation Error of Microsoft Word
date: 2024-07-30
description: "How to fix the error shown in Microsoft Word: Citation/Bibliography is wrongly placed in index area, please delete the placed citation/bibliography in index area."
tags:
  - Microsoft Word
  - Citation
  - Mendely
  - Zotero
draft: false
categories: Tech
giscus_comments: true
---

<img src="/assets/img/posts/2024-07-30-word-citation-error-heroImage.png" alt="Citation/Bibliography is wrongly placed in index area, please delete the placed citation/bibliography in index area." class="img-fluid" style="width: 100%; height: auto;"/>

When you are writing a paper in Microsoft Word and using a reference manager like Mendeley or Zotero, you may encounter an error message like this:

> Citation/Bibliography is wrongly placed in index area, please delete the placed citation/bibliography in index area.

I encountered this error only in my Windows PC, but not in my Mac. The error message is not very informative, at first I asked ChatGPT but I didn't get a useful answer.

The solution is actually very simple. I installed both Mendeley and Zotero plugins for Word on my Windows PC, but I only use Zotero on my MacBook. The paper was originally written on my MacBook, and I opened it on my Windows PC to continue writing, and the error occurred. So I realized that the error might be caused by the conflict between Mendeley and Zotero plugins.

So I tried to disable the Mendeley plugin in Word, and the error disappeared, that's it.

The steps are: open Word, go to `File` -> `Options` -> `Add-ins`, on the `manage` dropdown list, select `templates`, click `Go...`, uncheck the Mendeley plugin, and click `OK`.
