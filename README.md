# Lumu Francis Xavier — Portfolio

A responsive React portfolio for a software engineering student and full-stack / ML developer in Kampala, Uganda. The orange-and-black design follows the supplied visual reference, with condensed typography, a warm hero glow, and staggered project cards. Built with Vite, locally bundled fonts, accessible native project dialogs, and a pre-rendered homepage.

![Desktop portfolio preview](docs/portfolio-desktop-20260926.jpg)

## Local development

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
```

The `dist/` folder contains the complete website. It is committed for direct upload to InfinityFree. The generated homepage contains the portfolio content before JavaScript runs. All scripts, fonts, styles, and icons are local assets.

## InfinityFree

Target domain: `lumuxavier.site.je`.

### Automatic deployment from GitHub

The `Deploy to InfinityFree` workflow builds the site on every push to `main` and uploads only the generated `dist/` contents over explicit FTPS. It can also be run manually. Deployment starts only after the build succeeds and all four hosting secrets are present. Without those secrets, the workflow builds the site and reports that the upload was skipped.

One-time setup:

1. In the InfinityFree client area, open the hosting account for `lumuxavier.site.je` and find **FTP Details**. These are hosting/FTP credentials, not the email and password used to sign into the client area.
2. In the account's File Manager, confirm the domain's website directory. Use `/htdocs/` when the website is in the main `htdocs` folder. If the domain has its own folder, use its actual FTP path, such as `/example.com/htdocs/`. Include the final slash.
3. Open [the repository's Actions secrets settings](https://github.com/lumuxav/profile/settings/secrets/actions). Choose **New repository secret** for each value below. Enter the password directly in GitHub; do not put credentials into source files or chat.

| Secret name | Value |
| --- | --- |
| `FTP_SERVER` | The FTP hostname shown by InfinityFree, normally `ftpupload.net` |
| `FTP_USERNAME` | The hosting account's FTP username, often starting with `if0_` |
| `FTP_PASSWORD` | The hosting account's FTP password |
| `FTP_SERVER_DIR` | The verified website directory, normally `/htdocs/` |

4. Open [Actions → Deploy to InfinityFree](https://github.com/lumuxav/profile/actions/workflows/deploy-infinityfree.yml), choose **Run workflow**, select `main`, and run it. Adding secrets alone does not trigger deployment.
5. Open the workflow run. Confirm **Upload the built site** completed successfully, then visit the domain. A successful build with a skipped upload does not mean the site is live.

After setup, saving changes to `main` triggers a fresh build and upload automatically. Changes made only on your computer or another branch do not go live until pushed or merged into `main`. The workflow rebuilds from source, so it does not depend on the committed `dist/` being up to date. It does not commit generated files back to the repository. A failed build stops deployment; an interrupted FTP upload may need a rerun.

The workflow uses certificate-verified FTPS on port 21, pins its actions to commit IDs, and does not clear the hosting directory. Keep the deployment action's sync-state file so later runs can identify the files it manages.

References: [InfinityFree's GitHub Actions guidance](https://forum.infinityfree.com/t/using-github-actions-for-automatic-upload-to-infinityfree/111008), [GitHub repository secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets), and [FTP Deploy Action settings](https://github.com/SamKirkland/FTP-Deploy-Action).

### Manual upload

1. Open the domain's File Manager.
2. Open its `htdocs` directory.
3. Upload the **contents** of `dist/` directly into `htdocs`, preserving `assets/` and the other folders. The homepage should be `htdocs/index.html`, not `htdocs/dist/index.html`.
4. Open the domain to check the result. HTTPS depends on the certificate configured in InfinityFree.

The deployed site is static: there is no Node.js server to run on InfinityFree. GitHub handles the build when automatic deployment is configured.

## Content and images

Edit `src/profile.js` for profile details, project descriptions, technology lists, and links. Add supplied images under `public/images/` and set each project's `image` or the profile's `portrait` to the corresponding relative URL. Rebuild after changes.

The public contact links are:

- GitHub: [lumuxav](https://github.com/lumuxav)
- WhatsApp: [0757 742 177](https://wa.me/256757742177)
- Instagram: [_l.u.m.u_](https://www.instagram.com/_l.u.m.u_/)

The contact form opens a WhatsApp draft containing the visitor's name and message. It validates the fields and offers a fallback draft link; the visitor decides whether to send it. The site does not store or transmit form submissions to a server. Individual project demo and repository links are omitted as requested; project buttons open descriptive case studies.

## Content decisions

- SmartLife, SmartGuard, and the Millennium Fellowship are omitted.
- The study year is omitted because the sources conflict; the undergraduate degree and institution are retained.
- The latest AquaSentinel description takes priority: YOLO26 → ByteTrack → BiLSTM with attention.
- AquaSentinel's detector metrics are identified as reported results from a 50-epoch run; they are not presented as whole-system diagnostic accuracy. The simulated water-quality panel and prototype authentication are explained in the project details.
- No personal student identifier is included.
- The supplied image is a design reference. Its model is not used as Xavier's portrait; the current hero uses typography and CSS artwork.

## Checks

`npm run build` produces the static bundle and pre-rendered homepage. Static validation covers headings, local asset references, internal anchors, excluded content, and public contact destinations. Browser verification covers desktop and phone layouts, mobile navigation, and project dialog opening and Escape-key dismissal.

## Structure

```text
src/App.jsx          Page sections, navigation, project dialogs, contact composer
src/profile.js       Profile, projects, skills, and destination links
src/styles.css       Theme and responsive layout
src/main.jsx         React hydration and local fonts
src/render.jsx       Server render used only during the build
scripts/prerender.mjs Build-time HTML generation
.github/workflows/   Automatic InfinityFree build and deployment
public/              Static assets and font licenses
dist/                Files to upload into htdocs
```

Font licenses are included under `public/licenses/` and copied into the upload folder by Vite. Interface icons are provided by Lucide under the ISC license. Project content comes from the supplied profile; it has not been independently audited.
