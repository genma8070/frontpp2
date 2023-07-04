<script>
import detail  from "../components/TenantInfo.vue"
export default {
    // 請帶入搜尋條件陣列，名稱: searchCondition ，下拉選單會自動帶入
    props: [
        "searchCondition",
        
],
    components: {
        detail
    },
    data() {
        return {
            placeholderString : null,
            search:"",
            result:[],
            textAAA:123
        }
    },
    methods:{
        // 搜尋
        search_Landlord(){
            let textAAA=123
            let resultArr=[]
            console.log(this.search)
             fetch('http://localhost:8080/search_Landlord', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'       
                },
                body: JSON.stringify({
                    "search":this.search,                  
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);                                    
                    resultArr = data.landlordList; 
                    console.log(resultArr)
                    this.$emit("emitPush",resultArr)                      
                    })
                .catch((error) => {
                    console.error(error);
                })
        },
       

    },
    mounted() {
        // 組搜索欄位 placeholder 字串
        this.placeholderString  = this.searchCondition.map(item => {
            if(item === this.searchCondition[this.searchCondition.length - 1]) {
                return item
            }

            return item + " / "
        }).join("")

        
    }
}
</script>
<template>
        <div class="input-group mb-3">
            <input type="text" class="form-control" :placeholder="placeholderString" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="search">

            <!-- 下拉選單區 -->
            <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ searchCondition[0] }}</button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li v-for="list in searchCondition"><a class="dropdown-item" href="#">{{ list }}</a></li>
            </ul>
            <!-- 下拉選單區 -->

            <button class="btn btn-primary px-5" type="button" id="button-addon2" @click="search_Landlord">検索</button>
        </div>
</template>
<style>
</style>