<script>
export default {
  props: [
    "property",
    "index"
  ],
  emits: ['fChange'],
  data() {
    return {


    };
  },
  methods: {
    getEditUrl(questionnaireId) {
      return '/edit/' + questionnaireId;
    },
    sendData(value) {
      this.$emit('f-change', value);
    },
    see(){
      this.$router.push({ name: 'c_detail', params: { Id: this.property.questionnaireId , PId: this.property.answerId } });
    },
    

  },
  mounted(){
   console.log(this.property)
  }
};
</script>

<template>
  <a href=""></a>
  <tr>
   <td>{{ index+1 }}</td>
    <td>{{ property.answerName }}</td>
    <td>{{ property.answerTime }}</td>
    <td>
      <button @click="see">前往</button>
    </td>
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
  