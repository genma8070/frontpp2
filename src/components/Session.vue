<script>
export default {
  props: [
    "session"
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
    }

  }
};
</script>

<template>
  <a href=""></a>
  <tr>
    <td><input type="checkbox" @change="sendData(session)" :value="session.questionnaireId" /></td> <!-- 複選框列 -->
    <td>{{ session.questionSessionId }}</td>
    <td>{{ session.questionText }}</td>
    <td v-if="session.questionType">多選</td>
    <td v-else>單選</td>
    <td v-if="session.isRequired">必填</td>
    <td v-else>非必填</td>
    <td><a href="">編輯!</a></td>
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
  