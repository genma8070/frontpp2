<script>
import SearchBar from "../components/SearchBar.vue";
import addContrcat from "../components/NewContract.vue";
import PropertySearch from "../components/PropertySearch.vue"
import FackCView from "../views/FackContract.vue"

import Child from "../components/PropertiesChild.vue";

export default {
    components: {
        SearchBar,
        addContrcat,
        PropertySearch,
        FackCView,
        Child

    },
    data() {
        return {
            getData: "",
            subModalShow: false,
            modalShow: false,
            searchModalShow: false,
            propertyData: [
            ],
            startObject: null,
            year: null,
            month: null,
            day: null,
            fName: '',
            lName: '',
            fullName: '',
            fLName: '',
            lLName: '',
            fullLName: ''

        }
    },
    methods: {
        getInfo(res) {
            let body = {
                "propertyName": res.keyWord
            }

            fetch("http://localhost:8080/get_property_by_property_name", {
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
                    this.propertyData = data;
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        switchSubModal() {
            this.subModalShow = !this.subModalShow;
        },
        switchModal() {
            this.modalShow = !this.modalShow;
        },
        handleButtonClick(value) {
            this.getData = value;
            let body = {

                "landlord_id": this.getData.landlordId
            }

            fetch("http://localhost:8080/get_Landlord", {
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
                    this.fLName = data.landlordList[0].firstName
                    this.lLName = data.landlordList[0].lastName
                    this.fullLName = this.formatName(this.fLName, this.lLName);
                })
                .catch(function (error) {
                    console.log(error)
                })


        },
        formatDate(year, month, day) {
            // 將年、月、日轉換為YYYY-MM-DD的日期格式
            return `${year}-${this.padNumber(month)}-${this.padNumber(day)}`;
        },
        padNumber(number) {
            // 將數字補零成兩位數字的字串
            return String(number).padStart(2, '0');
        },
        newContract() {
            this.getData = "";
            this.$emit('new');
        },
        switchAndClear() {
            this.newContract();
            this.switchModal();
            this.fullName = this.formatName(this.fName, this.lName)
        },
        formatName(fName, lName) {
            return `${fName}${" "}${lName}`;
        },
        formatLName(fLName, lLName) {
            return `${fLName}${" "}${lLName}`;
        },
        sendData() {
            const params = {
                propertyName: this.getData.propertyName,
                fullLName: this.fullLName,
                fullName: this.fullName,
                keyMoney: this.getData.keyMoney,
                deposit: this.getData.deposit,
                rentalPrice: this.getData.rentalPrice,
                startDate: this.startDate,
                endDate: this.endDate

            };

            this.$router.push({
                name: 'keiyaku', // 目标页面的路由名称
                query: params // 要传递的参数对象
            });
        },


        jumpPage() {
            this.switchModal();
            this.sendData();
        },

    },


}

</script>
<template>
    <div>

        <div class="field">
            <div>
                <h1 style="width: 615px; border:0;
        border-bottom: 1px;
        border-color: rgb(100, 165, 3);
        border-style: solid;">貸主情報</h1>
            </div>
            <div>
                <div class="flex">
                    <p class="pHead">姓</p>
                    <p class="pDot">:</p>
                    <input v-model="fName" type="text" class="twiInput">
                    <p style="height: 20px;"></p>
                    <p class="pFooter">名</p>
                    <p class="pDot2">:</p>
                    <input v-model="lName" type="text" class="twiInput2">
                </div>
                <div class="flex">
                    <p class="pHead">セイ</p>
                    <p class="pDot">:</p>
                    <input type="text" class="twiInput">
                    <p style="height: 20px;"></p>
                    <p class="pFooter">メイ</p>
                    <p class="pDot2">:</p>
                    <input type="text" class="twiInput2">
                </div>
                <div class="flex">
                    <p class="pHead">生年月日</p>
                    <p class="pDot">:</p>
                    <input type="date" class="twiInput">
                    <p style="height: 20px;"></p>
                    <p class="pFooter">電話番号</p>
                    <p class="pDot2">:</p>
                    <input type="number" class="twiInput2">
                </div>
                <div class="flex">
                    <p class="pHead">マイナンバー</p>
                    <p class="pDot">:</p>
                    <input type="number" class="twiInput">
                    <p style="height: 20px;"></p>
                    <p class="pFooter">免許番号</p>
                    <p class="pDot2">:</p>
                    <input type="number" class="twiInput2">
                </div>
                <div class="flex">
                    <p class="pHead">住所</p>
                    <p class="pDot">:</p>
                    <p style="height: 20px;"></p>
                    <input type="text" class="soloInput">
                </div>
                <div class="flex">
                    <p class="pHead">email</p>
                    <p class="pDot">:</p>
                    <p style="height: 20px;"></p>
                    <input type="email" class="soloInput">
                </div>
                <div class="flex">
                    <p class="pHead">支払方法</p>
                    <p class="pDot">:</p>
                    <input type="text" class="twiInput">
                    <p style="height: 20px;"></p>
                    <p class="pFooter">口座番号</p>
                    <p class="pDot2">:</p>
                    <input type="number" class="twiInput2">
                </div>
                <div class="flex" style="width: 615px;">
                    <button type="button" class="btnL">情 報 確 認</button>
                    <p style="height: 20px;"></p>
                    <button @click="switchAndClear" type="button" class="btnR">物 件 追 加</button>
                </div>
                <div>
                    <h1 style="width: 615px; border:0;
        border-bottom: 1px;
        border-color: rgb(100, 165, 3);
        border-style: solid;">物件リスト</h1>
                </div>
                <div class="flex">
                    <!-- 追加 -->
                    <p style="height: 20px;"></p>
                    <p class="pHead">圖案</p>
                    <p class="pDot">物件名</p>

                    <div class="a"><a href="">123</a></div>
                </div>
            </div>


        </div>
        <!-- <button @click="switchAndClear" type="button">addcontract</button> -->
        <addContrcat v-if="modalShow" :title="'契 約 追 加'" @close="switchModal">
            <div class="addContract">
                <dl class="row d-flex justify-content-center">
                    <dt class="col-sm-2 text-primary">物件名</dt>
                    <dt class="col-sm-1 text-primary">：</dt>
                    <dt class="col-sm-6">
                        <input v-bind:value="getData.propertyName" type="text" aria-describedby="inputGroup-sizing-sm"
                            class="form-control">
                    </dt>
                    <dt @click="switchSubModal" style="position: absolute; top: 98px; left: 56vw;"><button
                            type="button">検索</button></dt>
                </dl>
                <dl class="row d-flex justify-content-center">
                    <dt class="col-sm-2 text-primary">貸主名</dt>
                    <dt class="col-sm-1 text-primary">：</dt>
                    <dt class="col-sm-6">
                        <input v-bind:value="fullLName" type="text" aria-describedby="inputGroup-sizing-sm"
                            class="form-control">
                    </dt>
                </dl>
                <dl class="row d-flex justify-content-center">
                    <dt class="col-sm-2 text-primary">借主名</dt>
                    <dt class="col-sm-1 text-primary">：</dt>
                    <dt class="col-sm-6"><input v-bind:value="fullName" type="text" aria-describedby="inputGroup-sizing-sm"
                            class="form-control"></dt>
                </dl>
                <dl class="row d-flex justify-content-center">
                    <dt class="col-sm-2 text-primary">礼金</dt>
                    <dt class="col-sm-1 text-primary">：</dt>
                    <dt class="col-sm-6"><input v-bind:value="getData.keyMoney" type="number"
                            aria-describedby="inputGroup-sizing-sm" class="form-control"></dt>
                </dl>
                <dl class="row d-flex justify-content-center ">
                    <dt class="col-sm-2 text-primary">敷金</dt>
                    <dt class="col-sm-1 text-primary">：</dt>
                    <dt class="col-sm-6"><input v-bind:value="getData.deposit" type="number"
                            aria-describedby="inputGroup-sizing-sm" class="form-control"></dt>
                </dl>
                <dl class="row d-flex justify-content-center ">
                    <dt class="col-sm-2 text-primary">賃料</dt>
                    <dt class="col-sm-1 text-primary">：</dt>
                    <dt class="col-sm-6"><input v-bind:value="getData.rentalPrice" type="number"
                            aria-describedby="inputGroup-sizing-sm" class="form-control"></dt>
                </dl>
                <dl class="row d-flex justify-content-center ">
                    <dt class="col-sm-2 text-primary">契約開始日</dt>
                    <dt class="col-sm-1 text-primary">：</dt>
                    <dt class="col-sm-6">
                        <input v-model="startDate" type="date" aria-describedby="inputGroup-sizing-sm" class="form-control">
                    </dt>
                </dl>
                <dl class="row d-flex justify-content-center ">
                    <dt class="col-sm-2 text-primary">期限</dt>
                    <dt class="col-sm-1 text-primary">：</dt>
                    <dt class="col-sm-6"><input v-model="endDate" type="date" aria-describedby="inputGroup-sizing-sm"
                            class="form-control">
                    </dt>
                </dl>
                <div class="d-flex justify-content-center">
                    <button @click="jumpPage" type="button" class="btn btn-primary px-5">確認</button>
                </div>
            </div>
            <PropertySearch v-if="subModalShow" :title="'查詢物件'" @close="switchSubModal">
                <div class="addContract">
                    <div></div>
                    <SearchBar :conditionList="['物件', '借主', '契約コード']" @searchResponse="getInfo" />

                    <div class="list">
                        <div class="addContract">
                            <Child @click="switchSubModal" @button-click="handleButtonClick"
                                v-for="property in propertyData.propertyList" v-bind:key="property.property_id"
                                v-bind:property="property" />

                        </div>

                    </div>
                </div>
            </PropertySearch>

        </addContrcat>
    </div>
</template>
<style lang="scss" scoped>
.addContract {
    width: 60vw;
    height: 80vh;

    .list {
        margin-top: 15%;
        justify-content: center;
        text-align: center;
        width: 50vw;
        height: 70vh;
    }
}

.field {

    margin-left: 24vw;
    margin-right: 24vw;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    position: relative;

    .flex {
        text-align: center;
        justify-content: center;
        display: flex;

        .btnL {
            width: 150px;
            height: 40px;
            font-size: large;
            position: absolute;
            left: 12px;
            color: white;
            border-radius: 10px;
            background-color: #0e4e8a;
        }

        .btnR {
            width: 150px;
            height: 40px;
            font-size: large;
            position: absolute;
            left: 455px;
            color: white;
            border-radius: 10px;
            background-color: rgb(100, 165, 3);
        }
    }

    .pHead {
        position: absolute;
        left: 0;
    }

    .pFooter {
        position: absolute;
        left: 345px;
    }

    .pDot {
        position: absolute;
        left: 100px;
    }

    .pDot2 {
        position: absolute;
        left: 445px;

    }

    .twiInput {
        position: absolute;
        left: 120px;
        height: 25px;
        width: 150px;
        border: 0;
        border-bottom: 1px;
        border-color: rgb(100, 165, 3);
        border-style: solid;
    }

    .twiInput2 {
        position: absolute;
        left: 465px;
        height: 25px;
        width: 150px;
        border: 0;
        border-bottom: 1px;
        border-color: rgb(100, 165, 3);
        border-style: solid;
    }

    .a {
        position: absolute;
        left: 465px;
        height: 25px;
        width: 150px;
    }

    .soloInput {
        position: absolute;
        left: 120px;
        height: 25px;
        width: 495px;
        border: 0;
        border-bottom: 1px;
        border-color: rgb(100, 165, 3);
        border-style: solid;
    }


}
</style>