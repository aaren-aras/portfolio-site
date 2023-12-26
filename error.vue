<template>
  <h1>oh wow whaddya know smth broke</h1>
  <h2>{{ error.statusCode }}</h2>
  <h2>{{ error.message }}</h2>
  <button @click="handleError">Home</button>
</template>

<script setup>
  defineProps(['error']);

  const handleError = () => { clearError({ redirect: '/' }); }

</script>

<style lang="scss" scoped>

</style>