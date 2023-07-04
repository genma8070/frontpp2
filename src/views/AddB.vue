<script>
import HeaderView from '../components/Header.vue';
import SessionView from '../components/Session.vue';

export default {
    components: {
        HeaderView,
        SessionView

    },

    data() {
        return {
            vh: 0,
            items: [

            ],
            title: "",
            choice: false,
            must: false,
            option: ""

        }
    },
    methods: {
        session() {
            let listData = JSON.parse(sessionStorage.getItem("a"));
            let body = {

                "list": listData,
                "questionnaireId": this.$route.params.b_Id,
                "questionText": this.title,
                "isRequired": this.must,
                "questionType": this.choice,
                "options": this.option
            }

            fetch("http://localhost:8080/new_session", {
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
                    console.log(sessionStorage.getItem("a")),
                        sessionStorage.setItem("a", JSON.stringify(data))
                    this.items = data
                    console.log(this.items)

                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        db() {
            let listData = JSON.parse(sessionStorage.getItem("a"));
            let body = {

                "list": listData,
                "questionnaireId": this.$route.params.b_Id,
                "questionText": this.title,
                "isRequired": this.must,
                "questionType": this.choice,
                "options": this.option
            }

            fetch("http://localhost:8080/go_db", {
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
                    console.log(sessionStorage.getItem("a")),
                        sessionStorage.removeItem("a")
                    this.items = data
                    console.log(this.items)

                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    },
    mounted() {
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 ">
        <HeaderView></HeaderView>
        <div class="d-flex mt-1 mx-5 border border-dark border-2 justify-content-center">
            <div class="row d-flex flex-column mx-3 my-2">
                <div class="col d-flex">
                    <h4>問題:</h4>
                    <input v-model="title" style="height: 25px; width: 300px;" class="ms-2" type="text">
                    <select v-model="choice" style="height: 25px; width: 100px;" class="ms-2">
                        <option value="false">單選</option>
                        <option value="true">多選</option>
                    </select>
                    <input v-model="must" type="checkbox" style="height: 25px; width: 25px;" class="ms-2">
                    <h4>必選</h4>
                </div>
                <div class="col d-flex">
                    <h4>選項:</h4>
                    <input v-model="option" style="height: 25px; width: 300px;" class="ms-2" type="text">
                    <h4>(多個選項以;分隔)</h4>
                </div>
            </div>
            <div class="mt-4">
                <button @click="session" type="button">加入</button>
            </div>
        </div>
        <div class="mt-2">
            <button @click="deleteEnquete" class="ms-5" type="button">清除問題</button>
            <button @click="db" class="ms-5" type="button">儲存問題</button>
        </div>
        <div class="Result mt-1">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>確認</th>
                        <th>編號</th>
                        <th>問題</th>
                        <th>種類</th>
                        <th>必填</th>
                        <th>編輯</th>
                    </tr>
                </thead>

                <tbody>
                    <SessionView v-for="session in items" @f-change="getId" v-bind:key="session"
                        v-bind:session="session" />
                </tbody>

            </table>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.mid {
    text-align: center;
}

.page {
    margin-top: 240px;

}

.Result {
    justify-content: space-around;
    text-align: center;
    overflow: auto;
    margin-bottom: -200px;
    height: 200px;
    /* 自定義高度，根據需要調整 */
}
</style>