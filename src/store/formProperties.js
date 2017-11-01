const Properties = function (propertyOBJ, initState) {
  if (!propertyOBJ) {
    console.error('No Properties')
    return true
  }
  this.states = initState
}

Properties.prototype.mutations = {
  setData (obj, states) {
    let values = states
    for (let key in values) {
      values[key].disabled = false
      values[key].controlId = null
    }
    obj.states = values
  },
  removeDisabled (obj, controlId) {
    for (let key in obj.states) {
      if (obj.states[key].controlId === controlId) {
        obj.states[key].controlId = null
        obj.states[key].disabled = false
      } else {
        continue
      }
    }
  }
}

export default Properties
