<script>
import ModalView from "../components/ModalView.vue";
export default{
    components:{
        ModalView
    },
    // props: [
    //     "種類",
    //     "入金日",
    //     "支払期限",
    //     "入金額",
    //     "入金状態"
        
    // ],
    data(){
        return{
            reviseModal:false,
            modalShow: false,
            reviseCheak: false,
            種類:null,
            入金日:null,
            支払期限:null,
            入金額:null,
            入金状態:null

        }
    },
    methods: {
        reviseSwitch(){
            this.reviseModal = !this.reviseModal;
        },
        switchModal() {
            this.modalShow = !this.modalShow;
        },
        cheakModal(){
            this.reviseCheak= !this.reviseCheak;
        },
    },


}
</script>
<template>
    <div class="payment-area">
        <dl class="row ms-4">
            <dt class="col-sm-2">{{ 種類 }}</dt>
            <dt class="col-sm-2">{{ 入金日 }}</dt>
            <dt class="col-sm-2">{{ 支払期限 }}</dt>
            <dt class="col-sm-2">{{ 入金額 }}</dt>
            <dt class="col-sm-2">{{ 入金状態 }}</dt>
            <button @click="reviseSwitch" type="button" class="btn btn-secondary text-white fw-bolder px-3 py-0">状態更新</button>
                <ModalView v-if="reviseModal" :title="'入金状態の更新'" @close="reviseSwitch">
                    <div class="" style="height: 150px; width: 350px;">
                        <div class="row ms-4">
                            <p class="col text-primary">入金日：</p>
                            <p class="col">2023-05-30</p>
                        </div>
                        <div class="row text-center d-flex justify-content-center">
                            <p class="col text-primary">入金状態：</p>
                            <div class="d-flex justify-content-center">
                                <div class="mx-3">
                                    <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault1">
                                    <label class="form-check-label" for="radioDefault1">あり</label>
                                </div>
                                <div class="mx-3">
                                    <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault2">
                                    <label class="form-check-label" for="radioDefault2">確認中</label>
                                </div>
                                <div class="mx-3">
                                    <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault3">
                                    <label class="form-check-label" for="radioDefault3">なし</label>
                                </div>
                            </div>
                            <div>
                                <button @click="cheakModal" type="button" class="btn btn-primary px-3">確認</button>
                            </div>
                        </div>
                    </div>
                </ModalView>
        </dl>
    </div>
</template>

<style lang="scss" scoped>
    .payment-area {
    margin: 0 300px;
}
</style>