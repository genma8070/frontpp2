<script>
import Question from '../components/C_Detail_Question.vue';


export default {
    components: {
        Question

    },

    data() {
        return {
            items: [],
            name: "",
            age: "",
            phone: "",
            email: "",
            title: "",
            ansArr: []
        }
    },
    methods: {
        getOP() {
            let body = {
                "questionnaireId": this.$route.params.Id,

            }
            fetch("http://localhost:8080/get_q_o", {
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
                    this.items = data
                    this.getEnq();


                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        getEnq() {
            let body = {
                "questionnaireId": this.$route.params.Id,

            }
            fetch("http://localhost:8080/find_by_id", {
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
                    this.getAns();
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        getAns(){
            let body = {
                "answerId": this.$route.params.PId,
            }
            fetch("http://localhost:8080/find_answer_by_id", {
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
                    this.title = data.b[0].answerTime;
                    this.name = data.b[0].answerName;
                    this.email = data.b[0].answerEmail;
                    this.phone = data.b[0].answerPhone;
                    this.age = data.b[0].answerAge;
                    this.ansArr = data.b[0].selectedOptions.split(';');
                })
                .catch(function (error) {
                    console.log(error)
                })

        }
        

    },
    mounted() {
        if(sessionStorage.getItem("position")==2|| sessionStorage.getItem("position") == null){
            window.alert("還想偷渡R")
            sessionStorage.clear();
            this.$router.push('/')
        }
        this.getOP();
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";
        
       
    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 " style="overflow-y: auto;">
        <div class="d-flex mt-1 mx-5 border border-dark border-2 justify-content-center">
            <div class="row d-flex flex-column mx-3 my-2">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <h2>填寫時間:{{ title }}</h2>
                </div>
                <div class="col d-flex">
                    <h4>姓名:</h4>
                    <input placeholder="請輸入中文姓名" v-model="name" style="height: 25px; width: 338px;" class="ms-2" type="text"
                        @input="validateChineseInput" disabled>
                </div>
                <div class="col d-flex">
                    <h4>電話:</h4>
                    <input placeholder="請輸入碼電話" v-model="phone" style="height: 25px; width: 338px;" class="ms-2"
                        type="number" disabled>
                </div>
                <div class="col d-flex">
                    <h4>EMail:</h4>
                    <input placeholder="請輸入email" v-model="email" style="height: 25px; width: 325px;" class="ms-2"
                        type="email" @blur="validateEmailInput" disabled>
                </div>
                <div class="col d-flex">
                    <h4>年齡:</h4>
                    <input placeholder="請輸入年齡" v-model="age" style="height: 25px; width: 338px;" class="ms-2" type="number"
                        @blur="ageLimit" disabled>
                </div>

                <ol class="list-group list-group-numbered ">
                    <Question v-if="ansArr.length>0" class="overflow-auto" v-for="(qList, index) in items.list" v-bind:key="qList"
                        v-bind:qList="qList" v-bind:index="index" v-bind:selectArr="ansArr" />
                </ol>
               
            </div>

        </div>
    </div>
</template>
<style lang="scss" scoped></style>