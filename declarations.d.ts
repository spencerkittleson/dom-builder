declare module "@kanmf/dombuilder" {
  export type Child =
    | string
    | number
    | Element
    | Text
    | DocumentFragment
    | Promise<any>
    | Child[];

  export interface Props {
    style?: Record<string, string>;
    dataset?: Record<string, string | number | boolean | Function>;
    role?: string;
    "aria-label"?: string;
    [key: string]: any;
  }

  export function makeElement(
    type: string,
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLElement;

  export function fragment(...children: Child[]): DocumentFragment;

  export function svg(svgString: string, stripTitle?: boolean): SVGElement;

  export function template(...children: Child[]): HTMLTemplateElement;

  export function text(string: string): Text;

  export function a(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLAnchorElement;
  export function button(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLButtonElement;
  export function div(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLDivElement;
  export function p(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLParagraphElement;
  export function span(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLSpanElement;
  export function ul(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLUListElement;
  export function li(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLLIElement;
  export function input(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLInputElement;
  export function label(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLLabelElement;
  export function style(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLStyleElement;
  export function slot(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLSlotElement;
  export function table(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLTableElement;
  export function tr(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLTableRowElement;
  export function td(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLTableCellElement;
  export function th(
    propsOrChild?: Props | Child,
    ...children: Child[]
  ): HTMLTableCellElement;
}
