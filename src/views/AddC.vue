<script>
import Pagination from '../components/Pagination.vue';
import FeedBack from '../components/AnsFeedBack.vue';
import EditView from "../views/Edit.vue";
export default {
    components: {
        Pagination,
        FeedBack,
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
       
        handlePageChanged(page) {
            // 處理分頁切換的邏輯

            this.currentPage = page;
            this.find()
            // 更新相應的內容
        },
      
        find() {
            let body = {
                "index": (this.currentPage - 1) * 10
            }

            fetch("http://localhost:8080/get_all_answer", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },

            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    this.contentCount = data.b.length
                    fetch("http://localhost:8080/find_all_answer", {
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
            <div class="row d-flex flex-column mx-2 my-2">
              
                    <h4>問卷回饋</h4>
                </div>
        </div>
        
        <div class="Result">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>編號</th>
                        <th>姓名</th>
                        <th>填寫時間</th>
                        <th>觀看細節</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- 使用子元件並傳遞相關資料 -->
                    <FeedBack v-for="(property, index) in items.b" @f-change="getId" v-bind:key="property"
                        v-bind:property="property" v-bind:index="index" />
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