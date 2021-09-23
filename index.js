'use strict';

let Fs = require('fs').promises;
let Path = require('path');

let Eta = require('eta');
let mjml2html = require('mjml');

let tplDir = '.';

// 'layouts' can be read from `views` folders by default,
// but can only be `define()`d (as 'partials') when
// `includeFile` is unset.
// See https://github.com/eta-dev/eta/issues/141
Eta.configure({
  tags: ['{{', '}}'],
  views: [tplDir],
  includeFile: null,
});

['layouts/transactional-email', 'partials/footer'].forEach(function (name) {
  let Fs = require('fs');

  // ex: ./layouts/transactional-email.eta.mjml.html
  let tpl = Fs.readFileSync(
    Path.resolve(tplDir, name + '.eta.mjml.html'),
    'utf8'
  );
  Eta.templates.define(name, Eta.compile(tpl));
});

async function render(name, vars) {
  let path = Path.resolve(tplDir, name + '.eta.mjml.html');
  let tmplText = await Fs.readFile(path, 'utf8');

  let mjml = Eta.render(tmplText, vars);

  let html = mjml2html(mjml, {
    beautify: true,
    keepComments: true,
    validationLevel: 'strict',
  }).html;

  return { html };
}

module.exports.render = render;

if (require.main === module) {
  let name = 'welcome';
  let vars = require('./vars.json');

  render(name, vars)
    .then(function (data) {
      console.info(data.html);
    })
    .catch(function (err) {
      console.error(err);
      process.exit(1);
    });
}
