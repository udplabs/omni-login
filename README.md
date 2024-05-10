To use this repo, build out the individual files via watch:

`npm run build -- --watch`

This will create three files in the dist folder:

dist/index.html
dist/bundle.css
dist/bundle.js

Use your favourite server to expose these files. A lightweight (no https) example.

1. Navigate to ./dist
2. Run `npx serve`
3. This should serve up on http://localhost:3000

In the meta data for the application add the urls/screens as needed

- `_uf_screens`: `login-id,login-password,signup-id,signup-password`
- `_uf_bundle_urls`: http://localhost:3000/bundle.js
- `_uf_style_urls`: http://localhost:3000/index.css
