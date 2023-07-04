<script>
import HeaderView from '../components/Header.vue';

export default {
    components: {
        HeaderView
        
    },

    data() {
        return {
            vh: 0,
          
        }
    },
    methods: {
      
    },
    mounted() {
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
  <div id="wrap" class="d-flex flex-column mb-4 ">
    <HeaderView></HeaderView>

  </div>
</template>
<style lang="scss" scoped>
.mid {
    text-align: center;
}

.page {
    margin-top: 240px;

}

.Result {
    justify-content: space-around;
    text-align: center;
    overflow: auto;
    margin-bottom: -200px;
    height: 300px;
    /* 自定義高度，根據需要調整 */
}
</style>