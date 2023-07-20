<script>
export default {
  props: [
    "property",
    "index"
  ],
  emits: ['fChange'],
  data() {
    return {
      ed: 0,
      nd: 0,

    };
  },
  methods: {
    getEditUrl(questionnaireId) {
      return '/ans/' + questionnaireId;
    },
    sendData(value) {
      this.$emit('f-change', value);
    },
    see() {

      let body = {
        "questionnaireId": this.property.questionnaireId

      }
      fetch("http://localhost:8080/draw_g", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      })
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          if (data.message) {
            window.alert(data.message)
            this.$router.push({ name: 'f_home' });
          }
          else {
            this.$router.push({ name: 'graph', params: { Id: this.property.questionnaireId } });
          }


        })
        .catch(function (error) {
          console.log(error)
        })

    }
  },
  mounted() {
    this.ed = new Date(this.property.endTime).getTime()
    this.nd = Date.now()
  }


};
</script>

<template>
  <a href=""></a>
  <tr>
    <!-- <td v-if="property.status"></td>
    <td v-else><input type="checkbox" @change="sendData(property,index)" :value="property.questionnaireId" /></td> 複選框列 -->
    <td>{{ index + 1 }}</td>
    <td v-if="!property.status">{{ property.title }}</td>
    <td v-else-if="property.status && this.ed > this.nd"><a :href="getEditUrl(property.questionnaireId)" class="aa">{{
      property.title }}</a></td> <!-- 複選框列 -->
    <td v-else>{{ property.title }}</td>
    <td v-if="property.status">開放中</td>
    <td v-else-if="!property.status && this.ed > this.nd">未開放</td>
    <td v-else>已結束</td>
    <td>{{ property.startTime }}</td>
    <td>{{ property.endTime }}</td>
    <td>
      <button @click="see">觀看統計</button>
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
  