const data = [
  {
    id: 1,
    text: '节点1',
    children: [
      {
        id: 2,
        text: '节点1_1',
      },
      {
        id: 3,
        text: '节点1_2',
        children: [
          {
            id: 4,
            text: '节点1_2_1'
          }
        ]
      }
    ],
  },
  {
    id: 5,
    text: '节点2',
    children: [
      {
        id: 6,
        text: '节点2_1'
      }
    ]
  }
];

/**
 * 把一个树形结构的数据转成 list，并用 parentId 代表原来的父子关系
 * @param {*} treeData 
 */
function treeDataToList(treeData) {
  const res = [];
  function recursion(target, parent) {
    for (const val of target) {
      let parentId = parent ? parent.id : 0;
      res.push({
        id: val.id,
        text: val.text,
        parentId,
      });
      if (Array.isArray(val.children) && val.children) {
        recursion(val.children, val);
      }
    }
  }
  recursion(treeData);
  return res;
}

/**
 * 把一个 list 按 parentId 的关系转成一个树结构
 * @param {any[]} list 
 */
function listToTreeData(list) {
  const res = [];
  const map = {};
  list.forEach(item => {
    map[item.id] = {
      ...item,
      children: [],
    };
  });
  list.forEach(item => {
    if (item.parentId !== 0) {
      const parent = map[item.parentId];
      parent.children.push(map[item.id]);
    }
  });
  for (const val of Object.values(map)) {
    if (val.parentId === 0) {
      res.push(val);
    }
  }
  return res;
}

console.log(listToTreeData(treeDataToList(data)));
