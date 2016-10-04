# PostCSS Update Media Queries [![Build Status][ci-img]][ci]

[PostCSS] plugin to generate and update media queries for functional CSS ([Tachyons](https://github.com/tachyons-css/tachyons) FTW).

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/zehfernandes/postcss-update-media-queries.svg
[ci]:      https://travis-ci.org/zehfernandes/postcss-update-media-queries

### Input
```css
.underline    { text-decoration: underline; }
```

### Output
```css
.underline { text-decoration: underline; }

@media (--breakpoint-not-small) {
 .underline-ns { text-decoration: underline; }
}

@media (--breakpoint-medium) {
 .underline-m { text-decoration: underline; }
}
```

## Usage

```js
const updateMediaQuerie = require('postcss-update-media-queries')

// Array structure for media queries
let medias = [
    {name: '(--breakpoint-not-small)', alias: '-ns' },
    {name: '(--breakpoint-medium)', alias: '-m' }
]

postcss([ updateMediaQuerie({
    medias: medias,
    overwrite: false // Per default, the script don't overwrite the existed media queries in the file
    }) ]).process(input.css)
```

Look at [tachyons-bulild-mediaqueries](https://github.com/zehfernandes/tachyons-build-mediaquerie) to learn more
