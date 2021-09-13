<template>
  <div>
    hello {{who}}
  </div>
</template>

<script>
module.exports = {
  name: 'Hello',
  data: function() {
    return {
      who: 'world'
    }
  }
}
</script>

<style scoped>

</style>