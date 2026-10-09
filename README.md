# Vicky Solanki: IT Support Notes

## Publish (about 5 minutes)
1. On GitHub create a **public** repo named exactly `YOUR-USERNAME.github.io`.
2. Open `_config.yml` and replace `YOUR-GITHUB-USERNAME`, the LinkedIn id and the email.
3. Upload every file and folder of this project to the repo (Add file > Upload files, main branch). Include folders that start with `_`, like `_posts`.
4. Settings > Pages > Build and deployment: Source = Deploy from a branch, Branch = `main`, folder = `/ (root)`.
5. Wait 1-2 minutes: https://YOUR-USERNAME.github.io

## Add a post
Create `_posts/YYYY-MM-DD-title.md`:

    ---
    layout: post
    title: "Your title"
    category: troubleshooting   # troubleshooting | configuration | setup | projects
    tags: [windows, outlook]
    description: "One line summary for the card"
    ---
    ## Problem / ## Cause / ## Solution / ## Verify

Screenshots: put images in `assets/img/` and use `![alt](/assets/img/name.png)`.
Add your resume as `assets/Vicky-Solanki-Resume.pdf`.
