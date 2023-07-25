<script>
import Question from '../components/Question_C.vue';


export default {
    components: {
        Question

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
            db: []
        }
    },
    methods: {

        ageLimit() {
            if (this.age < 0 || this.age > 100) {
                alert("請填入有效年齡0~100");
                this.age = "";
            }
        },
        validateChineseInput() {
            const pattern = /^[\u4e00-\u9fa5]*$/;
            if (!pattern.test(this.name)) {
                alert("請輸入中文。");
                this.name = "";
            }
        },
        validateEmailInput() {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!pattern.test(this.email)) {
                alert("信箱格式錯誤。");
                this.email = "";
            }
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
        goBack() {
            this.$router.push({ name: 'ans', params: { Id: this.$route.params.id } });
        },
        goDb() {
            this.db = [];
            for (let i = 0; i < this.items.list.length; i++) {
                let item = JSON.parse(sessionStorage.getItem(i)); // 解析获取到的字符串为对象或数组
                if (Array.isArray(item)) {
                    if (item.length === 0) {
                        item = ["無"]; // 如果数组为空，将其设为 ["無"]
                    }
                    const e = item.join(","); // 将数组元素拼接为字符串
                    this.db.push(e);
                } else {
                    // 如果不是数组，可以根据实际需求进行其他逻辑处理
                }
            }
            this.db = this.db.join(";");
            console.log(this.db);
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
                    <h1>{{ title }}</h1>
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
                    <Question class="overflow-auto" v-for="(qList, index) in items.list" v-bind:key="qList"
                        v-bind:qList="qList" v-bind:index="index" />
                </ol>
                <div class="mt-2 d-flex justify-content-between">
                    <p></p>
                    <input type="button" @click="goBack" value="取消">
                    <input type="button" @click="goDb" value="送出">
                </div>

            </div>

        </div>
    </div>
</template>
<style lang="scss" scoped></style>