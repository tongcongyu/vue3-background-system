// 将扁平结构处理成树形结构
const dealMenu = (menu: any) => {
  // menuObj是为了以id为key指建立对象，节省Array.find的时间
  const menuObj: any = {};
  menu.forEach((item) => {
    menuObj[item.id] = item;
  });
  // 菜单排序
  menu.sort((m, n) => {
    return m.sort - n.sort;
  });

  const menuArr: any = [];
  menu.forEach((item) => {
    // 获取当前菜单的父级菜单
    const parent = menuObj[item.parentId];
    if (parent) {
      // 判断当前菜单是否已经包含children字段，有的话直接赋值，没有的话先初始化为[]，然后再push赋值
      parent.children = parent.children || [];
      parent.children.push(item);
    } else {
      menuArr.push(item);
    }
  });
  return menuArr;
};
export { dealMenu };
