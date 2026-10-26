# 👨‍💻 Bharath G: Developer Portfolio

My personal portfolio website, showcasing my skills, projects and resume. It's a static site
built with **HTML, CSS and JavaScript** (based on the DevFolio template).

## Sections

- **Home**: intro and role
- **About**: background in Artificial Intelligence and software development
- **Skills**: languages, frameworks and tools
- **Projects**: links to featured GitHub projects
- **Resume**: downloadable PDF

## Tech stack

- HTML5, CSS3, JavaScript
- Bootstrap-based DevFolio template
- Libraries: animate.css, easing, Isotope, Lightbox
- Optional Node.js contact endpoint (`js/server.js`) that forwards messages to Formspree

## Run locally

Open `index.html` in a browser, or serve the folder:
```bash
python -m http.server 8000
```
Then open http://localhost:8000.

### Contact form (optional)
1. Create a form at [Formspree](https://formspree.io/) and put its ID in `FORM_ENDPOINT` in `js/server.js`.
2. Start the endpoint:
   ```bash
   node js/server.js
   ```

## Deploy for free with GitHub Pages

1. Go to **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
3. The site is published at `https://bharathgunasekaran.github.io/My_Portfolio/`.

## Project structure

```text
My_Portfolio/
├── index.html     # The portfolio page
├── css/           # Styles
├── js/            # main.js (UI behaviour) and server.js (contact endpoint)
├── lib/           # Third-party front-end libraries
├── img/           # Images
└── resume/        # Resume PDF
```
