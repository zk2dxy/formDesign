const Methods = function (methodsOBJ, initState) {
  if (!methodsOBJ) {
    console.error('No methods...')
    return true
  }
  this.states = initState
}

Methods.prototype.mutations = {
  setData (obj, states) {
    obj.states = states
  }
}

export default Methods
