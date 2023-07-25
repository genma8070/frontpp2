<script>
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            location: 0,
            isLogPage: false
        }
    },
    methods: {
        switchLocation(locoNum) {
            this.location = locoNum;
        },
        logout() {
            sessionStorage.clear();
            this.$router.push("/");
        },
        gF() {
            if (sessionStorage.getItem("position") == 2) {
                this.$router.push("/f_home");
            } else if (sessionStorage.getItem("position") == null) {
                window.alert("尚未登入無法使用系統")
            } else {
                this.$router.push("/home");
            }
        }
    }
}
</script>
<template>
    <header class="murasaki pt-2 d-flex justify-content-between align-items-end px-5">
        <a class="h1" style="padding-bottom: 0.5rem; text-decoration: none;" @click="gF">問卷系統なのだ</a>


        <button class="btn btn-outline-light mb-3" @click="logout">登出</button>
    </header>
</template>
<style lang="scss" scoped>
.navBtn {
    color: white;
    padding: 8px 42px;
    text-decoration: none;
}

.target {
    background-color: white;
    color: #084279;
    border-radius: 6px 6px 0 0;
}

.murasaki {
    background-color: rgb(143, 77, 143);
}
</style>