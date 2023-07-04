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
            this.$router.push("/");
        }
    }
}
</script>
<template>
    <header class="murasaki pt-2 d-flex justify-content-between align-items-end px-5">
        <h1 style="padding-bottom: 0.5rem;">問卷系統なのだ</h1>

        <button class="btn btn-outline-light mb-3" @click="logout">回到搜尋なのだ</button>
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
    .murasaki{
    background-color: rgb(143, 77, 143);
}
</style>