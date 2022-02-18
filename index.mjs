const showWarnings = false;
const attributeExceptions = ["aria-label", "role"];

function isAttributeException(attribute) {
  return attributeExceptions.includes(attribute) || attribute.startsWith("@");
}

function isValidElement(element) {
  return (
    element &&
    (element.nodeType === Node.ELEMENT_NODE ||
      element.nodeType === Node.TEXT_NODE ||
      element.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
  );
}
function isValidPropertyValue(value) {
  const valueType = typeof value;

  // Make sure value is not null or undefined, and it's one of the "approved" types
  return (
    valueType === "string" ||
    valueType === "number" ||
    valueType === "boolean" ||
    valueType === "function"
  );
}
function appendArray(el, children) {
  children.forEach((child) => {
    append(el, child);
  });
}
function appendText(el, textContent) {
  const textNode = document.createTextNode(textContent);
  el.appendChild(textNode);
}
function appendPromisedElement(parent, promise) {
  const placeholder = _makeElement("div");
  parent.appendChild(placeholder);
  promise.then((child) => {
    // Promises in DOM Builder can only resolve to DOM nodes or strings. Otherwise, they're ignored,
    if (isValidElement(child)) {
      parent.replaceChild(child, placeholder);
    } else if (isValidElement(child.element)) {
      parent.replaceChild(child.element, placeholder);
    } else if (typeof child === "string") {
      const textNode = document.createTextNode(child);
      parent.replaceChild(textNode, placeholder);
    } else {
      parent.removeChild(placeholder);
    }
  });
}
function append(parent, child) {
  let appended = true;
  if (Array.isArray(child)) {
    appendArray(parent, child);
  } else if (isValidElement(child)) {
    parent.appendChild(child);
  } else if (typeof child === "string") {
    appendText(parent, child);
  } else if (child instanceof Promise) {
    appendPromisedElement(parent, child);
  } else {
    appended = false;
  }
  return appended;
}
function setStyles(el, styles) {
  Object.keys(styles).forEach((styleName) => {
    if (styleName in el.style) {
      el.style[styleName] = styles[styleName];
    } else if (showWarnings) {
      console.warn(
        `${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`
      ); // eslint-disable-line no-console
    }
  });
}
function setData(el, data) {
  Object.keys(data).forEach((dataKey) => {
    const value = data[dataKey];
    if (isValidPropertyValue(value)) {
      el.dataset[dataKey] = value;
    } else if (showWarnings) {
      console.warn(
        `Unable to set data property ${value} on <${el.tagName.toLowerCase()}>`
      ); // eslint-disable-line no-console
    }
  });
}
function _makeElement(type, textOrPropsOrChild, ...otherChildren) {
  const el = document.createElement(type);
  if (textOrPropsOrChild) {
    const appended = append(el, textOrPropsOrChild);

    // We tried to append the parameter as one of the child types, but it wasn't one of them.
    // Check to see if it's an Object with properties for the created element
    if (
      !appended &&
      textOrPropsOrChild !== null &&
      typeof textOrPropsOrChild === "object"
    ) {
      Object.keys(textOrPropsOrChild).forEach((propName) => {
        if (propName in el || isAttributeException(propName)) {
          const value = textOrPropsOrChild[propName];
          if (propName === "style") {
            setStyles(el, value);
          } else if (propName === "dataset") {
            setData(el, value);
          } else if (attributeExceptions.includes(propName)) {
            // Use setAttribute for attributes like 'role' that do not map to a property
            el.setAttribute(propName, value);
          } else if (propName.startsWith("@")) {
            el.setAttribute(propName.substring(1), value);
          } else if (isValidPropertyValue(value)) {
            el[propName] = value;
          } else if (showWarnings) {
            console.warn(
              `Unable to set value ${value} for property ${propName} of a <${type}>`
            ); // eslint-disable-line no-console
          }
        } else if (showWarnings) {
          console.warn(`${propName} is not a valid property of a <${type}>`); // eslint-disable-line no-console
        }
      });
    }

    // If there are more parameters beyond the type and the overloaded first parameter, add those now
    if (otherChildren && otherChildren.length > 0) {
      appendArray(el, otherChildren);
    }
  }
  return el;
}
export function fragment(...children) {
  const _fragment = document.createDocumentFragment();
  appendArray(_fragment, children);
  return _fragment;
}

const svgParser = new DOMParser();
export function svg(svgString, stripTitle = false) {
  const element = svgParser.parseFromString(
    svgString,
    "image/svg+xml"
  ).documentElement;
  if (stripTitle) {
    const title = element.querySelector("title");
    title.parentNode.removeChild(title);
  }
  return element;
}

export function template(...children) {
  const _template = _makeElement("template");
  children.forEach((child) => {
    _template.content.appendChild(child);
  });
  return _template;
}

export function text(string) {
  return document.createTextNode(string);
}

export { _makeElement as makeElement };
export const a = (...args) => _makeElement("a", ...args);
export const button = (...args) => _makeElement("button", ...args);
export const div = (...args) => _makeElement("div", ...args);
export const p = (...args) => _makeElement("p", ...args);
export const span = (...args) => _makeElement("span", ...args);
export const ul = (...args) => _makeElement("ul", ...args);
export const li = (...args) => _makeElement("li", ...args);
export const input = (...args) => _makeElement("input", ...args);
export const label = (...args) => _makeElement("label", ...args);
export const style = (...args) => _makeElement("style", ...args);
export const slot = (...args) => _makeElement("slot", ...args);
export const table = (...args) => _makeElement("table", ...args);
export const tr = (...args) => _makeElement("tr", ...args);
export const td = (...args) => _makeElement("td", ...args);
export const th = (...args) => _makeElement("th", ...args);
