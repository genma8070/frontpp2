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
            selectedOption: '',
            cArr:[]
        };
    },
    methods: {
   
    },
    mounted() {

        const index2 = this.sOArr.findIndex(element => element === this.oList.optionId.toString())

        if (index2 !== -1) {
            this.checked = true;   
        }
        
        if (this.sOArr) {
            this.sOArr.forEach(element => {
                this.selectedOption = element;
            });
            // this.selectedOption = this.sOArr[this.qIndex] || "";
        }

    }
};
</script>

<template>
    <tr>
        <td v-if="!check"><input type="radio" :name="'radio-' + oList.questionId" :value="oList.optionId"
                v-model="selectedOption" disabled>{{
                    oList.optionText }}</td>
        <td v-else><input type="checkbox" v-model="checked" :value="oList.optionId"
                :name="oList.questionId" disabled>{{
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
  