<script>
import Question from '../components/Question.vue';


export default {
    components: {
        Question,


    },

    data() {
        return {
            items: [],
            eItems: [],
            name: "",
            age: "",
            phone: "",
            email: "",
            title: "",
            description: "",
            st: '',
            et: '',
            deBug: false,
            db: []
        }
    },
    methods: {
        //         checkNumeric() {
        //       if (!/^\d+$/.test(this.age)) {
        //         alert("請輸入數字");
        //         this.age = '';
        //       }
        //     }
        //   
        checkPhone() {
            if (!this.deBug) {
                this.deBug = true;
                const pattern = /^09\d{8}$/;
                const phoneNum = this.phone.toString()

                if (!pattern.test(phoneNum)) {
                    this.phone = "";
                    alert("請輸入正確的手機號碼格式，例如：09xxxxxxxx");

                }
                sessionStorage.setItem('phone', this.phone);

            }
            this.deBug = false
        },
        ageLimit() {
            if (this.age < 0 || this.age > 100) {
                alert("請填入有效年齡0~100");
                this.age = "";
            }
            sessionStorage.setItem('age', this.age)
        },
        validateChineseInput() {
            const pattern = /^[\u4e00-\u9fa5]*$/;
            if (!pattern.test(this.name)) {
                alert("請輸入中文。");
                this.name = "";
            }
            sessionStorage.setItem('name', this.name)
        },
        validateEmailInput() {
            if (!this.deBug) {
                this.deBug = true;
                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!pattern.test(this.email)) {
                    alert("信箱格式錯誤。");
                    this.email = "";

                }
                sessionStorage.setItem('email', this.email)

            }
            this.deBug = false
        },
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
                    console.log(this.items)

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
                    this.title = data.list[0].title
                    this.description = data.list[0].description
                    this.st = data.list[0].startTime
                    this.et = data.list[0].endTime

                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        getSess() {
            if (sessionStorage.getItem("age") === null || sessionStorage.getItem("phone")
                === null || sessionStorage.getItem("name")
                === null || sessionStorage.getItem("email") === null) {
                sessionStorage.setItem('age', "")
                sessionStorage.setItem('name', "")
                sessionStorage.setItem('phone', "")
                sessionStorage.setItem('email', "")

            } else {
                this.age = sessionStorage.getItem("age")
                this.phone = sessionStorage.getItem("phone")
                this.name = sessionStorage.getItem("name")
                this.email = sessionStorage.getItem("email")
            }
        },
        goCheck() {
            if (this.age === "" || this.email === "" || this.name === "" || this.phone === "") {
                window.alert("個人資料不得有空")
            } else {
                this.$router.push({ name: 'check', params: { Id: this.$route.params.Id } });
            }
        },
        goHome() {
            sessionStorage.removeItem('age')
            sessionStorage.removeItem('name')
            sessionStorage.removeItem('phone')
            sessionStorage.removeItem('email')
            this.$router.push({ name: 'f_home' });
        },
        goDb() {
            for (let i = 0; i < this.items.length; i++) {
                sessionStorage.getItem(i).forEach(element => {
                    if (element === []) {
                        element === "無";
                    }
                    const e = element.join(',')
                    this.db.add(e)
                });
                this.db = this.db.join(';')
            }
            console.log(this.db)
        }

    },
    mounted() {
        if(sessionStorage.getItem("position")!=2|| sessionStorage.getItem("position") == null){
            window.alert("還想偷渡R")
            sessionStorage.clear();
            this.$router.push('/')
        }

        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";
        this.getOP();
        this.getSess();
        // this.getEnq();
    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 " style="overflow-y: auto;">
        <div class="d-flex mt-1 mx-5 border border-dark border-2 justify-content-center">
            <div class="row d-flex flex-column mx-3 my-2">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <p class="h6 text-end">開放期間:{{ st }}~{{ et }}</p>
                    <h1>{{ title }}</h1>
                    <h5>{{ description }}</h5>
                </div>
                <div class="col d-flex">
                    <h4>姓名:</h4>
                    <input placeholder="請輸入中文姓名" v-model="name" style="height: 25px; width: 338px;" class="ms-2" type="text"
                        @input="validateChineseInput">
                </div>
                <div class="col d-flex">
                    <h4>電話:</h4>
                    <input placeholder="請輸入10碼電話" v-model="phone" style="height: 25px; width: 338px;" class="ms-2"
                        type="text" @blur="checkPhone">
                </div>
                <div class="col d-flex">
                    <h4>EMail:</h4>
                    <input v-if="phone === ''" placeholder="請先輸入電話" v-model="email" style="height: 25px; width: 325px;"
                        class="ms-2" type="email" @blur="validateEmailInput" disabled>
                    <input v-else placeholder="請輸入email" v-model="email" style="height: 25px; width: 325px;" class="ms-2"
                        type="email" @blur="validateEmailInput">
                </div>
                <div class="col d-flex">
                    <h4>年齡:</h4>
                    <input placeholder="請輸入年齡" v-model="age" style="height: 25px; width: 338px;" class="ms-2" type="number"
                        @input="ageLimit">
                </div>

                <ol class="list-group list-group-numbered ">
                    <Question class="overflow-auto" v-for="(qList, index) in items.list" v-bind:key="qList"
                        v-bind:qList="qList" v-bind:index="index" />
                </ol>
                <div class="mt-2 d-flex justify-content-between">
                    <p></p>
                    <input type="button" @click="goHome" value="取消">
                    <input type="button" @click="goCheck" value="送出">
                </div>

            </div>

        </div>
    </div>
</template>
<style lang="scss" scoped></style>