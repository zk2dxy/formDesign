const formStore = function (form, initState) {
  if (!form) {
    console.error('No data')
    return true
  }
  this.form = form
  this.selected = null
  this.states = this.form.$data.list
}

formStore.prototype.mutations = {
  setData (formStore, newValue) {
    formStore.states = newValue
  },
  getData (states) {
    // return states
  },
  cloneData () {
    console.error(`cloneData`)
  },
  resetData () {
    console.error(`resetData`)
  },
  filterChange () {
    console.error(`filterChange`)
  }
}

export default formStore
