# sample-video-call-app

Ini adalah contoh video call app yang menggunakan ofon CloudPBX.

Library js yang digunakan adalah:

- [sip.js](https://sipjs.com)

## Install Dependencies

```
npm install
```

## Run sample app

```
node app.js
```

Buka aplikasi di browser dengan URL: `http://localhost:3000`

## Generate CSS

```
npx tailwind build styles.css -o public/css/tailwind.css
```

or

```
NODE_ENV=production npx tailwindcss build styles.css -o public/css/tailwind.min.css
```
