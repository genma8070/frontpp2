<script>
import Pagination from '../components/Pagination.vue';
import Result from '../components/MenberList.vue';
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
            position: "",
            password: ""


        }
    },
    methods: {
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

            fetch("http://localhost:8080/find_all_user", {
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
                    fetch("http://localhost:8080/find_pag_user", {
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
        getInfo(value) {
            this.title = value.account
            this.password = value.password
            this.position = value.position
            console.log(value)
        },
        edit() {
            let body = {
                "account": this.title,
                "password": this.password,
                "position": this.position
            }
            console.log(this.position)

            fetch("http://localhost:8080/change_position", {
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
                    const userConfirmed = window.confirm("您確定要變動該名會員的權限嗎?");

                    if (userConfirmed) {
                        window.alert(data.message)
                        this.find()
                    } else {
                        return;
                    }

                })
                .catch(function (error) {
                    console.log(error)
                })


        },


    },
    mounted() {
        if (sessionStorage.getItem("position") != 0 || sessionStorage.getItem("position") == null) {
            window.alert("還想偷渡R")
            sessionStorage.clear();
            this.$router.push('/')
        }
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
                    <h4>帳號:</h4>
                    <input v-model="title" style="height: 25px; width: 338px;" class="ms-2" type="text" disabled>
                </div>
                <div class="col d-flex">
                    <h4>權限:</h4>
                    <select class="ms-2" v-model="position" style="height: 25px; width: 338px;" name="position"
                        id="position">
                        <option value="1">後台人員</option>
                        <option value="2">使用者</option>
                    </select>

                </div>
            </div>
            <div class="mt-5">
                <button @click="edit" type="button">更新</button>
            </div>
        </div>

        <div class="Result">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>選取</th> <!-- 空白列 -->
                        <th>帳號</th>
                        <th>權限</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- 使用子元件並傳遞相關資料 -->
                    <Result v-for="(property, index) in items.list" @f-change="getInfo" v-bind:key="property"
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