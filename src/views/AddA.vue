<script>
import HeaderView from '../components/Header.vue';

export default {
    components: {
        HeaderView

    },

    data() {
        return {
            vh: 0,
            title: "",
            startTime: "",
            endTime: "",
            description: ""
        }
    },
    methods: {
        add() {

            let body = {
                "title": this.title,
                "startTime": this.startTime,
                "endTime": this.endTime,
                "description": this.description
            }
            fetch("http://localhost:8080/new_enquete", {
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
                        window.alert(data.message);

                    } else {
                        window.alert("新增成功");
                        this.jump();
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        jump() {

            fetch("http://localhost:8080/find_newst", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },

            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {

                    const questionnaireId = data.questionnaireId;


                    this.$router.push({ name: 'b', params: { b_Id: questionnaireId } });

                })
                .catch(function (error) {
                    console.log(error)
                })
        },

    },
    mounted() {
        if(sessionStorage.getItem("position")==2|| sessionStorage.getItem("position") == null){
            window.alert("還想偷渡R")
            sessionStorage.clear();
            this.$router.push('/')
        }
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
                    <h4>問卷標題:</h4>
                    <input v-model="title" style="height: 25px; width: 338px;" class="ms-2" type="text">
                </div>
                <div class="col d-flex">
                    <h4>問卷簡述:</h4>
                    <input v-model="description" style="height: 25px; width: 338px;" class="ms-2" type="text">
                </div>
                <div class="col d-flex">
                    <h4>開始/截止日期:</h4>
                    <input v-model="startTime" style="height: 25px;" class="ms-2" type="date" name="" id="">
                    <input v-model="endTime" style="height: 25px;" class="ms-2" type="date" name="" id="">
                </div>
            </div>
            <div class="mt-5">
                <button @click="add" type="button">新增</button>
            </div>
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
    height: 300px;
    /* 自定義高度，根據需要調整 */
}
</style>