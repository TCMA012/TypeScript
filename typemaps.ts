//https://fettblog.eu/typescript-type-maps/
type AllElements =  {
  'a': HTMLAnchorElement;
  'div': HTMLDivElement;
  'span': HTMLSpanElement;
  'ul': HTMLUListElement; 
  'title': HTMLTitleElement;
  'textarea': HTMLTextAreaElement;
  'template': HTMLTemplateElement;
  'tfoot': HTMLTableSectionElement;
  'thead': HTMLTableSectionElement;
  'tbody': HTMLTableSectionElement;
  'tr': HTMLTableRowElement;
  'table': HTMLTableElement;
  'col': HTMLTableColElement;
  'colgroup': HTMLTableColElement;
  'th': HTMLTableHeaderCellElement;
  'td': HTMLTableDataCellElement;
  'caption': HTMLTableCaptionElement;
  'style': HTMLStyleElement;
  'select': HTMLSelectElement;
  'script': HTMLScriptElement;
  'blockquote': HTMLQuoteElement;
  'q': HTMLQuoteElement;
  'progress': HTMLProgressElement;
  'pre': HTMLPreElement;
  'param': HTMLParamElement;
  'p': HTMLParagraphElement;
  'output': HTMLOutputElement;
  'option': HTMLOptionElement;
  'optgroup': HTMLOptGroupElement;
  'object': HTMLObjectElement;
  'ol': HTMLOListElement;
  'ins': HTMLModElement;
  'del': HTMLModElement;
  'meter': HTMLMeterElement;
  'meta': HTMLMetaElement;
  'marquee': HTMLMarqueeElement;
  'map': HTMLMapElement;
  'video': HTMLVideoElement;
  'audio': HTMLAudioElement;
  'link': HTMLLinkElement;
  'legend': HTMLLegendElement;
  'label': HTMLLabelElement;
  'li': HTMLLIElement;
  'input': HTMLInputElement;
  'img': HTMLImageElement;
  'iframe': HTMLIFrameElement;
  'html': HTMLHtmlElement;
  'h1': HTMLHeadingElement;
  'h2': HTMLHeadingElement;
  'h3': HTMLHeadingElement;
  'h4': HTMLHeadingElement;
  'h5': HTMLHeadingElement;
  'h6': HTMLHeadingElement;
  'head': HTMLHeadElement;
  'hr': HTMLHRElement;
  'frameset': HTMLFrameSetElement;
  'frame': HTMLFrameElement;
  'form': HTMLFormElement;
  'font': HTMLFontElement;
  'fieldset': HTMLFieldSetElement;
  'embed': HTMLEmbedElement;
  'datalist': HTMLDataListElement;
  'dl': HTMLDListElement;
  'canvas': HTMLCanvasElement;
  'button': HTMLButtonElement;
  'body': HTMLBodyElement;
  'base': HTMLBaseElement;
  'br': HTMLBRElement;
  'area': HTMLAreaElement
}

type CreatedHTMLElement<T extends keyof AllElements> = AllElements[T];

type CreatedElement<T extends string> =
  T extends keyof AllElements ? CreatedHTMLElement<T> : HTMLElement;

declare function createElement<T extends string>(tag: T, options?: any): CreatedElement<T>

function elementFactory<T extends string>(tag: T, 
  defaultProps: Partial<CreatedElement<T>>) : CreatedElement<T> {

  const element = createElement(tag);
  return Object.assign(element, defaultProps)
}

elementFactory('video', { src: '' });
elementFactory('video', { source: '' }) // 💥 Error: this property does not exist
