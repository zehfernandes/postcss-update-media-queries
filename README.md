# PostCSS Update Media Queries [![Build Status][ci-img]][ci]

[PostCSS] plugin Generate and update media queries for functional css (taychons FTW).

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/zehfernandes/postcss-update-media-queries.svg
[ci]:      https://travis-ci.org/zehfernandes/postcss-update-media-queries

```css
@custom-media --breakpoint-not-small screen and (min-width: 30em);
@custom-media --breakpoint-medium screen and (min-width: 30em) and (max-width: 60em);

.strike       { text-decoration: line-through; }
.underline    { text-decoration: underline; }
.no-underline { text-decoration: none; }
```

```css
@custom-media --breakpoint-not-small screen and (min-width: 30em);
@custom-media --breakpoint-medium screen and (min-width: 30em) and (max-width: 60em);
.strike { text-decoration: line-through; }
.underline { text-decoration: underline; }
.no-underline { text-decoration: none; }
@media (--breakpoint-not-small) {
 .strike-ns { text-decoration: line-through; }
 .underline-ns { text-decoration: underline; }
 .no-underline-ns { text-decoration: none; }
}
@media (--breakpoint-medium) {
 .strike-m { text-decoration: line-through; }
 .underline-m { text-decoration: underline; }
 .no-underline-m { text-decoration: none; }
}
```

## Usage

```js
const updateMediaQuerie = require('postcss-update-media-queries')

postcss([ updateMediaQuerie({ medias: medias }) ]).process(input.css)
```

See [PostCSS] docs for examples for your environment.
