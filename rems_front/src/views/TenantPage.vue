<script >
import SearchBar from "../components/TenantSearchBar.vue";
import ModalView from "../components/ModalView.vue";
import TenantInfo from "../components/TenantInfo.vue";

export default {
    components: {
        SearchBar,
        ModalView,
        TenantInfo
    },
    data() {
        return {
                     modalShow: false,
                    first_name:"",
                    first_name_kana:"",
                    last_name:"",
                    last_name_kana:"",
                    mynumber:"",
                    license:"",
                    phone:"",
                    email:"",
                    birth_date:"",
                    address:"",
                    payment:"",
                    payment_account:"",
                    result:[],
                    showresult:[]
        }
    },
    methods: {
        switchModal() {
            this.modalShow = !this.modalShow;
        },
        //新增房東
        addTenantInfo() {
         fetch('http://localhost:8080/addTenantInfo', {

                method: 'POST',
                headers: {
                'Content-Type': 'application/json'       
                },
                body: JSON.stringify({
                    "firstName":this.first_name,
                    "firstNameKana":this.first_name_kana,
                    "lastName":this.last_name,
                    "lastNameKana":this.last_name_kana,
                    "mynumber":this.mynumber,
                    "license":this.license,
                    "phone":this.phone,
                    "email":this.email,
                    "birthDate":this.birth_date,
                    "address":this.address,
                    "payment":this.payment,
                    "paymentAccount":this.payment_account
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.message = data;
                    this.first_name=null,
                    this.first_name_kana=null,
                    this.last_name=null,
                    this.last_name_kana=null,
                    this.mynumber=null,
                    this.license=null,
                    this.phone=null,
                    this.email=null,
                    this.birth_date=null,
                    this.address=null,
                    this.payment=null,
                    this.payment_account=null
                    })
                .catch((error) => {
                    console.error(error);
                })

                    
        },
        catchsearchbar(resultArr){            
                this.result=resultArr
                console.log(this.result);
                
        }
        
    }
}
</script>

<template>
    <div class="bodyArea">
        <SearchBar :searchCondition="['借主姓名', '借主電話番号']" class="SearchBar" @emitPush="catchsearchbar"/>

        <button @click="switchModal" class="tenantAddBtn">借主追加</button>

        <TenantInfo :tenantSearchResult=result />

        <ModalView v-if="modalShow" :title="'借主追加'" @close="switchModal" class="modalArea">
            <div class="field">
                <div class="flex">
                    <p class="phead">姓</p>
                    <p class="pdot">:</p>
                    <input type="text" class="twiinput">
                    <p style="height: 20px;"></p>
                    <p class="pfooter">名</p>
                    <p class="pdot2">:</p>
                    <input type="text" class="twiinput2">
                </div>
                <div class="flex">
                    <p class="phead">セイ</p>
                    <p class="pdot">:</p>
                    <input type="text" class="twiinput">
                    <p style="height: 20px;"></p>
                    <p class="pfooter">メイ</p>
                    <p class="pdot2">:</p>
                    <input type="text" class="twiinput2">
                </div>
                <div class="flex">
                    <p class="phead">生年月日</p>
                    <p class="pdot">:</p>
                    <input type="date" class="twiinput">
                    <p style="height: 20px;"></p>
                    <p class="pfooter">電話番号</p>
                    <p class="pdot2">:</p>
                    <input type="number" class="twiinput2">
                </div>
                <div class="flex">
                    <p class="phead">マイナンバー</p>
                    <p class="pdot">:</p>
                    <input type="number" class="twiinput">
                    <p style="height: 20px;"></p>
                    <p class="pfooter">免許番号</p>
                    <p class="pdot2">:</p>
                    <input type="number" class="twiinput2">
                </div>
                <div class="flex">
                    <p class="phead">住所</p>
                    <p class="pdot">:</p>
                    <p style="height: 20px;"></p>
                    <input type="text" class="soloinput">
                </div>
                <div class="flex">
                    <p class="phead">Email</p>
                    <p class="pdot">:</p>
                    <p style="height: 20px;"></p>
                    <input type="email" class="soloinput">
                </div>
                <div class="flex">
                    <p class="phead">支払方法</p>
                    <p class="pdot">:</p>
                    <input type="text" class="twiinput">
                    <p style="height: 20px;"></p>
                    <p class="pfooter">口座番号</p>
                    <p class="pdot2">:</p>
                    <input type="number" class="twiinput2">
                </div>
                <button type="button" class="confirmToAddBtn" @click="addTenantInfo">追加</button>
            </div>
        </ModalView>
    </div>
</template>

<style lang="scss" scoped>
.bodyArea {
    // margin: 20px 300px 20px 300px;
    width: 800px;
    margin: 0 auto;
}

.modalArea{
    width: 100%;
}

.field {
    // margin-left: 24vw;
    // margin-right: 24vw;
    width: 50vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    position: relative;

    .flex {
        text-align: center;
        justify-content: center;
        display: flex;
    }
}

.tenantAddBtn {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    padding: 9px 21px;
    border: 0px solid #45ab71;
    border-radius: 9px;
    background: #45ab71;
    color: #ffffff;
    text-decoration: none;
}

.confirmToAddBtn {
    width: 10vw;
    position: absolute;
    left: 260px;
    top: 300px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    padding: 9px 21px;
    border: 0px solid #692bff;
    border-radius: 9px;
    background: #692bff;
    color: #ffffff;
    text-decoration: none;
}

.SearchBar {
    margin: 1rem;
    width: 50vw;
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
</style>