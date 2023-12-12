function vdomToDom(vdom) {
  const node = document.createElement(vdom.tag.toLowerCase());
  if (vdom.attrs) {
    for (const [key, val] of Object.entries(vdom.attrs)) {
      node.setAttribute(key, val);
    }
  }
  for (const child of vdom.children) {
    node.appendChild(vdomToDom(child));
  }
  return node;
}

const vdom = {
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
};

console.log(vdomToDom(vdom));
