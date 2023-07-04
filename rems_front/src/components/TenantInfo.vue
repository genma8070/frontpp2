<script >
export default {
    props:[      
            "tenantsearchResult"
        ],
    components: {
    },

    data() {
    return {
      Tenants: [],
    }
  },
  //如果搜尋有新的值
  watch:{
        "tenantsearchResult":function(){
            this.Tenant=this.tenantsearchResult
        }
    },
  methods: {    
    //顯示所有資料
    getpost() {
        fetch('http://localhost:8080/getAllTenants', {
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.Tenants = data; 
            console.log(this.Tenants);    
                      
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
    passTenantId(input, tenantId) {
        console.log(123);
        console.log(tenantId);
        //轉址帶ID
        this.$router.push({
        name: 'karinushiInfo',
        params: { getTenantId: tenantId }
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
    <div class="wrap">
        <div class="infoBox" v-for="Tenant in Tenants"   :key="Tenants.tenantId" :value="Tenants.tenantId" @click="passTenantId($event, Tenant.tenantId)">           
            <div class="flexArea">
                <div class="nameGroup">

                    <p class="kana">{{ Tenant.firstNameKana }}</p>
                    <p class="name">{{ Tenant.firstName }}</p>
                </div>
                <div class="nameGroup">
                    <p class="kana">{{ Tenant.lastNameKana }}</p>
                    <p class="name">{{ Tenant.lastName }}</p>
                </div>
            </div>

            <div class="info">
                <div class="flex">
                    <p class="black">電話番號</p>
                    <p class="colon">:</p>
                    <p class="content">{{ Tenant.phone }}</p>
                </div>
                <div class="flex">
                    <p class="black">Email</p>
                    <p class="colon2">:</p>
                    <p class="content">{{ Tenant.email }}</p>
                </div>
                <div class="flex">
                    <p class="black">マイナンバー／免許番号</p>
                    <p class="content">:</p>
                    <p>{{ Tenant.myNumber }}</p>
                </div>
            </div>

        </div>
    </div>
</template>
  
<style lang="scss" scoped>
.wrap{
 max-width: 800px;
 margin: 0 auto;
}
.infoBox {
    box-sizing: border-box;
//     width: 100%;
//  height: 200px;
    width: 515px;
    height: 90px;
    border: 2px solid #1962A7;
    border-radius: 6px;
    padding: 30px;
    display: flex;
    margin: 20px 60px;
    flex-direction: column;
    align-items: center;
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
    margin-bottom: 5px;
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