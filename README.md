# PostCSS Update Media Queries [![Build Status][ci-img]][ci]

[PostCSS] plugin to generate and update media queries for functional CSS ([Tachyons] FTW).

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/zehfernandes/postcss-update-media-queries.svg
[ci]:      https://travis-ci.org/zehfernandes/postcss-update-media-queries

## Input
```css
@custom-media --breakpoint-not-small screen and (min-width: 30em);
@custom-media --breakpoint-medium screen and (min-width: 30em) and (max-width: 60em);

.underline    { text-decoration: underline; }
```

## Output
```css
@custom-media --breakpoint-not-small screen and (min-width: 30em);
@custom-media --breakpoint-medium screen and (min-width: 30em) and (max-width: 60em);

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
    {name: '(--breakpoint-medium)', alias: '-m' },
    {name: '(--breakpoint-large)', alias: '-l' }
]

postcss([ updateMediaQuerie({
    medias: medias,
    overwrite: false // Per default, the script don't overwrite the existed media queries in the file
    }) ]).process(input.css)
```

Look at [tachyons-bulild-queries]  to learn more
