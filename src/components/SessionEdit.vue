<script>
export default {
  props: [
    "edit",
    "cc"
  ],
  emits: ['e-change'],
  data() {
    return {
      
    };
  },
  methods: {

    sendData(value) {
      this.$emit('e-change', value);
      console.log(this.edit)
    },
    
  },
  mounted() {
   
    }
};
</script>

<template>
  <tr>
    <td v-if="!cc"><input type="radio" name="gg" v-on:change="sendData(edit)" :value="edit.questionId" /></td> <!-- 複選框列 -->
    <td v-else><input type="checkbox" name="gg" v-on:change="sendData(edit)"  :value="edit.questionId" /></td>
    <td>{{ edit.questionSessionId }}</td>
    <td>{{ edit.questionText }}</td>
    <td v-if="edit.questionType">多選</td>
    <td v-else>單選</td>
    <td v-if="edit.isRequired">必填</td>
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
  