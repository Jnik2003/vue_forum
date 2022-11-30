<template>
  <!-- <div> -->
  <button class="btn">
    <slot></slot>
  </button>
  <!-- </div> -->
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.btn:hover {
  background-color: #83ffb7;
}
.btn {
  min-width: 120px;
  height: 30px;
  border: none;
  transition: 0.3s;
  cursor: pointer;
}

</style>