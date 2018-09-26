/**
 * deepclone
 */
function deepClone(obj) {
  const newObj = obj instanceof Array ? [] : {}
  // 返回基本类型参数
  if (typeof obj !== 'object') { return obj }
  for (let key in obj) {
    newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
  }
  return newObj
}

module.exports = deepClone