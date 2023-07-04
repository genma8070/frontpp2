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
    <header class="bg-primary px-4 pt-4 d-flex justify-content-between align-items-end px-5">
        <RouterLink to="/home" class="mb-4">
            <img src="" alt="LOGO">
        </RouterLink>
        
        <!-- Nav Bar -->
        <nav class="d-flex">
            <RouterLink to="/bukken" @click="switchLocation(1)" class="navBtn" :class="{target: location === 1}">物件</RouterLink>    
            <RouterLink to="/kashinushi" @click="switchLocation(2)" class="navBtn" :class="{target: location === 2}">貸主</RouterLink>    
            <RouterLink to="/karinushi" @click="switchLocation(3)" class="navBtn" :class="{target: location === 3}">借主</RouterLink>    
            <RouterLink to="/keiyaku" @click="switchLocation(4)" class="navBtn" :class="{target: location === 4}">契約</RouterLink>    
        </nav>

        <button class="btn btn-outline-light mb-4" @click="logout">ログアウト</button>
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
</style>