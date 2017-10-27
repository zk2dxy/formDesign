let ListData = []

let Methods = {
  commitList (item) {
    formStore.data = item
  }
}

const formStore = {
  data: ListData,
  methods: Methods
}

export default formStore
