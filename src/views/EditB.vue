<script>
import HeaderView from '../components/Header.vue';
import SessionEditView from '../components/SessionEdit.vue';
import SessionView from '../components/Session.vue';

export default {
    components: {
        HeaderView,
        SessionEditView,
        SessionView

    },

    data() {
        return {
            vh: 0,
            items:
            JSON.parse(sessionStorage.getItem("a"))
                
            ,
            items2: [

            ],
            title: "",
            choice: false,
            must: false,
            option: "",
            more: false,
            optionId: "",
            questionId: "",
            listData: JSON.parse(sessionStorage.getItem("a")),
            questionSessionId: "",
            sessions: [],
            id: [],
            qId:[]

        }
    },
    methods: {
       
        findqo() {
         
            let body = {
                "questionnaireId": this.$route.params.Id,
            }

            fetch("http://localhost:8080/find_q_o", {
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
                    this.items2 = data
                    console.log(this.items2)
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        enter(value) {
            this.$emit('e-change', value);
            this.title = value.questionText
            this.choice = value.questionType
            this.must = value.isRequired
            this.option = value.options
            this.optionId = value.optionsId
            this.questionId = value.questionId
            const index = this.qId.findIndex(i => i === value.questionId);
            if (index !== -1) {
                this.qId.splice(index, 1); // 从数组中删除找到的元素
            } else {
                this.qId.push(value.questionId)
            }
            console.log(this.title)
        },
        enterSession(value, value2) {
            console.log(value2)
            this.$emit('f-change', value, value2);
            this.title = value.questionText
            this.choice = value.questionType
            this.must = value.isRequired
            this.option = value.options
            this.optionId = value.optionsId
            this.questionId = value.questionId
            this.questionSessionId = value.questionSessionId
            this.sessions = value
            const index = this.id.findIndex(i => i === value2);
            if (index !== -1) {
                this.id.splice(index, 1); // 从数组中删除找到的元素
            } else {
                this.id.push(value2)
            }
            console.log(this.id)
        },
        clear() {
            this.title = ""
            this.choice = false
            this.must = false
            this.option = ""
        },
        update() {
            let body = {
                "questionType": this.choice,
                "questionText": this.title,
                "isRequired": this.must,
                "questionId": this.questionId,
                "options": this.option,
                "optionsId": this.optionId,

            }

            fetch("http://localhost:8080/update_qo", {
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
                    this.findqo();
                    const responseMessage = data.message; // 假設回應的資料中包含名為 message 的屬性
                    window.alert(responseMessage);
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        session() {

            try {
                this.listData = JSON.parse(sessionStorage.getItem("a"));

            } catch (error) {
                console.log("JSON 解析错误:", error);
                this.listData = null;
            }
            let body = {
                "list": this.listData,
                "questionnaireId": this.$route.params.Id,
                "questionText": this.title,
                "isRequired": this.must,
                "questionType": this.choice,
                "options": this.option,
                "questionSessionId": this.questionSessionId
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
                "questionnaireId": this.$route.params.Id,
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
                    this.$router.push("/")
                    sessionStorage.removeItem("a")
                    data.questionSessionId = 1;
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        deleteQ() {
            let body = {
                "questionId":  this.questionId
            }
            fetch("http://localhost:8080/delete_qo", {
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
                    this.findqo();
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        deleteSession() {
            try {
                this.listData = JSON.parse(sessionStorage.getItem("a"));

            } catch (error) {
                console.log("JSON 解析错误:", error);
                this.listData = null;
            }
            let body = {
                "list": this.listData,
                "sessions":  this.id,
            }
            fetch("http://localhost:8080/delete_session", {
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
                    sessionStorage.setItem("a", JSON.stringify(data))
                    this.items = data
                    this.id = [];
                    console.log(this.items)
                    this.findqo();
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    

},
mounted() {
    this.vh = document.documentElement.scrollHeight - 72 - 85;
    document.getElementById("wrap").style.height = this.vh.toString() + "px";
    this.findqo();

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
                <button v-if="!more" @click="update" type="button">編輯</button>
                <button v-else @click="session" type="button">加入</button>
                <input v-model="more" v-on:change="clear" class="ms-2" type="checkbox" name="" id="">追加題目
            </div>
        </div>
        <div class="mt-2">
            <button v-if="!more" @click="deleteQ" class="ms-5" type="button">刪除問題</button>
            <button v-else @click="deleteSession" class="ms-5" type="button">刪除問題</button>
            <button v-if="more" @click="db" class="ms-5" type="button">儲存問題</button>
        </div>
        <div class="Result mt-1">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>選擇</th>
                        <th>編號</th>
                        <th>問題</th>
                        <th>種類</th>
                        <th>必填</th>
                    </tr>
                </thead>

                <tbody>
                    <SessionEditView v-if="!more" v-for="edit in items2.list" @e-change="enter" v-bind:key="edit" v-bind:edit="edit" v-bind:cc="more" />
                    <SessionView v-else v-for="(session, index) in items" @f-change="enterSession" v-bind:key="session" v-bind:session="session" v-bind:index="index" />
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