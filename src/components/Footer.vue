<script>
export default {
  
    data() {
        return {
        fb: false
        };
    },
    methods: {
        jump(event) {
      event.preventDefault(); // 阻止链接的默认行为
      this.fb = !this.fb;
      if (this.fb) {
        this.$router.push('/'); // 导航到首页
      } else {
        this.$router.push('/f_home'); // 导航到f_home页面
      }
    }
  
    }
}
</script>
<template>
    <footer class="murasaki p-4 text-center">
        <a v-if="fb"  v-on:click="jump" class="text-white fs-6 m-0">我叫你填</a>
        <a v-else  v-on:click="jump" class="text-white fs-6 m-0">我叫你填</a>
        <!-- <p class="text-white fs-6 m-0">我叫你填</p> -->
    </footer>
</template>

<style lang="scss" scoped>
.murasaki{
    background-color: rgb(143, 77, 143);
}

a {
  text-decoration: none; /* 移除下划线 */
  color: inherit; /* 继承父元素的文本颜色 */
}
</style>