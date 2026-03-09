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
  <a href="https://github.com/spencerkittleson/dom-builder/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/spencerkittleson/@kanmf/dombuilder" />
  </a>
</p>

> Lightweight HTML DOM building library with shorthand tags and TypeScript support

### 🏠 [Homepage](https://github.com/spencerkittleson/dom-builder#readme)

## Install

```sh
npm install @kanmf/dombuilder
```

## Run tests

```sh
npm run test
```

## Usage

Basic usage is `makeElement(type, textOrPropsOrChild, ...otherChildren)` or use shorthand functions.

```javascript
import { div, span, a, makeElement } from "@kanmf/dombuilder";

document.body.appendChild(div());
document.body.appendChild(
  makeElement("a", { href: "http://foo.bar" }, span("text")),
);
```

## Shorthand Tags

All standard HTML elements have shorthand functions:

```javascript
import {
  a,
  button,
  div,
  p,
  span,
  ul,
  li,
  input,
  label,
  table,
  tr,
  td,
  th,
  style,
  slot,
} from "@kanmf/dombuilder";

div(); // <div></div>
span("hello"); // <span>hello</span>
button({ disabled: true }, "Click"); // <button disabled>Click</button>
input({ type: "text", placeholder: "Enter text" }); // <input type="text" placeholder="Enter text">
```

## Properties

Pass an object as the second argument to set properties, attributes, styles, and dataset.

```javascript
const card = div(
  { className: "card-container" },
  a(
    {
      id: "card-link-foo",
      href: "https://foo.bar",
      dataset: {
        isValid: true,
      },
    },
    "link text",
  ),
);
```

Result:

```html
<div class="card-container">
  <a href="https://foo.bar" id="card-link-foo" data-is-valid="true">
    link text
  </a>
</div>
```

### Style

```javascript
div({ style: { display: "flex", color: "red" } }, "Content");
```

### Dataset

```javascript
div({ dataset: { userId: 123, isActive: true } });
```

### ARIA Attributes

```javascript
button({ "aria-label": "Close dialog", role: "button" }, "X");
```

### Custom Attributes

Use the `@` prefix for custom attributes:

```javascript
div({ "@data-custom": "value", "@aria-hidden": "true" });
// <div data-custom="value" aria-hidden="true"></div>
```

## Fragments

```javascript
import { fragment, div, span } from "@kanmf/dombuilder";

const frag = fragment(div("First"), span("Second"));
// DocumentFragment with two children
```

## SVG

```javascript
import { svg } from "@kanmf/dombuilder";

const icon = svg(
  '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z"/></svg>',
);
```

Strip `<title>` element:

```javascript
const icon = svg(svgString, true);
```

## Template Elements

```javascript
import { template, div, span } from "@kanmf/dombuilder";

const tmpl = template(div({ className: "item" }), span("Text content"));
// <template><div class="item"></div><span>Text content</span></template>
```

## Text Nodes

```javascript
import { text } from "@kanmf/dombuilder";

const textNode = text("Hello World");
// Text node, not an Element
```

## Style & Slot Elements

For Shadow DOM:

```javascript
import { style, slot, div } from "@kanmf/dombuilder";

const shadowRoot = div().attachShadow({ mode: "open" });
shadowRoot.appendChild(style(".foo { color: red; }"));
shadowRoot.appendChild(slot({ name: "header" }));
```

## Promises

Pass promises as children - they're resolved and replaced:

```javascript
const content = div(fetch("/api/data").then((r) => r.text()));
// Text from promise replaces placeholder
```

Promise resolving to element:

```javascript
const content = div(Promise.resolve(span("Loaded")));
```

Promise resolving to object with `.element`:

```javascript
const content = div(Promise.resolve({ element: div("From object") }));
```

## TypeScript

This library includes TypeScript declarations. Use the `Props` interface for type safety:

```typescript
import { div, span, button, Props } from "@kanmf/dombuilder";

const props: Props = {
  className: "container",
  style: { display: "flex", gap: "10px" },
  dataset: { userId: 123 },
  "@data-custom": "value",
};

const el = div(props, span("Hello"), button({ disabled: false }, "Click"));
```

### Type Declarations

If TypeScript shows `TS7016: Could not find declaration file`, add a reference:

```typescript
/// <reference path="path/to/declarations.d.ts" />
import { div } from "@kanmf/dombuilder";
```

Or configure `tsconfig.json`:

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./"]
  }
}
```

## API Reference

| Function                                 | Returns                | Description                  |
| ---------------------------------------- | ---------------------- | ---------------------------- |
| `makeElement(type, props?, ...children)` | `HTMLElement`          | Create any element type      |
| `div(props?, ...children)`               | `HTMLDivElement`       | Shorthand for div            |
| `span(props?, ...children)`              | `HTMLSpanElement`      | Shorthand for span           |
| `a(props?, ...children)`                 | `HTMLAnchorElement`    | Shorthand for anchor         |
| `button(props?, ...children)`            | `HTMLButtonElement`    | Shorthand for button         |
| `p(props?, ...children)`                 | `HTMLParagraphElement` | Shorthand for paragraph      |
| `ul(props?, ...children)`                | `HTMLUListElement`     | Shorthand for unordered list |
| `li(props?, ...children)`                | `HTMLLIElement`        | Shorthand for list item      |
| `input(props?, ...children)`             | `HTMLInputElement`     | Shorthand for input          |
| `label(props?, ...children)`             | `HTMLLabelElement`     | Shorthand for label          |
| `table(props?, ...children)`             | `HTMLTableElement`     | Shorthand for table          |
| `tr(props?, ...children)`                | `HTMLTableRowElement`  | Shorthand for table row      |
| `td(props?, ...children)`                | `HTMLTableCellElement` | Shorthand for table cell     |
| `th(props?, ...children)`                | `HTMLTableCellElement` | Shorthand for table header   |
| `style(props?, ...children)`             | `HTMLStyleElement`     | Shorthand for style          |
| `slot(props?, ...children)`              | `HTMLSlotElement`      | Shorthand for slot           |
| `fragment(...children)`                  | `DocumentFragment`     | Create document fragment     |
| `svg(svgString, stripTitle?)`            | `SVGElement`           | Parse SVG string             |
| `template(...children)`                  | `HTMLTemplateElement`  | Create template element      |
| `text(string)`                           | `Text`                 | Create text node             |

## Author

- Github: [@aaronmars](https://github.com/aaronmars)
- Github: [@apatten](https://github.com/apatten)
- Github: [@spencerkittleson](https://github.com/spencerkittleson)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/spencerkittleson/dom-builder/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

[Copyright © 2026 Spencer Kittleson](https://github.com/spencerkittleson).<br />
This project is [MIT](https://github.com/spencerkittleson/dom-builder/blob/main/LICENSE) licensed.
