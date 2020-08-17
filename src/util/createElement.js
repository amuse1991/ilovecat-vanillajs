export default function createElement(tag, attributes, cb) {
  if (attributes.constructor !== Object) {
    throw new Error(
      `invalid argument types. attributes must be Object not ${attributes.constructor}`
    );
  }
  const $newElem = document.createElement(tag);
  for (const [attrName, attrVal] of Object.entries(attributes)) {
    $newElem.setAttribute(attrName, attrVal);
  }

  if (cb) cb($newElem);
  return $newElem;
}
