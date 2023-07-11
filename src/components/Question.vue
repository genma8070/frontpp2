<script>
import Option from '../components/Option.vue';
export default {
    components: {
        Option

    },

    props: [
        "qList",
        "index"
    ],
    emits: ['o-change', 'or-change'],
    data() {
        return {
            oId: [],
            sArr:[]
        };
    },
    methods: {

        o_enter(value) {
            this.$emit('o-change', value);
       
            const index = this.oId.findIndex(i => i === value);
            if (index !== -1) {
                this.oId.splice(index, 1); // 从数组中删除找到的元素
            } else {
                this.oId.push(value)
            }
            sessionStorage.setItem(this.index, JSON.stringify(this.oId))
        },
        or_enter(value) {
            this.$emit('or-change', value);
       

            if (this.oId.length > 0) {
                this.oId.splice(0, 1);
                this.oId.push(value) // 从数组中删除找到的元素
            } else {
                this.oId.push(value)
            }
            sessionStorage.setItem(this.index, JSON.stringify(this.oId))
        },

    },
    mounted() {
        
        this.sArr = JSON.parse(sessionStorage.getItem(this.index))
        if (sessionStorage.getItem(this.index) === null) {
            sessionStorage.setItem(this.index, JSON.stringify([]));
        } else {
            this.oId = JSON.parse(sessionStorage.getItem(this.index));
        }

   
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
            <Option v-for="(oList, oindex) in qList.op" @o-change="o_enter" @or-change="or_enter" v-bind:key="oList"
                v-bind:oList="oList" v-bind:index="oindex" v-bind:needed="qList.isRequired"
                v-bind:check="qList.questionType" v-bind:sOArr="sArr" v-bind:qIndex="index" />
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
  