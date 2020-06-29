/**
 * 电商sku全排列
 * @param {string[][]} specifications 所有规格
 * @returns {*} 所有sku的组合排列
 */
const skuSort = (...specifications: string[][]) => {
  // 存放结果数据
  let result: string[][] = []

  let helper = (idx: number, prev: string[]) => {
    // 当前处理的规格
    let specification = specifications[idx]
    // 是否是最后一个规格
    let isLastSpec = idx === specifications.length - 1
    // 递归回溯
    for (let val of specification) {
      let cur = prev.concat(val)
      isLastSpec ? result.push(cur) : helper(idx + 1, cur)
    }

    // 从下标0的规格开始处理
    helper(0, [])

    return result;
  }
}