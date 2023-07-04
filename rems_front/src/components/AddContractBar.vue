<script>
import { RouterLink } from 'vue-router'
export default {
  components: {},
  data() {
    return {
      // selectContract
      ContractList: [],
      // selectContractDetail
      infoList: [
        {
          property: null,
          landlord: null,
          tenant: null,
          giftMoney: null,
          deposit: null,
          rent: null,
          startDate: null,
          endDate: null
        }
      ]
    }
  },
  methods: {
    //轉址
    switchURL(event, contractId) {
      console.log(event)
      console.log(contractId)
      console.log(this.infoList)
      //this.$router.push("/keiyaku/info")

      this.$router.push({
        name: 'keiyaku_info',
        params: { contract_id: contractId }
      })
    },
    selectContract() {
      fetch('http://localhost:8080/getAllContracts', {})
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
          this.ContractList = data.contractResponse
        })
    },

    selectInfo() {
      this.$emit('contractInfo', this.contractId)
    }
  },
  mounted() {
    this.selectContract()
  }
}
</script>
<template>
  <div
    v-for="item in ContractList"
    v-bind:key="item.contract_id"
    :value="item.contract_id"
    @click="switchURL($event, item.contract_id)"
    class="d-flex+ justify-content-center border border-secondary mt-3"
    style="width: 600px; height: 130px"
  >
    <h5 class="col-sm-8 text-start ms-6">{{ item.property_name }}</h5>
    <h6 class="col-sm-10 text-center mt-3">{{ item.llFirst_name + item.llLast_name }}</h6>
    <h6 class="col-sm-10 text-center">{{ item.ttFirst_name + item.ttLast_name }}</h6>
  </div>
</template>

<style lang="scss" scoped></style>
