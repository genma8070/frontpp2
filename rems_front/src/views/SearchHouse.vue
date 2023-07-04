<script>
import SearchProperty from "../components/SearchProperty.vue";
import Wire from "../components/Wire.vue";
import properties from "../components/properties.vue"
export default {
    components: {
        SearchProperty,
        Wire,
        properties
    },
    data() {
        return {
            selectedOption: '2',
            prefecture: null,
            district0: null,
            district1: null,
            district2: null,
            district3: null,
            district4: null,
            district5: null,
            district6: null,
            district7: null,
            district8: null,
            highPrice: null,
            lowPrice: null,
            type0: null,
            type1: null,
            type2: null,
            layout0: null,
            layout1: null,
            layout2: null,
            layout3: null,
            layout4: null,
            layout5: null,
            layout6: null,
            layout7: null,
            layout8: null,
            layout9: null,
            layout10: null,
            layout11: null,
            layout12: null,
            layout13: null,
            keyMoney: 0,
            deposit: 0,
            propertiesList: []
        }
    },
    methods: {
        search() {
            if (this.selectedOption === '1') {
                this.getTokyo();
            } else if (this.selectedOption === '2') {
                this.getKyoto();
            }
        },
        getKyoto() {
            const body = {
                "prefecture": "京都府",
                "district0": this.district0,
                "district1": this.district1,
                "district2": this.district2,
                "district3": this.district3,
                "district4": this.district4,
                "district5": this.district5,
                "highPrice": this.highPrice,
                "lowPrice": this.lowPrice,
                "type0": this.type0,
                "type1": this.type1,
                "type2": this.type2,
                "layout0": this.layout0,
                "layout1": this.layout1,
                "layout2": this.layout2,
                "layout3": this.layout3,
                "layout4": this.layout4,
                "layout5": this.layout5,
                "layout6": this.layout6,
                "layout7": this.layout7,
                "layout8": this.layout8,
                "layout9": this.layout9,
                "layout10": this.layout10,
                "layout11": this.layout11,
                "layout12": this.layout12,
                "layout13": this.layout13,
                "keyMoney": this.keyMoney,
                "deposit": this.deposit
            }
            fetch("http://localhost:8080/get_property_by_kyoto_prefecture", {
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
                    this.propertiesList = data.propertyList;
                })
        }, getTokyo() {
            const body = {
                "prefecture": "東京都",
                "district0": this.district6,
                "district1": this.district7,
                "district2": this.district8,
                "highPrice": this.highPrice,
                "lowPrice": this.lowPrice,
                "type0": this.type0,
                "type1": this.type1,
                "type2": this.type2,
                "layout0": this.layout0,
                "layout1": this.layout1,
                "layout2": this.layout2,
                "layout3": this.layout3,
                "layout4": this.layout4,
                "layout5": this.layout5,
                "layout6": this.layout6,
                "layout7": this.layout7,
                "layout8": this.layout8,
                "layout9": this.layout9,
                "layout10": this.layout10,
                "layout11": this.layout11,
                "layout12": this.layout12,
                "layout13": this.layout13,
                "keyMoney": this.keyMoney,
                "deposit": this.deposit
            }
            fetch("http://localhost:8080/get_property_by_tokyo_prefecture", {
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
                    this.propertiesList = data.propertyList;
                })

        },

    }
}
</script>

