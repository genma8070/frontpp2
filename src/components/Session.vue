<script>
export default {
  props: [
    "session",
    "index"
  ],
  emits: ['f-change'],
  data() {
    return {


    };
  },
  methods: {
    getEditUrl(questionnaireId) {
      return '/edit/' + questionnaireId;
    },
    sendData(value, value2) {
      this.$emit('f-change', value, value2);
    
    }

  }
};
</script>

<template>
  <tr>
    <td><input type="checkbox" v-on:change="sendData(session, index)"/></td> <!-- 複選框列 -->
    <td>{{ index + 1 }}</td>
    <td>{{ session.questionText }}</td>
    <td v-if="session.questionType">多選</td>
    <td v-else>單選</td>
    <td v-if="session.isRequired">必填</td>
    <td v-else>非必填</td>
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
  