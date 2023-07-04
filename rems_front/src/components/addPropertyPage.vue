<script>
// import SearchBar from "../components/SearchBar.vue";
import ModalView from "../components/ModalView.vue";

export default {
    components: {
        // SearchBar,
        ModalView
    },
    
    data() {
        return {
            modalShow: false,
            selectedOption:'',
            response:[]
        }
    },
    methods: {
        
        // handleSelection(event) {
        //     this.selectedOption = event.target.value;
        // },
        switchModal(){
            this.modalShow = !this.modalShow;
        },
        switchModal2() {
            this.modalShow = !this.modalShow;

            const body = {
                //進入頁面要帶的值1715
        "propertyId":1715,
        "landlordId": 2,
        "prefecture": this.prefecture,
        "district":  this.district,
        "address": this.address,
        "propertyName":this.propertyName,
        "rentalStatus":this.rentalStatus,
        "type": this.selectedOptionType,
        "layout": this.selectedOptionLayout,
        "propertyFloors": this.propertyFloors,
        "floorNumber": this.floorNumber,
        "buildYear": this.buildYear,
        "exclusiveArea":this.exclusiveArea,
        "rentalPrice": this.rentalPrice,
        "keyMoney": this.keyMoney,
        "deposit": this.deposit,
        "imageBytesString":this.imageBytesString,
        "remarks": this.remarks
}

            fetch("http://localhost:8080/add_property",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(body)
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            this.response = data;
            console.log(this.response.message);

            alert('新增物件：' + this.response.message);

            if(this.response.message === 'successful' ){
                this.prefecture = "",
                this.district = "",
                this.address = "",
                this.propertyName = "",
                this.rentalStatus = "",
                this.selectedOptionType = "",
                this.selectedOptionLayout = "",
                this.propertyFloors = "",
                this.floorNumber = "",
                this.buildYear = "",
                this.exclusiveArea = "",
                this.rentalPrice = "",
                this.keyMoney = "",
                this.deposit = "",
                this.imageBytesString = "",
                this.remarks = ""

                    }
        }.bind(this))

        
        .catch(err =>console.log(err))
        }
        
        
    }
}
</script>

<template>
    <div>
        <button @click="switchModal">Open Modal</button>
        <ModalView v-if="modalShow" :title="'物件追加'" @close="switchModal">

            <div class="ccc2">

                    <div class="ccc">
                        <div class="aaa">
                            <div class="bbb1">
                                <p>物件名</p>
                                <p>都道府県</p>
                                <p>地域</p>
                                <p>住所</p>
                                <p>賃貸狀況</p>
                                <p>賃料</p>
                                <p>禮金</p>
                                <p>敷金</p>
                                <p>上傳圖片</p>
                            </div>
                        <div class="bbb2">
                            <div><input type="text" v-model="propertyName"></div>
                            <div><input type="text" v-model="prefecture"></div>
                            <div><input type="text" v-model="district"></div>
                            <div> <input type="text" v-model="address"></div>
                            <div class="yes">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="true" v-model="rentalStatus">
                                    <label class="form-check-label" for="inlineRadio1" >已出租</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="false" v-model="rentalStatus">
                                    <label class="form-check-label" for="inlineRadio2">未出租</label>
                                </div>
                            </div>
                            <div><input type="number" v-model="rentalPrice"></div>
                            <div><input type="number" v-model="keyMoney"></div>
                            <div><input type="number" v-model="deposit"></div>

                            <!-- 圖片的格式先用text 如果改成url格式好像有問題 -->
                            <div><input type="text" v-model="imageBytesString"></div>
                        </div>
                    </div>
                    <div class="aaa">
                        <div class="bbb1">
                            <p>賃主姓</p>
                            <p>賃主名</p>
                            <p>物件種目</p>
                            <p>間取り</p>
                            <p>建物階層數</p>
                            <p>所在層</p>
                            <p>築年數</p>
                            <p>專有面積</p>
                            <p>備考</p>
                        </div>
                        <div class="bbb2">
                            <p>賃主姓</p>
                            <p>賃主名</p>
                            <div class="box">
                                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedOptionType">
                                    <option selected>種目</option>
                                    <option value="0">アパート</option>
                                    <option value="1">マンション</option>
                                    <option value="2">一戶建て</option>
                                </select>
                            </div>
                            <div class="box">
                                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedOptionLayout">
                                    <option selected>間取り</option>
                                    <option value="0">ワンルーム</option>
                                    <option value="1">1K</option>
                                    <option value="2">1DK</option>
                                    <option value="3">1LDK</option>
                                    <option value="4">2K</option>
                                    <option value="5">2DK</option>
                                    <option value="6">2LDK</option>
                                    <option value="7">3K</option>
                                    <option value="8">3DK</option>
                                    <option value="9">3LDK</option>
                                    <option value="10">4R</option>
                                </select>
                            </div>
                            <div><input type="number" v-model="propertyFloors"></div>
                            <div><input type="number" v-model="floorNumber"></div>
                            <div><input type="number" v-model="buildYear"></div>
                            <div><input type="number" v-model="exclusiveArea"></div>
                            <div><input type="text" v-model="remarks"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <button v-if="btnShow" class="btn btn-primary mb-4" @click="changeShow">更新資料</button> -->
            <button class="btn btn-primary mb-4" @click="switchModal2">新增物件資料</button>
            
        </ModalView>
    </div>
</template>

<style lang="scss" scoped>
.ccc2{
    p{
        font-size: 14px;
        margin-bottom: 18px;
    }
    // margin-top: 20px;
    .ccc{
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 2px solid #B8D26E;
        display: flex;
        justify-content: space-between;
        // position: relative;
        // left: 20%;
        width: 60vw;
        .aaa{
            margin-top: 20px;
            width: 50%;
            display: flex;
            // justify-content: space-between;
            .bbb1{
                width: 20%;
                text-align: center;
                white-space:nowrap;
            }
            .bbb2{
                width: 80%;
                text-align: center;
                input{
                    // width: 90%;
                    margin-bottom: 9px;
                    // height: 20px;
                }
                .box{
                    margin: 0 auto;
                    width: 200px;
                    margin-bottom: 8px;
                }
            }            
        }
    }
}
.btn{
    width: 30vw;
    // display: flex;
    margin: 0 auto;
    text-align: center;
    align-items: center;
    
}
</style>