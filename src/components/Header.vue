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
    <header class="murasaki px-4 pt-4 d-flex justify-content-between align-items-end px-5">
        <!-- <RouterLink to="/home" class="mb-4">
            <img src="" alt="LOGO">
        </RouterLink> -->
        
        <!-- Nav Bar -->
        <nav class="d-flex">
            <RouterLink to="/add/a" @click="switchLocation(1)" class="navBtn" :class="{target: location === 1}">問券</RouterLink>    
            <RouterLink to="/add/b" @click="switchLocation(2)" class="navBtn" :class="{target: location === 2}">題目</RouterLink>    
            <RouterLink to="/add/c" @click="switchLocation(3)" class="navBtn" :class="{target: location === 3}">填寫資料</RouterLink>    
            <RouterLink to="/add/d" @click="switchLocation(4)" class="navBtn" :class="{target: location === 4}">統計</RouterLink>    
        </nav>

        <!-- <button class="btn btn-outline-light mb-4" @click="logout">回到首頁なのだ</button> -->
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