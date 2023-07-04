<script>
import { RouterLink, RouterView } from 'vue-router'
import ModalView from "../components/ModalView.vue";
export default {
    props: [
        "getLandlordId"
    ],
    components: {
        ModalView
    },
    data() {
        return {
            modalShow: false,
            isShow: true,
            landlordDetail: [],
            paymentMethod: 0, // 預設支付方式為振り込み
            accountNumber: ""
        }
    },
    methods: {
        switchModal() {
            this.modalShow = !this.modalShow;
        },
        change() {
            this.isShow = !this.isShow; //F/T相反
        },
        getLandlord(){        
            return fetch('http://localhost:8080/get_Landlord', {

            method: 'POST',
            headers: {
            'Content-Type': 'application/json'       
            },
            body: JSON.stringify({
                "landlord_id":this.getLandlordId
            })
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.landlordDetail=data.landlordList[0];
                console.log(this.landlordDetail.firstName);                        
                })
            .catch((error) => {
                console.error(error);
            })
        },
        //詳細資料更新
        upDate() {
            console.log(this.landlordDetail.firstName);
            return fetch('http://localhost:8080/update_Landlord', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'       
                },
                body: JSON.stringify({
                    "landlord_id":this.getLandlordId,
                    "first_name":this.landlordDetail.firstName,
                    "first_name_kana":this.landlordDetail.firstNameKana,
                    "last_name":this.landlordDetail.lastName,
                    "last_name_kana":this.landlordDetail.lastNameKana,
                    "mynumber":this.landlordDetail.myNumber,
                    "license":this.landlordDetail.license,
                    "phone":this.landlordDetail.phone,
                    "email":this.landlordDetail.email,
                    "birth_date":this.landlordDetail.birthDate,
                    "address":this.landlordDetail.address,
                    "payment":this.landlordDetail.payment,
                    "payment_account":this.landlordDetail.paymentAccount
                })
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.landlordDe = data.landlordList;
                                            
                    })
                .catch((error) => {
                    console.error(error);
                })
        },
    },
    mounted(){
        this.getLandlord()
    }
}
</script>
<template>
    <div class="field">
        <div>
            <h1 style="width: 615px; border:0;
        border-bottom: 1px;
        border-color: rgb(100, 165, 3);
        border-style: solid;">貸主情報</h1>
        </div>
        <div>
            <div class="flex">
                <p class="phead">姓</p>
                <p class="pdot">:</p>
                <p v-if="isShow" class="readding">{{landlordDetail.firstName }}</p>
                <input v-else type="text" class="twiinput" v-model="landlordDetail.firstName">
                <p style="height: 20px;"></p>
                <p class="pfooter">名</p>
                <p class="pdot2">:</p>
                <p v-if="isShow" class="readding2">{{landlordDetail.lastName }}</p>
                <input v-else type="text" class="twiinput2" v-model="landlordDetail.lastName" >
            </div>
            <div class="flex">
                <p class="phead">セイ</p>
                <p class="pdot">:</p>
                <p v-if="isShow" class="readding">{{landlordDetail.firstNameKana }}</p>
                <input v-else type="text" class="twiinput" v-model="landlordDetail.firstNameKana">
                <p style="height: 20px;"></p>
                <p class="pfooter">メイ</p>
                <p class="pdot2">:</p>
                <p v-if="isShow" class="readding2">{{landlordDetail.lastNameKana }}</p>
                <input v-else type="text" class="twiinput2" v-model="landlordDetail.lastNameKana">
            </div>
            <div class="flex">
                <p class="phead">生年月日</p>
                <p class="pdot">:</p>
                <p v-if="isShow" class="readding">{{landlordDetail.birthDate }}</p>
                <input v-else type="date" class="twiinput" v-model="landlordDetail.birthDate">
                <p style="height: 20px;"></p>
                <p class="pfooter">電話番号</p>
                <p class="pdot2">:</p>
                <p v-if="isShow" class="readding2">{{landlordDetail.phone }}</p>
                <input v-else type="text" class="twiinput2" v-model="landlordDetail.phone">
            </div>
            <div class="flex">
                <p class="phead">マイナンバー</p>
                <p class="pdot">:</p>
                <p v-if="isShow" class="readding">{{landlordDetail.myNumber }}</p>
                <input v-else type="number" class="twiinput" v-model="landlordDetail.myNumber">

                <p style="height: 20px;"></p>
                <p class="pfooter">免許番号</p>
                <p class="pdot2">:</p>
                <p v-if="isShow" class="readding2">{{landlordDetail.license }}</p>
                <input v-else type="number" class="twiinput2" v-model="landlordDetail.license">
            </div>
            <div class="flex">
                <p class="phead">住所</p>
                <p class="pdot">:</p>
                <p style="height: 20px;"></p>
                <p v-if="isShow" class="soloreadding">{{ landlordDetail.address }}</p>
                <input v-else type="text" class="soloinput" v-model="landlordDetail.address">
            </div>
            <div class="flex">
                <p class="phead">Email</p>
                <p class="pdot">:</p>
                <p style="height: 20px;"></p>
                <p v-if="isShow" class="soloreadding">{{ landlordDetail.email }}</p>
                <input v-else type="email" class="soloinput" v-model="landlordDetail.email">
            </div>
            <div class="flex">
                <p class="phead">支払方法</p>
                <p class="pdot">:</p>
                <p v-if="isShow" class="readding">{{landlordDetail.payment }}</p>
                <select v-else =!isShow v-model="paymentMethod" id="group" value="1" class="twiinput">
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
                 <button @click="isShow ? change() : upDate()" type="button" class="btnL"> {{ isShow ? "情 報 更 新" : "情 報 確 認" }}</button>
                <p style="height: 20px;"></p>
                <button type="button" class="btnR">物 件 追 加</button>
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


    </div>
</template>
<style lang="scss" scoped>
.field {
    margin: -20px 25% ;
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

        .btnL {
            width: 150px;
            height: 40px;
            font-size: large;
            position: absolute;
            left: 12px;
            color: white;
            border-radius: 10px;
            background-color: #0e4e8a;
            border: 0px solid #0e4e8a
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
            border: 0px solid rgb(100, 165, 3);
        }
    }



    .phead {
        position: absolute;
        left: 0;
    }

    .pfooter {
        position: absolute;
        left: 345px;
        white-space: nowrap;


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