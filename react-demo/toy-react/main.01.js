for (const i of [1, 2, 3]) {
  console.log(i)
}

function createElement(tagName, attributes, ...children) {
  let e = document.createElement(tagName);
  for (const p in attributes) {
    e.setAttribute(p, attributes[p])
  }

  for (const child of children) {
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }
    e.appendChild(child);
  }

  return e;
}

document.body.appendChild(<div id="a" class="b">
  <div>abc</div>
  <div></div>
  <div></div>
</div>)