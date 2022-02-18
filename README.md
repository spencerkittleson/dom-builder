<h1 align="center">@kanmf/dombuilder</h1>
<p>
  <a href="https://www.npmjs.com/package/@kanmf/dombuilder" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@kanmf/dombuilder.svg">
  </a>
  <a href="https://github.com/spencerkittleson/dom-builder#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/spencerkittleson/dom-builder/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/spencerkittleson/dom-builder/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/spencerkittleson/@kanmf/dombuilder" />
  </a>
</p>

> HTML Dom building library

### 🏠 [Homepage](https://github.com/spencerkittleson/dom-builder#readme)

## Run tests

```sh
npm run test
```

## Usage

Basic usage is `makeElement(type, textOrPropsOrChild, ...otherChildren)`

Add a div element to the body dom. Add an anchor element with a span containing text.

```javascript
import { div, span, makeElement } from "@kanmf/dombuilder";

document.body.appendChild(div());
document.body.appendChild(makeElement('a', {href: 'http://foo.bar', span('text')}));
```

Builtin exports: a, button, div, p, span, ul, li, input, label, style, slot, table, tr, td, th. For non explicit elements use `makeElement`.

```javascript
import { makeElement } from "@kanmf/dombuilder";

const br = makeElement("br");
const br = makeElement("hr");
```

Build a card with a link and [dataset property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).

```javascript
const card = div(
  { className: "card-container" },
  a(
    {
      id: "card-link-foo",
      href: `https://foo.bar`,
      dataset: {
        isValid: true,
      },
    },
    "link text"
  )
);
```

Resulting in:

```html
<div class="card-container">
  <a href="https://foo.bar" id="card-link-foo" data-is-valid="true">
    link text
  </a>
</div>
```

## Author

- Github: [@aaronmars](https://github.com/aaronmars)
- Github: [@apatten](https://github.com/apatten)
- Github: [@spencerkittleson](https://github.com/spencerkittleson)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/spencerkittleson/dom-builder/issues). You can also take a look at the [contributing guide](https://github.com/spencerkittleson/dom-builder/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

[Copyright © 2022](https://github.com/spencerkittleson).<br />
This project is [MIT](https://github.com/spencerkittleson/dom-builder/blob/master/LICENSE) licensed.
