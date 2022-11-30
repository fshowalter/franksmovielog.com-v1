import { Element } from "hast";
import { Parent } from "unist";
import visit from "unist-util-visit";

export default function removeFootnotes(element: Element) {
  visit(
    element,
    "element",
    function (
      element: Element,
      index: number | null,
      parent: Parent | undefined
    ) {
      if (
        parent &&
        index &&
        element.tagName === "div" &&
        element.properties &&
        element.properties.className &&
        typeof element.properties.className === "string" &&
        element.properties.className.includes("footnotes")
      ) {
        parent.children.splice(index, 1);
        return [visit.SKIP, index];
      }

      if (
        parent &&
        index &&
        element.tagName === "sup" &&
        element.properties &&
        element.properties.id &&
        typeof element.properties.id === "string" &&
        element.properties.id.startsWith("fnref-")
      ) {
        parent.children.splice(index, 1);
        return [visit.SKIP, index];
      }
    }
  );

  return element;
}
