<script>
export default {
  props: [
    "property"
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
    <td v-if="property.status"></td>
    <td v-else><input type="checkbox" @change="sendData(property)" :value="property.questionnaireId" /></td> <!-- 複選框列 -->
    <td>{{ property.questionnaireId }}</td>
    <td v-if="property.status">{{ property.title }}</td>
    <td v-else><a :href="getEditUrl(property.questionnaireId)" class="aa">{{ property.title }}</a></td> <!-- 複選框列 -->
    <td v-if="property.status">開放中</td>
    <td v-else>未開放</td>
    <td>{{ property.startTime }}</td>
    <td>{{ property.endTime }}</td>
    <td>
      <!-- <button v-if="showStatisticsButton" @click="viewStatistics">View Statistics</button> -->
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
  