<script>
export default {
    props: [
        "oList",
        "index",
        "qIndex",
        "check",
        "sOArr"
    ],
    emits: [
        'o-change',
        'or-change'
    ],
    data() {
        return {
            checked: false,
            remove: 0,
            selectedOption: ''
        };
    },
    methods: {
        sendData(value) {
            this.$emit('o-change', value);
         
        },
        sendRadioData(value) {
            this.$emit('or-change', value);
          
        },

    },
    mounted() {
       if(JSON.parse(sessionStorage.getItem(this.qIndex))!==null){
        const index2 = JSON.parse(sessionStorage.getItem(this.qIndex)).findIndex(i => i === this.oList.optionId);
        if (index2 !== -1) {
            this.checked = true;
        }
        if (JSON.parse(sessionStorage.getItem(this.qIndex))) {
            this.selectedOption = JSON.parse(sessionStorage.getItem(this.qIndex))[0] || "";
        }
    }
    }
};
</script>

<template>
    <tr>
        <td v-if="!check"><input type="radio" :name="'radio-' + oList.questionId" :value="oList.optionId"
                v-model="selectedOption" v-on:change="sendRadioData(oList.optionId)">{{
                    oList.optionText }}</td>
        <td v-else><input type="checkbox" v-model="checked" v-on:change="sendData(oList.optionId)" :value="oList.optionId"
                :name="oList.questionId">{{
                    oList.optionText }}</td>
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
  