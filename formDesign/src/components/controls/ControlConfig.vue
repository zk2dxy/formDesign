<template>
  <div class="ControlConfig">
    <div v-if="config">
      <div v-for="(item , index) in config">
        {{index}}
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: `ControlConfig`,
    props: [`config`]
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
