<template>
  <div class="modal" v-show="isModalVisible" @click.stop="closeModal">
    <div @click.stop class="modal__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComp",
  props: {
    isModalVisible: {
      type: Boolean,
    },
    id: {
      type: String,
      default: ''
    },
    themeId:{
        type: String,
        default: ''
    },
    
  },
  methods: {
    closeModal() {
      this.$emit("update:isModalVisible", false);
      this.$emit("update:themeId", '');
      this.$emit("update:id", '');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.1);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
}
.modal__body {
  width: 50%;
  height: 30%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: lightpink;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>