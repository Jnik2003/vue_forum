<template>
    <form class="form">        
        <slot></slot>
    </form>
</template>

<script>

    export default {
        name: 'AuthorizationForm'
        
    }
</script>

<style lang="scss">
.form {
  border: 1px solid grey;
  padding: 20px;
}

.form-tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form__tab {
  border: none;
  cursor: pointer;
  width: 50%;
  height: 50px;
  font-size: 16px;
}
.form-body {
  background-color: lightskyblue;
  padding: 20px 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-body__inputs{
   height: 30px;
  position: relative;
  display: flex;
  gap:10px;
  justify-content: flex-start;
  align-items: center;
}

.form-body__input {
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    padding: 0 5px;
  }
.form-body__valid{
 width: 20px;
  height: 20px;
  background-color: antiquewhite;
  border-radius: 50%;
  background-image: url("@/assets/svg/help.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.3s;
}
.active-tab {
  background-color: rgb(128, 170, 242);
  -webkit-box-shadow: -5px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
-moz-box-shadow: -5px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
box-shadow: -5px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
}
</style>