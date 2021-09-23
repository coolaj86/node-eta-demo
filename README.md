# node-eta-demo

A small, but non-trivial project for [ETA](https://eta.js.org/).

```txt
.
├── index.js
├── vars.json
├── welcome.eta.mjml.html
├── layouts/
│  └── transactional-email.eta.mjml.html
└── partials/
   └── footer.eta.mjml.html
```

This demonstrates the use of

- _custom file extensions_
- _layouts_
- _partials_
- _template vars_
- [MJML](https://mjml.io/), a _secondary template system_

# Demo

To render:

```js
node index.js
```
