# MovieHub 🎬✨

Welcome to MovieHub — a sleek, minimal Angular app for browsing and downloading movies & series. Perfect for demoing a media-collection UI with trending lists, recent uploads, and series season/episode download links.

- 🚀 Built with Angular
- 🎨 Tailwind CSS for styling
- 🔁 Horizontal scrolling lists for series
- 📂 Simple component structure: navbar, card, pages (home, content, content-detail)

---

## Features

- 🎞️ Latest Movies & Series view
- 🔥 Trending Bollywood & Hollywood sections
- 📺 Series with season/episode selectors and download links
- 🧭 Search results and collections routing
- ♿ Responsive design (desktop-first, mobile notice)

---

## Quick Start

Prerequisites:
- Node.js (16+ recommended)
- npm

Install and run:

```bash
# install dependencies
npm install

# start (uses the `start` script from package.json)
npm start
```

Open your browser at http://localhost:4200 (or the port configured by the app).

---

## Project Structure (high level)
```
├── 📁 .angular
├── 📁 public
│   └── 📄 favicon.ico
├── 📁 src
│   ├── 📁 app
│   │   ├── 📁 api
│   │   │   ├── 📄 apiConfig.ts
│   │   │   └── 📄 apiEndpoints.ts
│   │   ├── 📁 components
│   │   │   ├── 📁 card
│   │   │   │   ├── 🎨 card.css
│   │   │   │   ├── 🌐 card.html
│   │   │   │   ├── 📄 card.spec.ts
│   │   │   │   └── 📄 card.ts
│   │   │   └── 📁 navbar
│   │   │       ├── 🎨 navbar.css
│   │   │       ├── 🌐 navbar.html
│   │   │       ├── 📄 navbar.spec.ts
│   │   │       └── 📄 navbar.ts
│   │   ├── 📁 pages
│   │   │   ├── 📁 content
│   │   │   │   ├── 🎨 content.css
│   │   │   │   ├── 🌐 content.html
│   │   │   │   ├── 📄 content.spec.ts
│   │   │   │   └── 📄 content.ts
│   │   │   ├── 📁 content-detail
│   │   │   │   ├── 🎨 content-detail.css
│   │   │   │   ├── 🌐 content-detail.html
│   │   │   │   ├── 📄 content-detail.spec.ts
│   │   │   │   └── 📄 content-detail.ts
│   │   │   ├── 📁 home
│   │   │   │   ├── 🎨 home.css
│   │   │   │   ├── 🌐 home.html
│   │   │   │   ├── 📄 home.spec.ts
│   │   │   │   └── 📄 home.ts
│   │   │   └── 📁 search-results
│   │   │       ├── 🎨 search-results.css
│   │   │       ├── 🌐 search-results.html
│   │   │       ├── 📄 search-results.spec.ts
│   │   │       └── 📄 search-results.ts
│   │   ├── 📁 services
│   │   │   ├── 📄 search.spec.ts
│   │   │   └── 📄 search.ts
│   │   ├── 📄 app.config.server.ts
│   │   ├── 📄 app.config.ts
│   │   ├── 🎨 app.css
│   │   ├── 🌐 app.html
│   │   ├── 📄 app.routes.server.ts
│   │   ├── 📄 app.routes.ts
│   │   ├── 📄 app.spec.ts
│   │   └── 📄 app.ts
│   ├── 🌐 index.html
│   ├── 📄 main.server.ts
│   ├── 📄 main.ts
│   ├── 📄 server.ts
│   └── 🎨 styles.css
├── ⚙️ .editorconfig
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ angular.json
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.cjs
├── 📄 tailwind.config.cjs
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
└── ⚙️ tsconfig.spec.json
```

(See the `src/app` folder for full structure.)

---

## Notes

- The app currently emphasizes desktop (large-screen) layout — mobile shows a message for PC view in `home.html`.
- Horizontal series scroller uses programmatic `scrollLeft` / `scrollRight` handlers.

---

## Contributing

Feel free to open issues or send PRs. Small improvements: accessibility, mobile layout, caching, and unit tests.

---

## License

MIT — adapt as needed.

---

Thanks for checking out MovieHub! 🎥🍿
