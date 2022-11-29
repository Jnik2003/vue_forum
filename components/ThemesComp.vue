<template>
  <div>
    <table border="1" width="100%" style="border-collapse: collapse">
      <tr>
        <th>id</th>
        <th>Дата</th>
        <th>Тема</th>
        <th>Пользователь</th>
      </tr>

      <tr
        v-for="data in getThemes"
        :key="data.id"
        class="tb_string"
        @click.stop="themeSelect(data.id)"
      >
        <td>{{ data.id }}</td>
        <td>{{ data.date }}</td>
        <td>
          {{ data.title }}
          <button
            v-show="$store.getters['auth/getLoginName'] === data.login"
            @click.stop="editToggle(data.id)"
            :disabled="data.id != themeId && themeId != ''"
          >
            Ред
          </button>
          <div
            class="edit"
            v-show="isEditVisible && themeId === data.id"
            ref="data.id"
          >
            <input type="text" :value="data.title" />
            <button @click="save(data.id)">Сохр</button>
          </div>
        </td>
        <td>{{ data.login }}</td>
      </tr>
    </table>
    <div class="new">
      <label class="new__text">
        Новая тема
        <textarea
          rows="5"
          cols="45"
          maxlength="500"
          minlength="5"
          v-model="newTheme"
          placeholder="Мин 5 Макс 500 символов"          
        ></textarea>
      </label>
      <div class="new__btn">
        <button
          @click="addNewTheme"
          :disabled="newTheme.length < 5 || newTheme.length > 500"        
        >
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemesComp",
  data() {
    return {
      //видимость инпута редактирования
      isEditVisible: false,

      themeId: "",
      newTheme: "",
    };
  },
  computed: {
    getThemes() {
      return this.$store.getters["forum/getThemes"];
    },
    
  },
  methods: {
    themeSelect(id) {
      console.log(id, "переход к постам");
      //
    },
    editToggle(id) {
      console.log(id);
      this.isEditVisible === false ? (this.themeId = id) : (this.themeId = "");
      this.isEditVisible = !this.isEditVisible;
    },
    save(id) {
      this.editToggle(id);
      // редактировать запись в БД
      console.log("ред");
    },
    addNewTheme() {
      console.log(this.newTheme);
      // добавить новую тему в БД
    },
  },
  mounted() {
    this.$store.dispatch("forum/loadThemes");
  },
};
</script>

<style lang="scss" scoped>
table {
  margin-bottom: 40px;
}
.tb_string {
  cursor: pointer;
}
.themes_item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  border: 1px solid grey;
}
.new__text {
  margin-bottom: 20px;
}
textarea {
  resize: none;
}
button {
  cursor: pointer;
}

</style>