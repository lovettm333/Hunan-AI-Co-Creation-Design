# A Little Wonder

A simple, responsive personal art website featuring Vincent van Gogh’s *The Starry Night*. Built with plain HTML and CSS; no installation or build tools required.

## Intent — Feedback studio

The interactive tool lives at `feedback/` and is linked from the art journal navigation:
https://lovettm333.github.io/Hunan-AI-Co-Creation-Design/feedback/

Based on Mya’s storyboard, it supports collecting feedback, reviewing possible underlying concerns, comparing three revision directions, and documenting an intentional choice with evidence and a validation plan.

1. Enter a project, design intention, and one feedback comment per line, or choose **Try an example**.
2. Select **Find the signal**, then edit suggested concerns, set your own priorities, and move comments between themes.
3. Explore three directions for a theme and customize your chosen approach.
4. Save the rationale and test plan to the revision log; track its status and export notes.

This first version uses deterministic English keyword rules and predefined design prompts, **not a live AI model**. It does not inspect design files, infer participant counts, or establish severity. Mixed and ambiguous wording needs human review. An optional prompt download supports a separate AI discussion; nothing is sent automatically.

Data stays in the browser. Device persistence is opt-in; disabling it removes the saved local workspace. JSON workspace files support backup and restore; Markdown exports provide readable notes. Changing input requires reanalysis before comparing directions, while saved decisions retain their original evidence. There are no dependencies, API keys, analytics, or server calls.

Run logic checks with `node --test feedback/engine.test.cjs`. Serve the repository with the Python command below to test the full browser experience.

## Update the biography

Edit Mya’s short biography in `index.html` under `id="about"` whenever you want to update it.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Commit and push these files to the `main` branch.
2. In the GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose **main** and **/(root)**, then click **Save**.
5. Wait for GitHub’s deployment to finish. Open the published link in a private browser window to confirm it works without signing in.

Expected website address after Pages is enabled:
https://lovettm333.github.io/Hunan-AI-Co-Creation-Design/

## Artwork

Vincent van Gogh, *The Starry Night*, 1889, oil on canvas. The Museum of Modern Art, New York.

- Museum source: https://www.moma.org/collection/works/79802
- Public-domain image: https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg
- The image is stored in `assets/starry-night.jpg` so the site does not depend on an external image host.
