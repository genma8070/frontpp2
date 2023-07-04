<script>
import ModalView from '../components/ModalView.vue'
import AddContractBar from '../components/AddContractBar.vue'

export default {
  components: {
    ModalView,
    AddContractBar
  },
  props: ['contract_id'],
  data() {
    return {
      modalShow: false,
      delectModal: false,
      reviseModal: false,
      addModal: false,
      // contractId: '',
      addType: '',
      addDate: '',
      addrent: '',
      addDeadline: '',
      addStatus: '',
      // 顯示入金資訊
      type: null,
      date: null,
      deadline: null,
      amount: null,
      status: null,
      // addContractDetail
      count: null,
      rent: null,
      // selectcontractdetail
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
      ],
      contractDate: [],
      // 判斷契約時間結果的陣列
      resoult: []
    }
  },
  methods: {
    switchModal() {
      this.modalShow = !this.modalShow
    },
    delectSwitch() {
      this.delectModal = !this.delectModal
    },
    reviseSwitch() {
      this.reviseModal = !this.reviseModal
    },
    addSwitch() {
      this.addModal = !this.addModal
    },
    addContractDetail() {
      this.addModal = !this.addModal

      let body = {
        count: this.count,
        rent: this.rent,
        contractID: this.contractId
      }

      fetch('http://localhost:8080/add_contractDetail_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
        })
    },
    addPayment() {
      this.modalShow = !this.modalShow

      let body = {
        paymentType: this.addType,
        paymentDeadline: this.addDate,
        amount: this.addrent,
        paymentDate: this.addDeadline,
        paymentStatus: this.addStatus,
        contractID: this.contractId
      }

      fetch('http://localhost:8080/add_payment_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
        })

      fetch('http://localhost:8080/select_payment_info', {})
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
          this.type = data.infoMap.payment_type
          this.date = data.infoMap.payment_date
          this.deadline = data.infoMap.payment_deadline
          this.amount = data.infoMap.amount
          this.status = data.infoMap.payment_status
        })
    },
    getContractDetail() {
      let body = {
        contractID: this.contract_id
      }

      fetch('http://localhost:8080/select_contract_detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
          this.contractDate = data.contractDetailList

          const nowDate = new Date()
          // 迭代 contractDetailList 進行判斷
          for (let i = 0; i < data.contractDetailList.length; i++) {
            const dateRange = data.contractDetailList[i].split('~')
            const endDate = new Date(dateRange[1])

            if (endDate > nowDate) {
              console.log('結束日期大於目前時間')
              this.resoult[i] = '契約中'
            } else {
              console.log('結束日期小於或等於目前時間')
              this.resoult[i] = '終了'
            }
          }
        })
    },

    selectContractDetail() {
      let body = {
        contractID: this.contract_id
      }

      fetch('http://localhost:8080/FindContractDetailsData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)

          this.infoList.contractId = data.contract_id
          this.infoList.property = data.pProperty_name
          this.infoList.landlord = data.lFirst_name + data.lLast_name
          this.infoList.tenant = data.tFirst_name + data.tLast_name
          this.infoList.giftMoney = data.pKey_money
          this.infoList.deposit = data.pDeposit
          this.infoList.rent = data.rent
          this.infoList.startDate = data.cdStart_year +"-"+ data.cdStart_month +"-"+ data.cdStart_day
          this.infoList.endDate = data.cdEnd_year +"-"+ data.cdEnd_month +"-"+ data.cdEnd_day
          console.log(this.infoList)
        })
    }
  },

  mounted() {
    this.selectContractDetail(), this.getContractDetail()
  }
}
</script>
<template>
  <div class="contract-area">
    <h2 class="fw-bolder text-center mt-5 text-primary">契約情報</h2>
    <hr class="border border-secondary border-2" />
    <dl class="row ms-6">
      <dt class="col-sm-2 text-primary">物件名</dt>
      <dt class="col-sm-1 text-primary">：</dt>
      <dt class="col-sm-7 border-bottom border-1 border-secondary">{{ infoList.property }}</dt>
    </dl>
    <dl class="row ms-6">
      <dt class="col-sm-2 text-primary">貸主名</dt>
      <dt class="col-sm-1 text-primary">：</dt>
      <dt class="col-sm-7 border-bottom border-1 border-secondary">{{ infoList.landlord }}</dt>
    </dl>
    <dl class="row ms-6">
      <dt class="col-sm-2 text-primary">借主名</dt>
      <dt class="col-sm-1 text-primary">：</dt>
      <dt class="col-sm-7 border-bottom border-1 border-secondary">{{ infoList.tenant }}</dt>
    </dl>
    <dl class="row ms-6">
      <dt class="col-sm-2 text-primary">礼金</dt>
      <dt class="col-sm-1 text-primary">：</dt>
      <dt class="col-sm-7 border-bottom border-1 border-secondary">
        {{ infoList.giftMoney * infoList.rent }}
      </dt>
    </dl>
    <dl class="row ms-6">
      <dt class="col-sm-2 text-primary">敷金</dt>
      <dt class="col-sm-1 text-primary">：</dt>
      <dt class="col-sm-7 border-bottom border-1 border-secondary">
        {{ infoList.deposit * infoList.rent }}
      </dt>
    </dl>
    <dl class="row ms-6">
      <dt class="col-sm-2 text-primary">賃料</dt>
      <dt class="col-sm-1 text-primary">：</dt>
      <dt class="col-sm-7 border-bottom border-1 border-secondary">{{ infoList.rent }}</dt>
    </dl>
    <dl class="row ms-6">
      <dt class="col-sm-2 text-primary">契約開始時間</dt>
      <dt class="col-sm-1 text-primary">：</dt>
      <dt class="col-sm-7 border-bottom border-1 border-secondary">{{ infoList.startDate }}</dt>
    </dl>
    <dl class="row ms-6">
      <dt class="col-sm-2 text-primary">契約終了時間</dt>
      <dt class="col-sm-1 text-primary">：</dt>
      <dt class="col-sm-7 border-bottom border-1 border-secondary">{{ infoList.endDate }}</dt>
    </dl>
    <div class="d-flex justify-content-center">
      <button @click="addSwitch" type="button" class="btn btn-primary mx-5 fw-bolder m-3">
        更新手続き
      </button>
      <ModalView v-if="addModal" :title="'契約の更新手続き'" @close="addSwitch">
        <div class="" style="height: 300px; width: 550px">
          <div class="row d-flex justify-content-center">
            <dt class="col-sm-3 text-primary">賃料</dt>
            <dt class="col-sm-1 text-primary">：</dt>
            <dt class="col-sm-6">
              <input
                type="number"
                aria-describedby="inputGroup-sizing-sm"
                class="form-control"
                v-model="rent"
              />
            </dt>
          </div>
          <dl class="row d-flex justify-content-center">
            <dt class="col-sm-3 text-primary">期限</dt>
            <dt class="col-sm-1 text-primary">：</dt>
            <dt class="col-sm-6">
              <input
                type="number"
                aria-describedby="inputGroup-sizing-sm"
                class="form-control"
                v-model="count"
              />
            </dt>
          </dl>
          <div class="d-flex justify-content-center">
            <button @:click="addContractDetail" type="button" class="btn btn-primary px-5">
              確認
            </button>
          </div>
        </div>
      </ModalView>
      <button
        @click="delectSwitch"
        type="button"
        class="btn btn-danger mx-5 fw-bolder m-3 text-white"
      >
        解約する
      </button>
      <ModalView v-if="delectModal" :title="'契約の削除'" @close="delectSwitch">
        <div style="height: 150px; width: 350px">
          <h4>この契約を削除しますか？</h4>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-danger px-5 fw-bolder text-white">削除</button>
          </div>
        </div>
      </ModalView>
    </div>
  </div>

  <div class="payment-area" style="height: 300px">
    <div class="d-flex justify-content-center">
      <h4 class="fw-bolder text-center mt-5 text-primary">入金情報</h4>
      <button @click="switchModal" type="button" class="btn btn-primary fw-bolder m-5 px-3 py-0">
        入金追加
      </button>
      <ModalView v-if="modalShow" :title="'入金情報'" @close="switchModal">
        <div class="addPayment">
          <dl class="row d-flex justify-content-center">
            <dt class="col-sm-2 text-primary">入金種類</dt>
            <dt class="col-sm-1 text-primary">：</dt>
            <dt class="col-sm-6">
              <input
                type="text"
                v-model="addType"
                aria-describedby="inputGroup-sizing-sm"
                class="form-control"
                placeholder="賃料/礼金/敷金"
              />
            </dt>
          </dl>
          <dl class="row d-flex justify-content-center">
            <dt class="col-sm-2 text-primary">支払期限</dt>
            <dt class="col-sm-1 text-primary">：</dt>
            <dt class="col-sm-6">
              <input
                v-model="addDate"
                type="date"
                aria-describedby="inputGroup-sizing-sm"
                class="form-control"
              />
            </dt>
          </dl>
          <dl class="row d-flex justify-content-center">
            <dt class="col-sm-2 text-primary">入金額</dt>
            <dt class="col-sm-1 text-primary">：</dt>
            <dt class="col-sm-6">
              <input
                v-model="addrent"
                type="number"
                aria-describedby="inputGroup-sizing-sm"
                class="form-control"
              />
            </dt>
          </dl>
          <dl class="row d-flex justify-content-center">
            <dt class="col-sm-2 text-primary">入金日：</dt>
            <dt class="col-sm-1 text-primary">：</dt>
            <dt class="col-sm-6">
              <input
                v-model="addDeadline"
                type="date"
                aria-describedby="inputGroup-sizing-sm"
                class="form-control"
              />
            </dt>
          </dl>
          <dl class="row d-flex justify-content-center">
            <dt class="col-sm-2 text-primary">入金状態</dt>
            <dt class="col-sm-1 text-primary">：</dt>
            <dt class="col-sm-6">
              <input
                v-model="addStatus"
                type="text"
                aria-describedby="inputGroup-sizing-sm"
                class="form-control"
                placeholder="あり/確認中/なし"
              />
            </dt>
          </dl>
          <div class="d-flex justify-content-center">
            <button @click="addPayment" type="button" class="btn btn-primary px-5">確認</button>
          </div>
        </div>
      </ModalView>
    </div>
    <hr class="border border-secondary border-2" />
    <dl class="row ms-4">
      <dt class="col-sm-2 text-primary">入金種類</dt>
      <dt class="col-sm-2 text-primary">入金日</dt>
      <dt class="col-sm-2 text-primary">支払期限</dt>
      <dt class="col-sm-2 text-primary">入金額</dt>
      <dt class="col-sm-2 text-primary">入金状態</dt>
    </dl>

    <dl class="row ms-4">
      <dt class="col-sm-2">{{ type }}</dt>
      <dt class="col-sm-2">{{ date }}</dt>
      <dt class="col-sm-2">{{ deadline }}</dt>
      <dt class="col-sm-2">{{ amount }}</dt>
      <dt class="col-sm-2">{{ status }}</dt>
      <dt class="col-sm-2">
        <button
          @click="reviseSwitch"
          type="button"
          class="btn btn-secondary text-white fw-bolder px-3 py-0"
        >
          状態更新
        </button>
        <ModalView v-if="reviseModal" :title="'入金状態の更新'" @close="reviseSwitch">
          <div class="" style="height: 150px; width: 350px">
            <div class="row ms-4">
              <p class="col text-primary">入金日：</p>
              <p class="col">2023-05-30</p>
            </div>
            <div class="row text-center d-flex justify-content-center">
              <p class="col text-primary">入金状態：</p>
              <div class="d-flex justify-content-center">
                <div class="mx-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radioDefault"
                    id="radioDefault1"
                  />
                  <label class="form-check-label" for="radioDefault1">あり</label>
                </div>
                <div class="mx-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radioDefault"
                    id="radioDefault2"
                  />
                  <label class="form-check-label" for="radioDefault2">確認中</label>
                </div>
                <div class="mx-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radioDefault"
                    id="radioDefault3"
                  />
                  <label class="form-check-label" for="radioDefault3">なし</label>
                </div>
              </div>
              <div>
                <button type="button" class="btn btn-primary px-3">確認</button>
              </div>
            </div>
          </div>
        </ModalView>
      </dt>
    </dl>
  </div>

  <div class="contractDetail-area mb-6">
    <h4 class="fw-bolder text-center mt-5 text-primary">詳細契約リスト</h4>
    <hr class="border border-secondary border-2" />
    <dl class="row ms-6" v-for="(item, index) in contractDate" v-bind:key="index">
      <dt class="col-sm-2">契約開始時間</dt>
      <dt class="col-sm-1">：</dt>
      <dt class="col-sm-5">{{ item }}</dt>
      <dt class="col-sm-2">{{ resoult[index] }}</dt>
    </dl>
  </div>
</template>
<style scoped>
.contract-area {
  margin: 0 300px;
}
.payment-area {
  margin: 0 300px;
}
.contractDetail-area {
  margin: 0 300px;
}
.addPayment {
  width: 550px;
  height: 400px;
}
</style>
