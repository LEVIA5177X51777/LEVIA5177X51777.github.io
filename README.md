# Flutter Developer Portfolio

A responsive, static portfolio site for showcasing Flutter and mobile product work. It includes an interactive project carousel and hoverable, keyboard-focusable hexagon skill tiles in a dark green theme. It uses plain HTML, CSS, and JavaScript, so there is no build step or dependency installation.

## Personalize it

Before publishing, update these items in `index.html`:

- Your name, email, GitHub profile, and LinkedIn profile are already filled in.
- Add links to public project case studies or repositories if you can share them.
- Review the anonymized project summaries and adjust them to match your exact contributions without disclosing NDA-protected details.
- Update the page title and description if you want a different professional headline.

The project write-ups use generic product categories to respect NDAs. The profile photo is in `assets/aftab-rahman.jpg`; replace it with a brighter headshot any time for a more formal first impression.

## Preview locally

Open `index.html` in a browser. The page is static and can also be served by any simple local web server.

## Publish with GitHub Pages

1. Create a public GitHub repository. For the cleanest URL, name it `<your-github-username>.github.io`; a regular repository also works and receives a project URL.
2. Add these files at the repository root and push them to the `main` branch.
3. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` publishes the site on pushes to `main`. You can also run it from the **Actions** tab.
5. GitHub Pages will show the public site URL in **Settings → Pages** after deployment completes.

The workflow deploys only this static site; it does not require a token or third-party action beyond GitHub's official Pages actions.
