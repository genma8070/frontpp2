<script>
import Bar from '../components/Question_G.vue';
import Pie from '../components/Option_G.vue';
import HeaderView from '../components/Header.vue';

export default {
    components: {
        Bar,
        Pie,
        HeaderView

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
            db: [],
            graph: true
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
                    this.title = data.list[0].title

                    this.description = data.list[0].description
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        goBack() {
            this.$router.push({ name: 'ans', params: { Id: this.$route.params.id } });
        },
        changeGraph() {
            this.graph = !this.graph
        }



    },

    mounted() {
        if(sessionStorage.getItem("position")==2|| sessionStorage.getItem("position") == null){
            window.alert("還想偷渡R")
            sessionStorage.clear();
            this.$router.push('/')
        }
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

        this.getOP();

    }

}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 " style="overflow-y: auto;">
        <HeaderView></HeaderView>
        <div class="d-flex mt-1 mx-5 border border-dark border-2 justify-content-center">
            <div class="row d-flex flex-column mx-3 my-2">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <h1>{{ title }}</h1>
                    <input v-if="graph" type="button" value="圓餅圖" name="圓餅圖" @click="changeGraph">
                    <input v-else type="button" value="長條圖" name="長條圖" @click="changeGraph">
                </div>

                <ol class="my-3 list-group list-group-numbered ">
                    <Bar v-if="graph" class="overflow-auto" v-for="(qList, index) in items.list" v-bind:key="qList"
                        v-bind:qList="qList" v-bind:index="index" />
                    <Pie v-else class="overflow-auto" v-for="(qList, index) in items.list" v-bind:key="index"
                        v-bind:qList="qList" v-bind:index="index" />
                </ol>


            </div>

        </div>
    </div>
</template>
<style lang="scss" scoped></style>