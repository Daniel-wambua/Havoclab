<h1 align="center">🧬 HavocLab</h1>
<p align="center">
<a href="https://github.com/Daniel-wambua/havoclab"><img src="https://cdn.shopify.com/s/files/1/1976/5867/files/Havoc_LOGO-03_medium.png?v=1553743026" width="120" /><br /></a>
<i>Modern project showcase with glassmorphic design</i>
<br />
<i>Auto-fetches GitHub repos with smooth animations</i>
<br />
<b>🌐 <a href="https://github.com/Daniel-wambua/havoclab">github.com/Daniel-wambua/havoclab</a></b> <br />
</p>

## Motive
Why waste time building portfolio sites from scratch when you can have one that auto-syncs with your GitHub?
HavocLab eliminates manual project updates. Just push to GitHub and your showcase updates automatically. Built with bleeding-edge tech so you don't need to f**k around with outdated frameworks and slow-loading sites.

<details>
  <summary>About the Developer</summary>

> **Professional Background**<br>
> I'm an experienced, Principal-level full stack engineer with a passion for quality, performance, mentoring, technology and open source. I believe the best judge of a developer is their code, and while I cannot share proprietary work, I have many open source projects on my [GitHub](https://github.com/Daniel-wambua) and showcase my skills at [lab.havocsec.me](https://lab.havocsec.me).

</details>

---

## About

HavocLab is a SvelteKit-powered project showcase that automatically displays your GitHub repositories. No manual updates needed—just a sleek, performant portfolio site.

**Core Features:**
- 🧬 Auto GitHub API integration
- 🎨 Glassmorphic dark theme (#00AEEF accent)
- ⚡ Motion One animations (3.8KB vs 90KB alternatives)
- 🔍 Real-time search & filter
- ⭐ Featured projects support
- 📱 Responsive grid (1→2→3→4 columns)
- 🎯 Smart context-aware icons

**Tech Stack:**
- SvelteKit 2.0 + Svelte 5.0
- TailwindCSS 3.4 (custom dark theme)
- Motion One 10.16 (lightweight animations)
- TypeScript 5.0 (fully typed)
- GitHub REST API

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/Daniel-wambua/havoclab.git
cd havoclab

# Install dependencies
npm install

# Configure GitHub username
# Edit src/lib/constants.ts → GITHUB_USERNAME

# (Optional) Add GitHub token to avoid rate limits
# Copy .env.example to .env and add your token
cp .env.example .env
# Get token at: https://github.com/settings/tokens
# Add to .env: GITHUB_TOKEN=your_token_here

# Run dev server
npm run dev
```

<details><summary>Deployment Options</summary>

**Vercel** (One-Click Deploy)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Daniel-wambua/havoclab)

**Manual Deployment:**

- **Vercel**: `npm install -g vercel && vercel --prod`
- **Cloudflare Pages**: `npm i -D @sveltejs/adapter-cloudflare && npm run build && npx wrangler pages deploy .svelte-kit/cloudflare`
- **Netlify**: `npm i -D @sveltejs/adapter-netlify && npm run build && netlify deploy --prod`
- **Docker**: `docker build -t havoclab . && docker run -p 3000:3000 havoclab`

</details>

---

## Usage

**Customize Your Showcase:**

| Task | Location | Example |
|------|----------|---------|
| Change GitHub user | `src/lib/constants.ts` | `GITHUB_USERNAME = 'your-username'` |
| Add featured projects | `src/lib/featured.json` | Add objects with `name`, `description`, `icon` |
| Customize theme | `tailwind.config.js` | Change `accent` color |
| Update branding | `src/lib/components/Header.svelte` | Change icon/text |

**Project Structure:**
```
src/
├── lib/
│   ├── components/       # Header, FilterBar, ProjectCard
│   ├── constants.ts      # GitHub config
│   ├── types.ts          # TypeScript interfaces
│   └── featured.json     # Featured projects
├── routes/
│   ├── +page.svelte      # Main showcase
│   └── api/              # GitHub/Featured endpoints
└── app.css               # Tailwind + glassmorphism
```

---

## Architecture

```
GitHub API → Fetch Repos → Combine with Featured → Filter/Search → Display
                                                           ↓
                                           Motion One Animations
```

**How It Works:**
```
1. App loads → Fetch from /api/repos (GitHub) + /api/featured (local JSON)
2. Merge data → Featured projects appear first
3. User types → Filter by name/language in real-time
4. Cards animate → Fade-in with stagger, hover lift effects
```

---

## Contributing

Contributions welcome! Fork, improve, and submit a PR.

**Ideas for enhancement:**
- Dark/light mode toggle
- Sorting options (stars, forks, updated)
- GitHub stars/forks display
- Project tags/categories
- Analytics integration

---

## License

> _**[Daniel-wambua/havoclab](https://github.com/Daniel-wambua/havoclab)** is licensed under [MIT](https://github.com/Daniel-wambua/havoclab/blob/HEAD/LICENSE) © [Daniel Wambua](https://danielwambua.dev) 2025._<br>
> <sup align="right">For information, see <a href="https://tldrlegal.com/license/mit-license">TLDR Legal > MIT</a></sup>

<details>
<summary>Expand License</summary>

```
The MIT License (MIT)
Copyright (c) Daniel Wambua <daniel@wambua.com>

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sub-license, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished 
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

</details>

---

<!-- License + Copyright -->
<p align="center">
  <i>© <a href="https://lab.havocsec.me">Daniel Wambua</a> 2025</i><br>
  <i>Licensed under <a href="https://gist.github.com/Daniel-wambua/143d2ee01ccc5c052a17">MIT</a></i><br>
  <a href="https://github.com/Daniel-wambua"><img src="https://i.ibb.co/4KtpYxb/octocat-clean-mini.png" /></a><br>
  <sup>Thanks for visiting :)</sup>
</p>

<!-- ASCII Art -->
<!-- 
                    🧬 Code DNA 🧬
                    
         ╔═══════╗
         ║ ◢███◣ ║
         ║ █▓▓▓█ ║    "Build your legacy!"
         ║ ◥███◤ ║
         ╚═══╤═══╝
            ╱│╲
           ╱ │ ╲
          ╱  │  ╲
         ╱   │   ╲
        ╱    │    ╲
       ◢═════╧═════◣
         
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       H A V O C L A B   2 0 2 5
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-->

---

