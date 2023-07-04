<script >
export default {
    props:[      
            "searchResult"
        ],
    components: {
  },
  data() {
    return {
      landlords: [],
    }
  },
  //如果搜尋有新的值
  watch:{
        "searchResult":function(){
            this.landlords=this.searchResult
        }
    },
  methods: {    
    //顯示所有資料
    getpost() {
        fetch('http://localhost:8080/show_All_Landlord', {
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.landlords = data.landlordList; 
            console.log(this.landlords);    
                      
            })
        .catch((error) => {
            console.error(error);
        })
        if (this.searchResult && this.searchResult.length > 0) {
            console.log(123)          
            this.searchResult=null
        } 
        
    },   
    //點下後轉換網頁
    passLandlordId(input, landlordId) {
        console.log(input.target);
        console.log(landlordId);
        //轉址帶ID
        this.$router.push({
        name: 'kashinushiInfo',
        params: { getLandlordId: landlordId }
        });
    }

    
  },
  created(){
    
  },
  mounted(){ 
    this.getpost();
  }
}
</script>
<template>
        <div class="infoBox" v-for="landlord in landlords"   :key="landlord.landlordId" :value="landlord.landlordId" @click="passLandlordId($event, landlord.landlordId)">
            <div class="flexArea">
                <div class="nameGroup">
                    <p class="kana" >{{landlord.firstNameKana}}</p>
                    <p class="name">{{landlord.firstName}}</p>
                </div>
                <div class="nameGroup">
                    <p class="kana">{{landlord.lastNameKana}}</p>
                    <p class="name">{{landlord.lastName}}</p>
                </div>
            </div>

            <div class="info">
                <div class="flex">
                    <p class="black">電話番號</p>
                    <p class="colon">:</p>
                    <p class="content">{{landlord.phone}}</p>
                </div>
                <div class="flex">
                    <p class="black">Email</p>
                    <p class="colon2">:</p>
                    <p class="content">{{landlord.email}}</p>
                </div>
                <div class="flex">
                    <p class="black">マイナンバー／免許番号</p>
                    <p class="content">:</p>
                    <p>{{landlord.myNumber}}</p>
                </div>
            </div>
        </div>

</template>
  
<style lang="scss" scoped>


.infoBox {
    width: 515px;
    height: 90px;
    border: 2px solid #1962A7;
    border-radius: 6px;
    padding: 30px;
    display: flex;
    margin: 5px 60px;
    flex-direction: column;
    flex-wrap: wrap;
}

.nameGroup {
    display: flex;
    flex-direction: column;
    margin: -2px 4px -2px 4px;
    
}

.flexArea {
    display: flex;
    margin-top: -15px;
    margin-left: 30px;
}

.name {
    font-size: 20px;
}

.flex {
    display: flex;
    margin: -10px;
}

.kana {
    font-size: small;
    margin-bottom:5px;
}

p {
    color: #084279;
    font-size: 14px;
}

.black {
    color: #000;

}

.colon {
    margin-left: 5px;
}

.colon2 {
    margin-left: 25px;
}

.content {
    margin: 0 10px;
}

.info {
    margin-top: -12px;
    margin-left: 30px;
}
</style>
