<script>
export default {
    // 1. 請帶入搜尋條件陣列，名稱: conditionList ，下拉選單會自動帶入
    // 2. 請@searchResponse，會回傳一個物件，包含搜索條件跟搜尋關鍵字
    // 範例 <SearchBar :conditionList="['物件','借主', '契約コード']" @searchResponse="getInfo">
    props: ["conditionList"],
    data() {
        return {
            placeholderString : null,
            
            // 回傳的物件格式
            searchCondition: {
                condition: this.conditionList[0],
                keyWord: ""
            }
        }
    },
    methods: {
        switchCondition(item) {
            this.searchCondition.condition = item;
            console.log(this.searchCondition.condition);
        },
        returnCondition() {
            this.$emit("searchResponse", this.searchCondition)
        }
    },
    mounted() {
        // 組搜索欄位 placeholder 字串
        this.placeholderString  = this.conditionList.map(item => {
            if(item === this.conditionList[this.conditionList.length - 1]) {
                return item
            }

            return item + " / "
        }).join("")
    }
}
</script>
<template>
        <div class="input-group mb-3">
            <input
                type="text"
                class="form-control"
                :placeholder="placeholderString"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                v-model="searchCondition.keyWord"
            >

            <!-- 下拉選單區 -->
            <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ searchCondition.condition }}</button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li v-for="item in conditionList">
                    <a class="dropdown-item" href="#" @click="switchCondition(item)">{{ item }}</a>
                </li>
            </ul>
            <!-- 下拉選單區 -->

            <button
                class="btn btn-primary px-5"
                type="button"
                id="button-addon2"
                @click="returnCondition"
            >
                検索
            </button>
        </div>
</template>
<style lang="scss" scoped>
.input-group{
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50% , -50%);
    width: 70vw;
}
</style>