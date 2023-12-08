/**
 * 遇到一道二叉树的题目时的通用思考过程：
 * 1. 是否可以通过遍历一遍二叉树得到答案？如果可以，用 traverse 函数配合外部变量来实现
 * 2. 是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？如果可以，写出这个递归函数的定义，并
 * 充分利用这个函数的返回值
 * 3. 无论使用哪一种思维模式，你都要明白二叉树的每一个节点需要做什么，需要在什么时候（前、中、后序）做
 */

/**
 * 总结一：
 * 前序位置的代码只能从函数的参数中获取父节点传递过来的数据，而后序的位置代码不仅可以获取参数数据，还可以获取子树
 * 通过函数返回值传递回来的数据
 */


/**
 * 遍历模板
 * def traverse(root):
 *   if (!root) return null
 *   traverse(root.left)
 *   traverse(root.right)
 */

/**
 * 分解问题模板
 * def subProblem(root):
 *   if (!root) return xxx;
 *   const leftRes = subProblem(root.left)
 *   const rightRes = subProblem(root.right)
 *   return xxx
 */
