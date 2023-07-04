<script>
export default {
    // 請帶入搜尋條件陣列，名稱: searchCondition ，下拉選單會自動帶入
    props: ["searchCondition"],
    data() {
        return {
            placeholderString: null,
            selectedValue: "",
            searchValue: "",
            propertySearch: []
        }
    },
    methods: {
        selectValue(value) {
            this.selectedValue = value; // 更新選中的值
            console.log(this.selectedValue);
        }, search() {
            // 根據選中的值執行相應的 API 呼叫
            switch (this.selectedValue) {
                case "物件":
                    this.searchPropertyName(this.searchValue);
                    break;
                case "貸主":
                    this.searchLandlordName(this.searchValue);
                    break;
                case "借主":
                    this.searchTenantName(this.searchValue);
                    break;
                case "契約コード":
                    this.searchContractId(this.searchValue);
                    break;
                default:
                    break;
                }
        }, searchPropertyName(value) {
            const body = {
                "propertyName": value
            }
            fetch("http://localhost:8080/get_property_by_property_name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then((response) => {

                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    this.propertySearch = data.propertyList;
                    
                })
        },
        searchLandlordName(value) {
            const body = {
                "landlordName": value
            }
            fetch("http://localhost:8080/get_property_by_landlord_name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then((response) => {

                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    this.propertySearch = data.propertyList;
                })
        },
        searchTenantName(value) {
            const body = {
                "tenantName": value
            }
            fetch("http://localhost:8080/get_property_by_tenant_name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then((response) => {

                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    this.propertySearch = data.propertyList;
                })
        },
        searchContractId(value) {
            const body = {
                "contractId": value
            }
            fetch("http://localhost:8080/get_property_by_contract_id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then((response) => {

                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    this.propertySearch = data.propertyList;                 
                })
        },
    },
    mounted() {
        // 組搜索欄位 placeholder 字串
        this.placeholderString = this.searchCondition.map(item => {
            if (item === this.searchCondition[this.searchCondition.length - 1]) {
                return item
            }
            return item + " / "
        }).join("")
        this.selectedValue = this.searchCondition[0];
    }
}
</script>
<template>
    <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="searchValue" :placeholder="placeholderString"
            aria-label="Recipient's username" aria-describedby="button-addon2">

        <!-- 下拉選單區 -->
        <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">{{ selectedValue }}</button>
        <ul class="dropdown-menu dropdown-menu-end">
            <li v-for="item in searchCondition" :key="item"><a class="dropdown-item" href="#" @click="selectValue(item)">{{
                item }}</a></li>
        </ul>
        <!-- 下拉選單區 -->

        <button class="btn btn-primary px-5" type="button" id="button-addon2" @click="search">検索</button>
    </div>
</template>
