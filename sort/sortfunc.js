/* ---------------------经典排序算法--------------------------- */

/* 冒泡排序
 ** 比较相邻大小，将大的往后放完成排序
 */

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
// console.log(bubbleSort(arr))
// console.log(bubbleSort2(arr))
// console.log(selectSort(arr))
// console.log(insertSort(arr))
// console.log(middleInsertSort(arr))
// console.log(shellSort(arr))
console.log(mergeSort(arr))

function bubbleSort(sortarr) {
  console.time('前冒泡排序耗时')
  if (sortarr.length <= 1) return sortarr
  //  可新建数组避免误操作
  const arr = [...sortarr]
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  console.timeEnd('前冒泡排序耗时')
  return arr
}

/* 改进冒泡排序
 ** 比较相邻大小，将大的往后放完成排序
 ** 记录最后一次交换的地方,后面的可以不用在进行排序
 */

function bubbleSort2(sortarr) {
  console.time('改冒泡排序耗时')
  if (sortarr.length <= 1) return sortarr
  const arr = [...sortarr]
  let i = arr.length - 1
  while (i > 0) {
    let pos = 0
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 记录最后一次交换位置
        pos = j
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
    i = pos
  }
  console.timeEnd('改冒泡排序耗时')
  return arr
}

/* 选择排序
 ** 找出数组中最大的数字或者最小的排到首位，在找出未排序的最大（小）排在已排数组的最后
 */

function selectSort(sortarr) {
  console.time('选择排序耗时')
  if (sortarr.length <= 1) return sortarr
  const arr = [...sortarr]
  let miniIndex, temp
  for (let i = 0; i < arr.length - 1; i++) {
    miniIndex = i
    // 找出未排序数组中最小值索引
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] < arr[miniIndex]) {
        miniIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[miniIndex]
    arr[miniIndex] = temp
  }
  console.timeEnd('选择排序耗时')
  return arr
}

/* 插入排序
 ** 像扑克牌一样 在已排序数组中插入
 */
function insertSort(sortarr) {
  console.time('插入排序耗时')
  if (sortarr.length <= 1) return
  const arr = [...sortarr]
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i]
    let j = i - 1
    // 将比当前值大的全部向后移一位
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j]
      j--
    }
    // 插入当前值
    arr[j + 1] = current
  }
  console.timeEnd('插入排序耗时')
  return arr
}

/* 二分插入排序
 ** 将已排序的数组  二等分比较当前值和中间的值的大小  缩小范围
 ** 在将比当前值大的值全部向后移动  再插入当前值
 */

function middleInsertSort(sortarr) {
  console.time('二分插入排序耗时')
  if (sortarr.length <= 1) return
  const arr = [...sortarr]
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let left = 0
    let right = i - 1
    while (left <= right) {
      const middle = parseInt((left + right) / 2)
      if (key > arr[middle]) {
        left = middle + 1
      } else {
        right = middle - 1
      }
    }
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j]
    }
    arr[left] = key
  }
  console.timeEnd('二分插入排序耗时')
  return arr
}

/**
 * 希尔排序
 * 先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序， 具体算法描述：

<1> .选择一个增量序列t1， t2，…， tk， 其中ti > tj， tk = 1；
<2> .按增量序列个数k， 对序列进行k 趟排序；
<3> .每趟排序， 根据对应的增量ti， 将待排序列分割成若干长度为m 的子序列， 分别对各子表进行直接插入排序。
仅增量因子为1 时， 整个序列作为一个表来处理， 表长度即为整个序列的长度。
*/

function shellSort(sortarr) {
  console.time('希尔排序耗时')
  if (sortarr.length <= 1) return sortarr
  const arr = [...sortarr]
  const len = arr.length
  let temp,
    gap = 1
  while (gap < len / 3) { // 动态定义间隔序列
    gap = gap * 3 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i]
      // 按照间隔进行比较，如果arr[j] > arr[i]时，给arr[i]赋值更大的值
      // 每次减少间隔进行比较，最后将停下来的位置j的值替换为初始arr[i]的值
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  console.timeEnd('希尔排序耗时')
  return arr
}

/**
 * 归并排序
 */
function mergeSort(sortarr) {
  console.time('归并排序耗时')
  function middlearr (arr) {
    const len = arr.length
    if (len <= 1) return arr
    const middle = Math.floor(len / 2),
      left = arr.slice(0, middle),
      right = arr.slice(middle)
    return merge(middlearr(left), middlearr(right))
  }

  function merge(left, right) {
    const result = []
    while (left.length && right.length) {
      if (left[0] > right[0]) {
        result.push(right.shift())
      } else {
        result.push(left.shift())
      }
    }
    while (left.length) {
      result.push(left.shift())
    }
    while (right.length) {
      result.push(right.shift())
    }
    return result
  }
  console.timeEnd('归并排序耗时')
  return middlearr(sortarr)
}
