<script>
import Option from '../components/C_Detail_Option.vue';
export default {
    components: {
        Option
    },
    props: [
        "qList",
        "index",
        "selectArr" // 接收父元件傳遞的selectArr
    ],
    data() {
        return {
            oId: [],
            sArr:[]
        };
    },
    methods: {

    },
    mounted() {
    }
};
</script>

<template>
    <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
            <div v-if="qList.isRequired && qList.questionType" class="fw-bold">{{ qList.questionText }} (必填，多選) </div>
            <div v-else-if="!qList.isRequired && qList.questionType" class="fw-bold">{{ qList.questionText }} (非必填，多選)
            </div>
            <div v-else-if="qList.isRequired && !qList.questionType" class="fw-bold">{{ qList.questionText }} (必填，單選) </div>
            <div v-else="" class="fw-bold">{{ qList.questionText }} (非必填，單選) </div>
            <Option v-if="selectArr.length>0" v-for="(oList, oindex) in qList.op" v-bind:key="oList"
                v-bind:oList="oList" v-bind:index="oindex" v-bind:needed="qList.isRequired"
                v-bind:check="qList.questionType" v-bind:sOArr="selectArr[index].split(',')" v-bind:qIndex="index" />
        </div>
    </li>
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
  