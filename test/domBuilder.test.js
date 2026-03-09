import { expect } from "chai";
import {
  makeElement,
  fragment,
  svg,
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
  th,
  td,
  text,
  template,
  style,
  slot,
} from "../index.mjs";
describe("DOM Builder", () => {
  describe("makeElement", () => {
    it("should create an element with one parameter", () => {
      expect(makeElement("div")).to.be.an.instanceof(Element);
    });
    it("should create nested div elements", () => {
      const divTree = makeElement("div", makeElement("div"));
      expect(divTree.childElementCount).to.equal(1);
    });
    it("should create nested elements from multiple nodes", () => {
      const multiTree = makeElement(
        "div",
        makeElement("div"),
        makeElement("div"),
      );
      expect(multiTree.childElementCount).to.equal(2);
    });
    it("should create text nodes", () => {
      const spanEl = makeElement("span", "foo");
      expect(spanEl.firstChild.nodeType).to.equal(Node.TEXT_NODE);
    });
    it("should create an element with properties", () => {
      const divEl = makeElement("div", {
        className: "foo",
        style: { width: "100px" },
      });
      expect(divEl.style.width).to.equal("100px");
    });
    it("should create an element ignoring invalid properties", () => {
      const divEl = makeElement("div", { notavalidproperty: "foo" });
      expect(divEl.nodeType).to.equal(Node.ELEMENT_NODE);
      expect(divEl.notavalidproperty).to.be.undefined;
      expect(divEl.getAttribute("notavalidproperty")).to.be.null;
    });
    it("should create nested elements", () => {
      const divTree = makeElement("div", makeElement("div"));
      const arrayTree = makeElement("div", [makeElement("div")]);
      const multiTree = makeElement(
        "div",
        makeElement("div"),
        makeElement("div"),
      );
      expect(divTree.childElementCount).to.equal(1);
      expect(arrayTree.childElementCount).to.equal(1);
      expect(multiTree.childElementCount).to.equal(2);
    });
    it("should create an element with the property role from the attribute exceptions list", () => {
      const divEl = makeElement("div", {
        role: "admin",
      });
      expect(divEl.outerHTML).to.include('role="admin"');
    });
    it("should create an element with the property aria-label from the attribute exceptions list", () => {
      const buttonElm = makeElement("button", { "aria-label": "aria label" });
      expect(buttonElm.outerHTML).to.include('aria-label="aria label"');
    });
    it("should create an element with a string data attribute", () => {
      const stringDataEl = makeElement("div", {
        dataset: {
          foo: "bar",
        },
      });
      expect(stringDataEl.dataset.foo).to.equal("bar");
    });
    it("should create an element with number data attribute", () => {
      const numberDataEl = makeElement("div", {
        dataset: {
          foo: 42,
        },
      });
      expect(numberDataEl.dataset.foo).to.equal("42");
    });
    it("should create an element with boolean data attribute", () => {
      const boolDataEl = makeElement("div", {
        dataset: {
          foo: false,
        },
      });
      expect(boolDataEl.dataset.foo).to.equal("false");
    });
    it("should create an element with function data attribute", () => {
      const fun = () => "bar";
      const funcDataEl = makeElement("div", {
        dataset: {
          foo: fun,
        },
      });
      expect(funcDataEl.dataset.foo).to.equal(`() => "bar"`);
    });
    it("should create double nested elements", () => {
      const multiTree = makeElement("div", [[makeElement("div", ["foo"])]]);
      const childEl = multiTree.querySelector("div");
      expect(childEl).to.be.an.instanceof(Element);
      expect(childEl.textContent).to.equal("foo");
    });
  });

  describe("shorthand tags", () => {
    it("should create a document fragment", () => {
      const fragEl = fragment(makeElement("div"), makeElement("div"));
      expect(fragEl.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE);
    });
    it("should create svg from string", () => {
      const svgEl = svg(
        '<svg xmlns="http://www.w3.org/2000/svg"><title>FOO</title></svg>',
      );
      expect(svgEl.nodeName).to.equal("svg");
      expect(svgEl.querySelector("title")).to.not.be.null;
    });
    it("should create svg from string with title removed", () => {
      const svgEl = svg(
        '<svg xmlns="http://www.w3.org/2000/svg"><title>FOO</title></svg>',
        true,
      );
      expect(svgEl.nodeName).to.equal("svg");
      expect(svgEl.querySelector("title")).to.be.null;
    });
    it("construct an A element", () => {
      expect(a().nodeName).to.equal("A");
    });
    it("should construct a BUTTON element", () => {
      expect(button().nodeName).to.equal("BUTTON");
    });
    it("should construct a DIV element", () => {
      expect(div().nodeName).to.equal("DIV");
    });
    it("should construct a P element", () => {
      expect(p().nodeName).to.equal("P");
    });
    it("should construct a SPAN element", () => {
      expect(span().nodeName).to.equal("SPAN");
    });
    it("should construct a UL element", () => {
      expect(ul().nodeName).to.equal("UL");
    });
    it("should construct a LI element", () => {
      expect(li().nodeName).to.equal("LI");
    });
    it("should construct an INPUT element", () => {
      expect(input().nodeName).to.equal("INPUT");
    });
    it("should construct a LABEL element", () => {
      expect(label().nodeName).to.equal("LABEL");
    });
    it("should construct a TABLE element", () => {
      expect(table().nodeName).to.equal("TABLE");
    });
    it("should construct a TR element", () => {
      expect(tr().nodeName).to.equal("TR");
    });
    it("should construct a TH element", () => {
      expect(th().nodeName).to.equal("TH");
    });
    it("should construct a TD element", () => {
      expect(td().nodeName).to.equal("TD");
    });
  });
  describe("Promise support", () => {
    it("should add an element from a promise (first arg)", async () => {
      const divPromise = Promise.resolve(div({ id: "the-promised-div" }));
      const wrapper = div(divPromise);
      await divPromise;
      expect(wrapper.querySelector("#the-promised-div")).to.not.be.null;
    });
    it("should add an element from a promise (other arg)", async () => {
      const divPromise = Promise.resolve(div({ id: "the-promised-div" }));
      const wrapper = div({ id: "the-wrapper-div" }, span("hello"), divPromise);
      await divPromise;
      expect(wrapper.querySelector("#the-promised-div")).to.not.be.null;
    });
    it("should add text content from a promise", async () => {
      const textContent = "This is the promised text content";
      const divPromise = Promise.resolve(textContent);
      const wrapper = div({ id: "the-wrapper-div" }, divPromise);
      await divPromise;
      expect(wrapper.textContent).to.equal(textContent);
    });
    it("will not add from a promise that does not resolve text or DOM", async () => {
      const divPromise = Promise.resolve({ foo: "bar" });
      const wrapper = div({ id: "the-wrapper-div" }, divPromise);
      await divPromise;
      expect(wrapper.childElementCount).to.equal(0);
    });
    it("handles correct ordering when promises resolve out of order", async () => {
      const standardDiv = div({ id: "the-standard-div-one" });
      const promiseTwo = new Promise((resolve) => {
        setTimeout(resolve, 100, div({ id: "the-promised-div-two" }));
      });
      const promiseThree = new Promise((resolve) => {
        setTimeout(resolve, 1, div({ id: "the-promised-div-three" }));
      });
      const wrapper = div(standardDiv, promiseTwo, promiseThree);
      await Promise.all([promiseTwo, promiseThree]);
      expect(wrapper.children[0].id).to.equal("the-standard-div-one");
      expect(wrapper.children[1].id).to.equal("the-promised-div-two");
      expect(wrapper.children[2].id).to.equal("the-promised-div-three");
    });
    it("should add an element from a promise resolving to object with .element property", async () => {
      const objWithElement = { element: div({ id: "element-from-object" }) };
      const divPromise = Promise.resolve(objWithElement);
      const wrapper = div(divPromise);
      await divPromise;
      expect(wrapper.querySelector("#element-from-object")).to.not.be.null;
    });
  });

  describe("text function", () => {
    it("should create a text node", () => {
      const textNode = text("Hello World");
      expect(textNode.nodeType).to.equal(Node.TEXT_NODE);
      expect(textNode.textContent).to.equal("Hello World");
    });
  });

  describe("template function", () => {
    it("should create a template element", () => {
      const tmpl = template();
      expect(tmpl.nodeName).to.equal("TEMPLATE");
      expect(tmpl.content).to.be.an.instanceof(DocumentFragment);
    });
    it("should create a template with children", () => {
      const tmpl = template(div({ id: "child-div" }), span("text"));
      expect(tmpl.content.childElementCount).to.equal(2);
      expect(tmpl.content.querySelector("#child-div")).to.not.be.null;
    });
  });

  describe("@ prefix custom attributes", () => {
    it("should set custom attributes using @ prefix", () => {
      const divEl = div({ "@data-custom": "custom-value" });
      expect(divEl.getAttribute("data-custom")).to.equal("custom-value");
    });
    it("should set multiple @ prefixed attributes", () => {
      const divEl = div({
        "@data-first": "first-value",
        "@data-second": "second-value",
      });
      expect(divEl.getAttribute("data-first")).to.equal("first-value");
      expect(divEl.getAttribute("data-second")).to.equal("second-value");
    });
  });

  describe("style and slot shorthand", () => {
    it("should construct a STYLE element", () => {
      const styleEl = style();
      expect(styleEl.nodeName).to.equal("STYLE");
    });
    it("should construct a SLOT element", () => {
      const slotEl = slot();
      expect(slotEl.nodeName).to.equal("SLOT");
    });
    it("should construct a style element with content", () => {
      const styleEl = style(".foo { color: red; }");
      expect(styleEl.textContent).to.equal(".foo { color: red; }");
    });
    it("should construct a slot element with name", () => {
      const slotEl = slot({ name: "my-slot" });
      expect(slotEl.getAttribute("name")).to.equal("my-slot");
    });
  });

  describe("edge cases", () => {
    it("should handle null first argument", () => {
      const divEl = div(null);
      expect(divEl.childElementCount).to.equal(0);
    });
    it("should handle mixed children types", () => {
      const mixedEl = div(
        "text",
        span("span-text"),
        [div("array-item"), span("another")],
        null,
      );
      expect(mixedEl.textContent).to.equal("textspan-textarray-itemanother");
    });
    it("should handle input with various properties", () => {
      const inputEl = input({
        type: "text",
        placeholder: "Enter text",
        value: "test",
        disabled: true,
      });
      expect(inputEl.type).to.equal("text");
      expect(inputEl.placeholder).to.equal("Enter text");
      expect(inputEl.value).to.equal("test");
      expect(inputEl.disabled).to.be.true;
    });
  });
});
