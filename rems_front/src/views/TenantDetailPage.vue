<script>
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import addContrcat from '../components/NewContract.vue'
import PropertySearch from '../components/PropertySearch.vue'
import Child from '../components/PropertiesChild.vue'
import ModalView from '../components/ModalView.vue'
export default {
    props: ['getTenantId'],
    components: {
        SearchBar,
        addContrcat,
        PropertySearch,
        Child,
        ModalView
    },
    data() {
        return {
            num: 0,
            endDate: null,
            modalShow: false,
            isShow: true,
            // 詳細資料
            tenantDetail: [],
            getData: '',
            subModalShow: false,
            modalShow2: false,
            searchModalShow: false,
            propertyData: [],
            startObject: null,
            year: null,
            month: null,
            day: null,
            fName: '',
            lName: '',
            fullName: '',
            fLName: '',
            lLName: '',
            fullLName: '',
            endMonth: null
        }
    },
    methods: {
        getInfo(res) {
            let body = {
                propertyName: res.keyWord
            }

            fetch('http://localhost:8080/get_property_by_property_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(function (response) {
                    return response.json()
                })
                .then((data) => {
                    this.propertyData = data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        switchSubModal() {
            this.subModalShow = !this.subModalShow
        },
        switchModal2() {
            this.modalShow2 = !this.modalShow2
        },
        handleButtonClick(value) {
            this.getData = value
            let body = {
                landlord_id: this.getData.landlordId
            }

            fetch('http://localhost:8080/get_Landlord', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(function (response) {
                    return response.json()
                })
                .then((data) => {
                    this.fLName = data.landlordList[0].firstName
                    this.lLName = data.landlordList[0].lastName
                    this.fullLName = this.formatName(this.fLName, this.lLName)
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        formatDate(year, month, day) {
            // 將年、月、日轉換為YYYY-MM-DD的日期格式
            return `${year}-${this.padNumber(month)}-${this.padNumber(day)}`
        },
        padNumber(number) {
            // 將數字補零成兩位數字的字串
            return String(number).padStart(2, '0')
        },
        newContract() {
            this.getData = ''
            this.$emit('new')
        },
        switchAndClear() {
            this.newContract()
            this.switchModal2()
            this.fullName = this.formatName(this.tenantDetail.firstName, this.tenantDetail.lastName)
        },
        formatName(fName, lName) {
            return `${fName}${" "}${lName}`
        },
        formatLName(fLName, lLName) {
            return `${fLName}${" "}${lLName}`
        },
        sendData() {
            const params = {
                propertyId: this.getData.propertyId,
                tenantId: this.tenantDetail.tenantId,
                propertyName: this.getData.propertyName,
                fullLName: this.fullLName,
                fullName: this.fullName,
                keyMoney: this.getData.keyMoney,
                deposit: this.getData.deposit,
                rentalPrice: this.getData.rentalPrice,
                startDate: this.startDate,
                endDate: this.endDate,
                start_year: this.year,
                start_month: this.month,
                start_day: this.day,
                numberMonths: this.endMonth
            }
            fetch('http://localhost:8080/getAllContracts', {})
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    console.log(data.contractResponse.length)
                    console.log(this.num)
                    this.num = data.contractResponse.length + 2
                    let body = {
                        property_id: this.getData.propertyId,
                        rental_price: this.getData.rentalPrice,
                        tenant_id: this.tenantDetail.tenantId,
                        key_money: this.getData.keyMoney,
                        deposit: this.getData.deposit,
                        start_year: this.year,
                        start_month: this.month,
                        start_day: this.day,
                        numberMonths: this.endMonth
                    }

                  
                    fetch('http://localhost:8080/AddContractAndContractDetail', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    })
                        .then(function (response) {
                            return response.json()
                        })
                        .then((data) => {
                            console.log(data)
                            this.goTarget();
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                        
                })

        },
        goTarget() {
            this.$router.push({
                name: 'keiyaku_info',
                params: { contract_id: this.num }
            })
        },

        getMonth2(endDate) {
            this.endMonth = new Date(this.endDate).getMonth() + 1
        },
        getYear(startDate) {
            this.year = new Date(this.startDate).getFullYear() 
        },
        getMonth(startDate) {
            this.month = new Date(this.startDate).getMonth() + 1
        },
        getDay(startDate) {
            this.day = new Date(this.startDate).getDay() + 1
        },

        jumpPage() {
            this.switchModal2()
            this.sendData()
            this.getMonth2(this.endDate)
            this.getDay(this.startDate)
            this.getYear(this.startDate)
            this.getMonth(this.startDate)

        },
        switchModal() {
            this.modalShow = !this.modalShow
        },
        change() {
            this.isShow = !this.isShow //F/T相反
        },
        getTenant() {
            return fetch('http://localhost:8080/findByIdGetDetilTenantInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tenantId: this.getTenantId
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    this.tenantDetail = data.tenant
                    console.log(this.tenantDetail)
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        //詳細資料更新
        upDate() {
            return fetch('http://localhost:8080/reviseTenantInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    landlord_id: this.getid,
                    first_name: this.tenantDetail.firstName,
                    first_name_kana: this.tenantDetail.firstNameKana,
                    last_name: this.tenantDetail.lastName,
                    last_name_kana: this.tenantDetail.lastNameKana,
                    mynumber: this.tenantDetail.mynumber,
                    license: this.tenantDetail.license,
                    phone: this.tenantDetail.phone,
                    email: this.tenantDetail.email,
                    birth_date: this.tenantDetail.birthDate,
                    address: this.tenantDetail.address,
                    payment: paymentMethod,
                    payment_account: this.tenantDetail.paymentAccount
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    this.landlordDe = data.landlordList
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    },
    mounted() {
        this.getTenant()
    }
}
</script>
<template>
    <div class="field">
        <div>
            <h1 style="
          width: 615px;
          border: 0;
          border-bottom: 1px;
          border-color: rgb(100, 165, 3);
          border-style: solid;
        ">
                借主情報
            </h1>
        </div>
        <div>
            <div class="flex">
                <p class="phead">姓</p>
                <p class="pdot">:</p>
                <p v-if="isShow" class="readding">{{ tenantDetail.firstName }}</p>
                <input v-else type="text" class="twiinput" v-model="tenantDetail.firstName" />
                <p style="height: 20px"></p>
                <p class="pfooter">名</p>
                <p class="pdot2">:</p>
                <p v-if="isShow" class="readding2">{{ tenantDetail.lastName }}</p>
                <input v-else type="text" class="twiinput2" v-model="tenantDetail.lastName" />
            </div>
            <div class="flex">
                <p class="phead">セイ</p>
                <p class="pdot">:</p>
                <p v-if="isShow" class="readding">{{ tenantDetail.firstNameKana }}</p>
                <input v-else type="text" class="twiinput" v-model="tenantDetail.firstNameKana" />
                <p style="height: 20px"></p>
                <p class="pfooter">メイ</p>
                <p class="pdot2">:</p>
                <p v-if="isShow" class="readding2">{{ tenantDetail.lastNameKana }}</p>
                <input v-else type="text" class="twiinput2" v-model="tenantDetail.lastNameKana" />
            </div>
            <div class="flex">
                <p class="phead">生年月日</p>
                <p class="pdot">:</p>
                <p v-if="isShow" class="readding">{{ tenantDetail.birthDate }}</p>
                <input v-else type="date" class="twiinput" v-model="tenantDetail.birthDate" />
                <p style="height: 20px"></p>
                <p class="pfooter">電話番号</p>
                <p class="pdot2">:</p>
                <p v-if="isShow" class="readding2">{{ tenantDetail.phone }}</p>
                <input v-else type="text" class="twiinput2" v-model="tenantDetail.phone" />
            </div>
            <div class="flex">
                <p class="phead">マイナンバー</p>
                <p class="pdot">:</p>
                <p v-if="isShow" class="readding">{{ tenantDetail.mynumber }}</p>
                <input v-else type="number" class="twiinput" v-model="tenantDetail.mynumber" />

                <p style="height: 20px"></p>
                <p class="pfooter">免許番号</p>
                <p class="pdot2">:</p>
                <p v-if="isShow" class="readding2">{{ tenantDetail.license }}</p>
                <input v-else type="number" class="twiinput2" v-model="tenantDetail.license" />
            </div>
            <div class="flex">
                <p class="phead">住所</p>
                <p class="pdot">:</p>
                <p style="height: 20px"></p>
                <p v-if="isShow" class="soloreadding">{{ tenantDetail.address }}</p>
                <input v-else type="text" class="soloinput" v-model="tenantDetail.address" />
            </div>
            <div class="flex">
                <p class="phead">Email</p>
                <p class="pdot">:</p>
                <p style="height: 20px;"></p>
                <p v-if="isShow" class="soloreadding">{{ tenantDetail.email }}</p>
                <input v-else type="email" class="soloinput" v-model="tenantDetail.email">
            </div>
            <div class="flex">
                <p class="phead">支払方法</p>
                <p class="pdot">:</p>
                <p v-if="isShow" class="readding">{{ tenantDetail.payment }}</p>
                <select v-else=!isShow v-model="paymentMethod" id="group" value="1" class="twiinput">
                    <!-- <option value="0">支払方法選択</option> -->
                    <option value="0">振り込み</option>
                    <option value="1">現金</option>
                </select>
                <p style="height: 20px;"></p>
                <p v-if="paymentMethod === '1'" class="pfooter">口座番号</p>
                <p v-if="paymentMethod === '1'" class="pdot2">:</p>
                <p v-if="paymentMethod === '1' && isShow" class="readding2">text</p>
                <p v-if="paymentMethod === '1' && isShow" class="readding2">text</p>
                <input v-else-if="paymentMethod === '1' && !isShow" v-model="accountNumber" type="number" class="twiinput2">
            </div>
            <div class="flex" style="width: 615px;">
                <button @click="isShow ? change() : upDate()" type="button" class="btnL"> {{ isShow ? "情 報 更新" : "情 報 確 認"
                }}</button>
                <p style="height: 20px;"></p>
                <button @click="switchAndClear" type="button" class="btnR">契 約 追 加</button>
                <addContrcat v-if="modalShow2" :title="'契 約 追 加'" @close="switchModal2">
                    <div class="addContract roll">
                        <dl class="row d-flex justify-content-center">
                            <dt class="col-sm-2 text-primary">物件名</dt>
                            <dt class="col-sm-1 text-primary">：</dt>
                            <dt class="col-sm-6">
                                <input v-bind:value="getData.propertyName" type="text"
                                    aria-describedby="inputGroup-sizing-sm" class="form-control">
                            </dt>
                            <dt @click="switchSubModal" style="position: absolute; top: 98px; left:30vw;"><button
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
                            <dt class="col-sm-6"><input v-bind:value="fullName" type="text"
                                    aria-describedby="inputGroup-sizing-sm" class="form-control"></dt>
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
                                <input v-model="startDate" type="date" aria-describedby="inputGroup-sizing-sm"
                                    class="form-control">
                            </dt>
                        </dl>
                        <dl class="row d-flex justify-content-center ">
                            <dt class="col-sm-2 text-primary">期限</dt>
                            <dt class="col-sm-1 text-primary">：</dt>
                            <dt class="col-sm-6"><input v-model="endDate" type="date"
                                    aria-describedby="inputGroup-sizing-sm" class="form-control">
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
                                <div class="addContract roll">
                                    <Child @click="switchSubModal" @button-click="handleButtonClick"
                                        v-for="property in propertyData.propertyList" v-bind:key="property.property_id"
                                        v-bind:property="property" />

                                </div>

                            </div>
                        </div>
                    </PropertySearch>
                </addContrcat>
            </div>
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
            <p class="phead">圖案</p>
            <p class="pdot">物件名</p>

            <div class="a"><a href="">123</a></div>
        </div>



    </div>
</template>
<style lang="scss" scoped>
.addContract {
    width: 70vw;
    height: 80vh;

    .list {
        margin-top: 15%;
        justify-content: center;
        text-align: center;
        width: 50vw;
        height: 70vh;

        .roll {
            overflow: scroll;
        }
    }
}


.field {
    margin: -20px 25%;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    position: relative;

    .flex {
        text-align: center;
        justify-content: center;
        display: flex;

        .btnL,
        .btnR {
            width: 150px;
            height: 40px;
            font-size: large;
            position: absolute;
            color: white;
            border-radius: 10px;
            border: 0px solid;
        }

        .btnL {
            left: 12px;
            background-color: #1962A7;
        }

        .btnR {
            left: 455px;
            background-color: #B8D26E;
        }

        .btnL:hover,
        .btnR:hover {
            opacity: 0.8;
        }

        .btnL:active,
        .btnR:active {
            opacity: 0.6;
        }
    }

    .phead {
        position: absolute;
        left: 0;
    }

    .pfooter {
        position: absolute;
        left: 345px;
    }

    .pdot {
        position: absolute;
        left: 100px;
    }

    .pdot2 {
        position: absolute;
        left: 445px;

    }

    .twiinput {
        position: absolute;
        left: 120px;
        height: 25px;
        width: 150px;
        border: 0;
        border-bottom: 1px;
        border-color: rgb(100, 165, 3);
        border-style: solid;
    }

    .twiinput2 {
        position: absolute;
        left: 465px;
        height: 25px;
        width: 150px;
        border: 0;
        border-bottom: 1px;
        border-color: rgb(100, 165, 3);
        border-style: solid;
    }

    .readding {
        position: absolute;
        left: 120px;
        height: 25px;
        width: 150px;
        border: 0;
        border-bottom: 1px;
        border-color: rgb(100, 165, 3);
        border-style: solid;
    }

    .readding2 {
        position: absolute;
        left: 465px;
        height: 25px;
        width: 150px;
        border: 0;
        border-bottom: 1px;
        border-color: rgb(100, 165, 3);
        border-style: solid;
    }

    .soloreadding {
        position: absolute;
        left: 120px;
        height: 25px;
        width: 495px;
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

    .soloinput {
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

.twiinput::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 1px;
    background-color: rgb(100, 165, 3);
}
</style>