# gunh0's Tech Blog

A modern tech blog built with Next.js, featuring GitLab-inspired design with dark mode support.

## 🚀 Features

- ⚡ Built with Next.js 16 (App Router with Turbopack)
- 🎨 GitLab-inspired design (light & dark modes)
- 📝 Markdown-based blog posts
- 📂 Fixed sidebar navigation (GitLab Docs style)
- 🏷️ Tag system with trending topics in sidebar
- 📅 Year-based archive navigation
- 🎴 Card-based post layout on home
- 📋 List-based archive view
- 📱 Fully responsive (mobile toggle sidebar)
- 🔍 SEO optimized
- 📦 Static site generation for GitHub Pages

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (with Turbopack)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Markdown**: gray-matter, remark
- **Deployment**: GitHub Pages

## 📦 Installation

```bash
make install
```

## 🔧 Development

Start the development server:

```bash
make dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

Build for production:

```bash
make build
```

Export static files:

```bash
make export
```

## 🌐 Local Preview

Preview the static site locally:

```bash
make serve
```

This will start a local server at [http://localhost:8000](http://localhost:8000).

## 📝 Writing Posts

Posts are organized by year in the `posts/` directory:

```
posts/
├── 2024/
│   └── 11-16-my-post-title/
│       ├── 2024-11-16-my-post-title.md
│       └── image.png (optional)
└── 2025/
    └── 01-15-another-post/
        └── 2025-01-15-another-post.md
```

### Create a new post

```bash
./scripts/create-post.sh "Post Title" "tag1,tag2"
```

### Manual creation

Frontmatter format:

```yaml
---
title: Your Post Title
date: 2024-01-01 12:00:00 +09:00
tags: [tag1, tag2]
description: Brief description
---

Your content...
```

## 🎨 Theme

The blog features a GitLab-inspired color scheme:

- **Light Mode**: Clean white background with GitLab orange (#fc6d26) accents
- **Dark Mode**: Dark background (#1f1f1f) with purple (#9475cd) accents

## 📄 Commands

| Command | Description |
|---------|-------------|
| `make install` | Install dependencies |
| `make dev` | Start development server |
| `make build` | Build for production |
| `make serve` | Build and serve locally (port 8000) |
| `make clean` | Clean build files |
| `make clean-all` | Clean all including node_modules |

## 🚀 Deployment

Automatically deploys to GitHub Pages on push to `main` branch via GitHub Actions.

**Local preview:**

```bash
make serve  # http://localhost:8000
```

## 👤 Author

**gunh0** - Security Research Engineer

- GitHub: [@gunh0](https://github.com/gunh0)
- LinkedIn: [gunh0902](https://linkedin.com/in/gunh0902)

## 📝 License

Apache License 2.0 © gunh0

---

Built with Next.js 16 | Inspired by GitLab Docs
