export function layoutJudge (VItem, param) {
  let max = null
  if (VItem.max) {
    max = VItem.max
  }
  if (param === 'percentLayout') {
    if (VItem.default > max) {
      return {msg: '百分比值,最大不能超过100', value: 100, type: 'percentLayout'}
    } else {
      return {msg: ''}
    }
  }
  if (param === 'pixelLayout') {
    console.error('param => pixelLayout')
  }
  if (param === 'flexLayout') {
    console.error('param => flexLayout')
  }
  /*
    if (param === 'columnLayout') {
      console.error('param => columnLayout')
    }
  */
}

export function calcLayoutClass (list) {
  // console.error(list)
  return list
}
