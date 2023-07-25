<script>
export default {
  props: [
    "property",
    "index"
  ],
  emits: ['f-change'],
  data() {
    return {
      ed: 0,
      nd: 0,

    };
  },
  methods: {
    getEditUrl(questionnaireId) {
      return '/edit/' + questionnaireId;
    },
    sendData(value) {
      this.$emit('f-change', value);
    },
    

  },
  mounted(){
 
  }
};
</script>

<template>
  <a href=""></a>
  <tr>
    <td><input type="radio" @change="sendData(property, index)" :value="property" name="menber"></td>
    <td>{{ property.account }}</td>
    <td v-if="property.position === 1">後台人員</td>
    <td v-else>使用者</td>
    
  </tr>
</template>
  
 
<style lang="scss" scoped>
.aa:link {
  //設定還沒有瀏覽過的連結
  text-decoration: none;
  background-color: #ffffff;
  color: black;
  border-radius: 5px;
}

.aa:hover {
  //設定滑鼠移經的連結
  text-decoration: none;
  background-color: #e18b8b;
  color: black;
  border-radius: 5px;

}

.aa:active {
  //設定正在點選的連結
  text-decoration: none;
  background-color: rgb(255, 68, 68);
  color: black;
  border-radius: 5px;


}

.aa:visited {
  //設定還沒有瀏覽過的連結
  text-decoration: none;
  background-color: #ffffff;
  color: black;
  border-radius: 5px;
}


/* 在這裡放置子元件的樣式 */
</style>
  