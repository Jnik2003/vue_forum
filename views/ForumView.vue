<template>
  <div class="container">
    <h1>Форум</h1>
    <div class="forum" v-if="$store.getters['auth/isLogged']">
    <themes-comp/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .forum{
    width: 100%;
    // height: 300px;
    background-color: lightblue;
    padding: 20px;
  }
</style>
