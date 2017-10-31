const Methods = function (methodsOBJ, initState) {
  if (!methodsOBJ) {
    console.error('No methods...')
    return true
  }
  this.states = initState
}

Methods.prototype.mutations = {
  setData (obj, states) {
    let values = states
    for (let key in values) {
      values[key].disabled = false
      values[key].controlId = null
    }
    obj.states = values
  }
}

export default Methods
