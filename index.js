'use strict';

let Fs = require('fs').promises;
let Path = require('path');

let Eta = require('eta');
let mjml2html = require('mjml');

let tplDir = '.';

// 'layouts' can only be read from `views` folders,
// not `define()`d as 'partials' are.
// See https://github.com/eta-dev/eta/issues/141
Eta.configure({ tags: ['{{', '}}'], views: ['.'] });

async function render(name, vars) {
  let path = Path.resolve(tplDir, name + '.eta.mjml.html');
  let tmplText = await Fs.readFile(path, 'utf8');

  let mjml = Eta.render(tmplText, vars);
  //console.log(`Eta render:`, mjml);

  let html = mjml2html(mjml, {
    beautify: true,
    keepComments: true,
    validationLevel: 'strict',
  }).html;

  //console.log('MJML render:', html.html);
  return { html };
}

module.exports.render = render;

if (require.main === module) {
  let name = 'welcome';
  let vars = require('./vars.json');

  console.log(vars.title);
  console.log(vars.preview);

  render(name, vars)
    .then(function (data) {
      console.info(data.html);
    })
    .catch(function (err) {
      console.error(err);
      process.exit(1);
    });
}
