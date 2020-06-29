# 电商sku全排列算法

## 需求

有这样三个数组:

```js
let names = ["iPhone X", "iPhone XS"]

let colors = ["黑色", "白色"]

let storages = ["64g", "256g"]

```

需要把他们的所有组合穷举出来，最终得到这样一个数组：

```js
[
  ["iPhone X", "黑色", "64g"],
  ["iPhone X", "黑色", "256g"],
  ["iPhone X", "白色", "64g"],
  ["iPhone X", "白色", "256g"],
  ["iPhone XS", "黑色", "64g"],
  ["iPhone XS", "黑色", "256g"],
  ["iPhone XS", "白色", "64g"],
  ["iPhone XS", "白色", "256g"],
]

```

如果这些属性数组的个数不确定，怎么实现一个万能排序？

## 代码实现

```js
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

console.log(skuSort(names, colors, storages))
// [
//  ["iPhone X", "黑色", "64g"] 
//  ["iPhone X", "黑色", "256g"] 
//  ["iPhone X", "白色", "64g"] 
//  ["iPhone X", "白色", "256g"]
//  ["iPhone XS", "黑色", "64g"] 
//  ["iPhone XS", "黑色", "256g"] 
//  ["iPhone XS", "白色", "64g"]
//  ["iPhone XS", "白色", "256g"]
// ]
```

## 执行步骤文字解析(递归回溯)

### 初始化
helper(0, []) -> 分支1 ["iPhone X"]，分支2 ["iPhone XS"]<br>

### 先处理分支1
helper(1, ["iPhone X"]) -> 分支1-1 ["iPhone X", "黑色"] 分支1-2 ["iPhone X", "白色"]<br>

### 先处理分支1-1
helper(2, ["iPhone X", "黑色"]) -> 分支1-1-1 ["iPhone X", "黑色", "64g"] 分支1-1-2 ["iPhone X", "黑色", "256g"]<br>

### 回溯往上处理分支1-2
helper(2, ["iPhone X", "白色"]) -> 分支1-2-1 ["iPhone X", "白色", "64g"] 分支1-2-2 ["iPhone X", "白色", "256g"]<br>

### 这时候分支1递归完成，得到分支1下的所有组合：
分支1-1-1 ["iPhone X", "黑色", "64g"]<br>
分支1-1-2 ["iPhone X", "黑色", "256g"]<br>
分支1-2-1 ["iPhone X", "白色", "64g"]<br> 
分支1-2-2 ["iPhone X", "白色", "256g"]<br>

### 回溯处理分支2
helper(2, ["iPhone XS"]) 分支2-1 ["iPhone XS", "黑色"] 分支2-2 ["iPhone XS", "白色"]<br>

### 先处理分支2-1
helper(2, ["iPhone XS", "黑色"]) -> 分支2-1-1 ["iPhone XS", "黑色", "64g"] 分支2-1-2 ["iPhone XS", "黑色", "256g"]<br> 

### 回溯往上处理分支2-2
helper(2, ["iPhone XS", "白色"]) -> 分支2-2-1 ["iPhone XS", "白色", "64g"] 分支2-2-2 ["iPhone XS", "白色", "256g"]<br>

### 分支2递归完成，得到分支2下的所有组合：
分支2-1-1 ["iPhone XS", "黑色", "64g"]<br>
分支2-1-2 ["iPhone XS", "黑色", "256g"]<br> 
分支2-2-1 ["iPhone XS", "白色", "64g"]<br>
分支2-2-2 ["iPhone XS", "白色", "256g"]<br>

### 整合两个分支的数据：
分支1-1-1 ["iPhone X", "黑色", "64g"]<br> 
分支1-1-2 ["iPhone X", "黑色", "256g"]<br> 
分支1-2-1 ["iPhone X", "白色", "64g"]<br> 
分支1-2-2 ["iPhone X", "白色", "256g"]<br>
分支2-1-1 ["iPhone XS", "黑色", "64g"]<br> 
分支2-1-2 ["iPhone XS", "黑色", "256g"]<br> 
分支2-2-1 ["iPhone XS", "白色", "64g"]<br>
分支2-2-2 ["iPhone XS", "白色", "256g"]<br>
