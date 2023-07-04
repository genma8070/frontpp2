<script>
import Pagination from '../components/Pagination.vue';
import Result from '../components/Result.vue';
import EditView from "../views/Edit.vue";
export default {
    components: {
        Pagination,
        Result,
        EditView
    },

    data() {
        return {
            vh: 0,
            contentCount: 10,
            itemsPerPage: 10,
            currentPage: 1,
            items: [

            ],
            id: [

            ],
            title: "",
            startTime: "",
            endTime: ""

        }
    },
    methods: {
        getId(value) {
            const index = this.id.findIndex(i => i === value.questionnaireId);
            if (index !== -1) {
                this.id.splice(index, 1); // 从数组中删除找到的元素
            } else {
                this.id.push(value.questionnaireId)
            }
        },
        deleteEnquete() {
            // 在父组件中执行方法  
            let body = {

                "id": this.id
            }
            fetch("http://localhost:8080/delete_enquete", {
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
                    this.id = []

                })
                .catch(function (error) {
                    console.log(error)
                })


        },
        handlePageChanged(page) {
            // 處理分頁切換的邏輯

            this.currentPage = page;
            this.find()
            // 更新相應的內容
        },
        viewStatistics() {
            // 觸發查看統計的動作，你可以根據自己的需求進行處理
        },
        find() {
            let body = {
                "index": (this.currentPage - 1) * 10
            }

            fetch("http://localhost:8080/find_all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },

            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {

                    this.contentCount = data.list.length
                    fetch("http://localhost:8080/find_all_enquete", {
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

                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        search() {
            let body = {
                "title": this.title,
                "startTime": this.startTime,
                "endTime": this.endTime,
                "index": this.currentPage - 1
            }
            fetch("http://localhost:8080/find_questionnaire_by_title_or_date", {
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
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        add() {

            this.$router.push("/add/a");

        }

    },
    mounted() {
        this.find()
        // 設定高度
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 ">
        <div class="d-flex mt-1 mx-5 border border-dark border-2 justify-content-center">
            <div class="row d-flex flex-column mx-3 my-2">
                <div class="col d-flex">
                    <h4>問卷標題:</h4>
                    <input v-model="title" style="height: 25px; width: 338px;" class="ms-2" type="text">
                </div>
                <div class="col d-flex">
                    <h4>開始/截止日期:</h4>
                    <input v-model="startTime" style="height: 25px;" class="ms-2" type="date" name="" id="">
                    <input v-model="endTime" style="height: 25px;" class="ms-2" type="date" name="" id="">
                </div>
            </div>
            <div class="mt-5">
                <button @click="search" type="button">查詢</button>
            </div>
        </div>
        <div class="mt-2">
            <button @click="deleteEnquete" class="ms-5" type="button">刪除</button>
            <button @click="add" class="ms-5" type="button">新增</button>
        </div>
        <div class="Result">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>確認</th> <!-- 空白列 -->
                        <th>編號</th>
                        <th>問卷</th>
                        <th>狀態</th>
                        <th>開始時間</th>
                        <th>結束時間</th>
                        <th>觀看統計</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- 使用子元件並傳遞相關資料 -->
                    <Result v-for="property in items.list" @f-change="getId" v-bind:key="property"
                        v-bind:property="property" />
                </tbody>

            </table>
        </div>
        <pagination :contentCount="contentCount" :itemsPerPage="itemsPerPage" @page-changed="handlePageChanged"
            class="mx-auto page"></pagination>


    </div>
</template>
<style lang="scss" scoped>
.mid {
    text-align: center;
}

.page {
    margin-top: 200px;

}

.Result {
    justify-content: space-around;
    text-align: center;
    overflow: auto;
    margin-bottom: -200px;
    padding-top: 5px;

    /* 自定義高度，根據需要調整 */
}
</style>