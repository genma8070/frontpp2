<script>
import { RouterLink } from 'vue-router'
export default {
  components: {},
  
  data(){
      return{
        ContractList: [],
          
      }
  },
  methods:{
    getContractID(){
        const body = {
            //接上一頁的物件ID
                "propertyID":12
            }
        //
        fetch('http://localhost:8080/getContractsYMD', {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(body)
            
        })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
          this.ContractList = data.ropertiesResponseList

          console.log(data.ropertiesResponseList)
        })
    }

  },
  mounted() {
    this.getContractID()
    
  },
  }
</script>
<template>
    <div class="big"
        v-for="item in ContractList"
        v-bind="item.contract_id"
        :value = "item.contract_id"
        @click="switchUrl"
        >
        <div class="time">
            <p>契約時間:</p>
        </div>
        <div>
            <p>{{ item.start_year }}/{{ item.start_month }}/{{ item.start_day }}</p>
        </div>
        <div>
            <p>{{ item.end_year }}/{{ item.end_month }}/{{ item.end_day }}</p>
        </div>
        
        <div>
        <p>連結</p> <!-- 我想讓現行契約顯示"契約中"，歷史契約顯示"歷史契約" -->
        </div>
    </div>
</template>

<style>
.big{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
}
</style>