---
title: "Why I Switched to Arch Linux: Minimalist Environments for Systems Engineering"
date: "2026-03-20"
readingTime: 4
tags: ["Linux", "Operating Systems", "DevOps", "Developer Tools"]
coverImage: "journal/arch-linux.jpg"
summary: "Configuring a minimal Linux development environment with zsh, Kitty, Neovim, and Ollama background process management."
featured: false
---

# Context & Developer Environment

Transitioned my primary development workspace to Arch Linux running custom kernel configuration parameters.

## Shell & Environment Configuration

```bash
# Minimal Neovim alias & Ollama local daemon bind
alias vim="nvim"
alias ai-daemon="ollama serve --host 127.0.0.1:11434"
```

> **Key Lesson**: A minimal development OS forces deep comprehension of process execution boundaries and system library dependencies.