<template >
    <div class="serch">
        <SearchProperty :searchCondition="['物件', '貸主', '借主', '契約コード']" />
    </div>
    <div class="flex">
        <div class="checkbox">
            <div>
                <p class="wire">都道府縣</p>
                <Wire />
                <select v-model="selectedOption" class="form-select down select" aria-label="Default select example">
                    <option value="1">東京都</option>
                    <option value="2">京都府</option>
                </select>
            </div>
            <div>
                <p class="wire">地域</p>
                <Wire />
                <div v-if="selectedOption === '2'" class="flex">
                    <div class="down down2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="中京区" id="flexCheckDefault"
                                v-model="district0">
                            <label class="form-check-label" for="flexCheckDefault">
                                中京区
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="左京区" id="flexCheckDefault"
                                v-model="district1">
                            <label class="form-check-label" for="flexCheckDefault">
                                左京区
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="右京区" id="flexCheckDefault"
                                v-model="district2">
                            <label class="form-check-label" for="flexCheckDefault">
                                右京区
                            </label>
                        </div>
                    </div>
                    <div class="down">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="上京区" id="flexCheckDefault"
                                v-model="district3">
                            <label class="form-check-label" for="flexCheckDefault">
                                上京区
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="下京区" id="flexCheckDefault"
                                v-model="district4">
                            <label class="form-check-label" for="flexCheckDefault">
                                下京区
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="伏見区" id="flexCheckDefault"
                                v-model="district5">
                            <label class="form-check-label" for="flexCheckDefault">
                                伏見区
                            </label>
                        </div>
                    </div>
                </div>
                <div v-else class="down1">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="中央区" id="flexCheckDefault"
                            v-model="district6">
                        <label class="form-check-label" for="flexCheckDefault">
                            中央区
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="新宿区" id="flexCheckDefault"
                            v-model="district7">
                        <label class="form-check-label" for="flexCheckDefault">
                            新宿区
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="港区" id="flexCheckDefault"
                            v-model="district8">
                        <label class="form-check-label" for="flexCheckDefault">
                            港区
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <p class="wire">賃料</p>
                <Wire />
                <input class="input1" type="number" v-model="highPrice">
                <input class="input2" type="number" v-model="lowPrice">
                <div class="down down2">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="deposit">
                        <label class="form-check-label" for="flexCheckDefault">
                            敷金なし
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="keyMoney">
                        <label class="form-check-label" for="flexCheckDefault">
                            礼金なし
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <p class="wire">物件種目</p>
                <Wire />
                <div class="down">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value=0 id="flexCheckDefault" v-model="type0">
                        <label class="form-check-label" for="flexCheckDefault">
                            マンション
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value=1 id="flexCheckDefault" v-model="type1">
                        <label class="form-check-label" for="flexCheckDefault">
                            アパート
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value=2 id="flexCheckDefault" v-model="type2">
                        <label class="form-check-label" for="flexCheckDefault">
                            一戸建て
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <p class="wire">間取り</p>
                <Wire />
                <div class="flex">
                    <div class="down ">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=0 id="flexCheckDefault"
                                v-model="layout0">
                            <label class="form-check-label" for="flexCheckDefault">
                                ワンルーム
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=1 id="flexCheckDefault"
                                v-model="layout1">
                            <label class="form-check-label" for="flexCheckDefault">
                                1K
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=2 id="flexCheckDefault"
                                v-model="layout2">
                            <label class="form-check-label" for="flexCheckDefault">
                                1DK
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=3 id="flexCheckDefault"
                                v-model="layout3">
                            <label class="form-check-label" for="flexCheckDefault">
                                1LDK
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=4 id="flexCheckDefault"
                                v-model="layout4">
                            <label class="form-check-label" for="flexCheckDefault">
                                2K
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=5 id="flexCheckDefault"
                                v-model="layout5">
                            <label class="form-check-label" for="flexCheckDefault">
                                2DK
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=6 id="flexCheckDefault"
                                v-model="layout6">
                            <label class="form-check-label" for="flexCheckDefault">
                                2LDK
                            </label>
                        </div>
                    </div>
                    <div class="down">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=7 id="flexCheckDefault"
                                v-model="layout7">
                            <label class="form-check-label" for="flexCheckDefault">
                                3K
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=8 id="flexCheckDefault"
                                v-model="layout8">
                            <label class="form-check-label" for="flexCheckDefault">
                                3DK
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=9 id="flexCheckDefault"
                                v-model="layout9">
                            <label class="form-check-label" for="flexCheckDefault">
                                3LDK
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=10 id="flexCheckDefault"
                                v-model="layout10">
                            <label class="form-check-label" for="flexCheckDefault">
                                4K
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=11 id="flexCheckDefault"
                                v-model="layout11">
                            <label class="form-check-label" for="flexCheckDefault">
                                4DK
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=12 id="flexCheckDefault"
                                v-model="layout12">
                            <label class="form-check-label" for="flexCheckDefault">
                                4LDK
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value=13 id="flexCheckDefault"
                                v-model="layout13">
                            <label class="form-check-label" for="flexCheckDefault">
                                4LDK以上
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary px-5" type="button" @click="search">検索</button>
        </div>
        <div class="property">
            <properties />
        </div>
    </div>
</template>


<style  scoped> .serch {
     margin-left: 350px;
     margin-top: 50px;
     width: 800px;
 }

 .property {
     margin-top: 50px;
 }

 .checkbox {
     margin-top: 50px;
     margin-bottom: 50px;
     margin-left: 300px;
     height: 800px;
     width: 250px;
 }

 .wire {
     margin: 5px 0;
 }

 .down {
     margin-bottom: 25px;
     margin-left: 10px;
 }

 .down1 {
     margin-left: 10px;
     width: 250px;
     height: 103px;
 }

 .select {
     margin-top: 10px;
     width: 150px;
 }

 .flex {
     display: flex;
 }

 .input1 {
     margin-left: 10px;
 }

 .input2 {
     margin-left: 10px;
     margin-top: 10px;
     margin-bottom: 10px;
 }
</style>