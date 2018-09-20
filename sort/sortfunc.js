/* ---------------------经典排序算法--------------------------- */

/* 冒泡排序
** 比较相邻大小，将大的往后放完成排序
*/

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
// console.log(bubbleSort(arr))
// console.log(bubbleSort2(arr))
// console.log(selectSort(arr))
console.log(insertSort(arr))
console.log(middleInsertSort(arr))

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