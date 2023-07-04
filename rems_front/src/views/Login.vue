<script>
import { RouterLink } from 'vue-router';
import ModalView from "../components/ModalView.vue";

export default {
    components: {
        ModalView
    },
    data() {
        return {
            modalShow: false,
            vh: 0
        }
    },
    methods: {
        switchModal() {
            this.modalShow = !this.modalShow;
        },
        call(searchResponse) {
            console.log(searchResponse)
        }
    },
    mounted() {
        // 設定高度
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";
    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex flex-column justify-content-center align-items-center">
            <img src="" alt="LOGO" class="mb-2">
            <div class="account">
                <label for="account">Account</label>
                <input type="text" id="account" class="d-block">
            </div>
            <div class="password mb-4">
                <label for="password">Password</label>
                <input type="text" id="password" class="d-block">
            </div>
            <button class="btn btn-primary">
                <RouterLink to="/home" class="text-light text-decoration-none fs-7 p-2">ログイン</RouterLink>
            </button>
        </div>
    </div>
</template>
<style scoped>
    label {
        font-size: 10px;
    }
</style>