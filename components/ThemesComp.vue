<template>
  <div>
    <table border="1" width="100%" style="border-collapse: collapse">
      <tr>
        <th>id</th>
        <th>Дата</th>
        <th>Тема</th>
        <th>Пользователь</th>
        <th>Постов в теме</th>
      </tr>

      <tr v-for="(data, ind) in getThemes" :key="data.id" class="tb_string">
        <td>{{ data.id }}</td>
        <td>{{ data.date }}</td>
        <td class="theme-text">
          {{ data.title }}
          <div class="btns-box">
            <button-comp v-show="$store.getters['auth/getLoginName'] === data.login" @click.stop="editToggle(data.id)"
              :disabled="data.id != themeId && themeId != ''">
              Ред
            </button-comp>

            <modal-comp v-model:isModalVisible="isModalVisible" v-model:id="idForEdit" v-model:themeId="themeId">
              <textarea type="text" class="edit-input" rows="5" cols="45" maxlength="500" minlength="5"
                v-model.trim="editedText" placeholder="Напишите новый текст здесь"></textarea>
              <button-comp @click.stop="save(idForEdit)" :disabled="editedText.length < 5">Сохранить</button-comp>
            </modal-comp>

            <!-- --- -->
            <button-comp @click.stop="themeSelect(data.id)">К теме</button-comp>
           
        
     
          </div>
        </td>
        <td>{{ data.login }}</td>
        <td>{{count(data.id)}}{{$store.getters['posts/getCount'][ind]}}</td>
        
      </tr>
    </table>
    <div class="new">
      <label class="new__text">
        Новая тема
        <textarea rows="5" cols="45" maxlength="500" minlength="5" v-model.trim="newTheme"
          placeholder="Мин 5 Макс 500 символов"></textarea>
      </label>
      <div class="new__btn">
        <button-comp @click="addNewTheme" :disabled="newTheme.length < 5 || newTheme.length > 500">
          Добавить
        </button-comp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComp from "@/components/UI/ButtonComp.vue";

export default {
  components: { ButtonComp },
  name: "ThemesComp",
  data() {
    return {
      //видимость инпута редактирования
      isEditVisible: false,
      themeId: "",
      newTheme: "",
      editedText: "",
      isModalVisible: false,
      idForEdit: "",
    };
  },
  computed: {
    getThemes() {
      return this.$store.getters["themes/getThemes"];
    },
    // count(){
    //   return this.$store.dispatch("posts/count")
    // }
    resCount(){
      return this.$store.getters['posts/getCount']
    }
  },
  methods: {
    themeSelect(id) {
      console.log(id, "переход к постам");      
      
      this.$router.push({name: 'theme', params:{id}})
    },
    editToggle(id) {
      this.idForEdit = id;
      this.isEditVisible === false ? (this.themeId = id) : (this.themeId = "");
      this.isEditVisible = !this.isEditVisible;
      this.isModalVisible = true;
    },
    save(id) {
      console.log("save");
      this.$store
        .dispatch("themes/editTheme", [id, this.editedText])
        .then(() => {
          this.$store.dispatch("themes/loadThemes");
          this.themeId = ''
          this.idForEdit = ''
        });
      // редактировать запись в БД
      this.editToggle(id);
      this.editedText = "";
      this.isModalVisible = false;
    },
    addNewTheme() {
      console.log(this.newTheme);
      // добавить новую тему в БД
      this.$store.dispatch("themes/addTheme", this.newTheme).then(() => {
        this.$store.dispatch("themes/loadThemes");
      });
    },
    count(id){  
      this.$store.dispatch("posts/count", id)
    },
    
  },
  mounted() {
    this.$store.dispatch("themes/loadThemes");
    
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

.theme-text {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  border: none;

}

tr {
  border: 1px solid grey;
}

.edit-input {
  // height: 30px;
}

.btns-box {
  display: flex;
  gap: 20px;
}
</style>