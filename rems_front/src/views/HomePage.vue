<script>
import SearchBar from "../components/SearchBar.vue";
import ModalView from "../components/ModalView.vue";

export default {
    components: {
        SearchBar,
        ModalView
    },
    data() {
        return {
            modalShow: false,
        }
    },
    methods: {
        switchModal() {
            this.modalShow = !this.modalShow;
        }
    }
}
</script>
<template>
    <!-- <SearchBar :searchCondition="['物件','借主', '契約コード']"/> -->
    <div class="id">
        <div class="box">
           
           <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
               <div class="carousel-indicators">
                   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
               </div>
               <div class="carousel-inner">
                   <div class="carousel-item active">
                   <img src="../../picture/16691863_6.jpg" class="d-block w-100" alt="...">
                   </div>
                   <div class="carousel-item">
                   <img src="../../picture/20190122-075307_U5965_M493824_81f5.jpg" class="d-block w-100" alt="...">
                   </div>
                   <div class="carousel-item">
                   <img src="../../picture/md-035201caed5b8e631e40cde56958315e.jpg" class="d-block w-100" alt="...">
                   </div>
               </div>
               <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                   <span class="visually-hidden">Previous</span>
               </button>
               <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                   <span class="carousel-control-next-icon" aria-hidden="true"></span>
                   <span class="visually-hidden">Next</span>
               </button>
           </div>
        </div>



        <!-- <h1>Log in Page / 元件範例</h1>
        <h2>元件說明: (元件內部也有註解說明)</h2>
        <p>請 props "searchCondition" 傳入搜索條件的陣列，並 @emmit 一個 SearchResponse ，會回傳 [搜索條件, 搜索關鍵字] 的陣列資訊</p> -->
        <!-- <SearchBar :searchCondition="['物件','借主', '契約コード']"/> -->
        

        <!-- <p>請由外部綁定 v-if 作為顯示切換，並 props 傳入標題字串，@close綁定視窗右上角取消事件</p>
        <p></p>
        <button @click="switchModal">Open Modal</button>
        <ModalView v-if="modalShow" :title="'test info'" @close="closeModal">
            <div>
                <h2>此處可自行撰寫</h2>
            </div>
        </ModalView> -->
    </div>
</template>
<style lang="scss" scoped>
.id{
    width: 100%;
    height: 82.8vh;
}

.box{
    align-items: center;
    justify-content: center;
    text-align: center;
    // width: 300px;
    // height: 400px;
    // background-color: aqua;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    p{
        position: relative;
        left: -105px;
        margin: 10px  0px  0px  0px;
    }
    .box2{
        position: relative;
        top: 50px;
        left: 100px;
        width: 100px;
        height: 50px;
        background-color: aquamarine;
    }
    .box3{
        margin-top: 80px;
        .btn{
            margin-top: 30px;
        }
        input{
            width: 250px;
        }
    }
}

</style>