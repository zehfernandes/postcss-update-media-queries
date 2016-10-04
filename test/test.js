'use strict'

const fs = require('fs')
const assert = require('assert')
const postcss = require('postcss')
const updateMediaQuerie = require('..')
const perfectionist = require('perfectionist')

let medias = [
	{name: '(--breakpoint-not-small)', alias: '-ns' },
	{name: '(--breakpoint-medium)', alias: '-m' },
	{name: '(--breakpoint-large)', alias: '-l' }
]

describe('postcss-update-media-queries', function () {

  it('create medium breakpoint', function () {
    test('input.css', 'output.css')
  })
})

function fixture (name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8')
}

function test (input, output) {
  assert.deepEqual(
    postcss([ updateMediaQuerie({ medias: medias }), perfectionist({format:'compact'}) ])
      .process(fixture(input)).css,
    fixture(output)
  )
}
