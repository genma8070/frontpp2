<script>
import Chart from 'chart.js/auto';

export default {
    components: {
        Option

    },

    props: [
        "qList",
        "index"
    ],
    emits: ['o-change', 'or-change'],
    data() {
        return {
            oId: [],
            sArr: [],
            chartData: [

            ],
            ops: [],
            opsData: [],
            ansData: [],
            chartInstance: null
        };
    },
    methods: {
        getAns() {
            let body = {
                "questionnaireId": this.$route.params.Id,

            }
            fetch("http://localhost:8080/draw_g", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {                  
                    data.b.forEach(str => {
                        const strArr = str.selectedOptions
                            .split(';');
                        this.ansData.push(strArr)
                    })
                    this.makeData()
                    this.draw()
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        makeData() {
            this.qList.op.forEach(element => {
                this.chartData.push(element.optionText);
            });

            this.qList.op.forEach(element => {
                this.ops.push(element.optionId);
                this.opsData.push(0);
            });
            if (this.qList.isRequired === false) {
                this.chartData.push("未作答");
                this.ops.push("無");
                this.opsData.push(0);
            }
           
            this.ops.forEach((e, pindex) => {
                this.ansData.forEach(a => {
                    if (a[this.index].includes(e)) {
                        this.opsData[pindex] += 1; // 使用+=运算符来增加计数器的值
                    }

                });
            });
        },
        draw() {
            const ctx = document.getElementById('myChart' + this.index).getContext('2d');
            this.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.chartData,
                    datasets: [{
                        label: '# of Votes',
                        data: this.opsData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

        }
        // destroyChart() {
        //     if (this.chartInstance) {
        //         this.chartInstance.destroy();
        //         this.chartInstance = null;
        //     }
        // }

    },
    mounted() {
        this.getAns();





    },
    // beforeUnmount() {
    //     if (this.chartInstance) {
    //         this.chartInstance.destroy(); // 在组件卸载之前销毁图表实例
    //     }
    // }
};
</script>

<template>
    <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
            <div v-if="qList.isRequired && qList.questionType" class="fw-bold">{{ qList.questionText }} (必填，多選) </div>
            <div v-else-if="!qList.isRequired && qList.questionType" class="fw-bold">{{ qList.questionText }} (非必填，多選)
            </div>
            <div v-else-if="qList.isRequired && !qList.questionType" class="fw-bold">{{ qList.questionText }} (必填，單選) </div>
            <div v-else="" class="fw-bold">{{ qList.questionText }} (非必填，單選) </div>
            <!-- <Option v-for="(oList, oindex) in qList.op" @o-change="o_enter" @or-change="or_enter" v-bind:key="oList"
                v-bind:oList="oList" v-bind:index="oindex" v-bind:needed="qList.isRequired"
                v-bind:check="qList.questionType" v-bind:sOArr="sArr" v-bind:qIndex="index" /> -->
            <div>
                <canvas :id="'myChart' + this.index"></canvas>
            </div>
        </div>
    </li>
</template>
  
 
<style lang="scss" scoped>
.aa:link {
    //設定還沒有瀏覽過的連結
    text-decoration: none;
    background-color: #ffffff;
    color: black;
    border-radius: 5px;
}

.aa:hover {
    //設定滑鼠移經的連結
    text-decoration: none;
    background-color: #e18b8b;
    color: black;
    border-radius: 5px;

}

.aa:active {
    //設定正在點選的連結
    text-decoration: none;
    background-color: rgb(255, 68, 68);
    color: black;
    border-radius: 5px;


}

.aa:visited {
    //設定還沒有瀏覽過的連結
    text-decoration: none;
    background-color: #ffffff;
    color: black;
    border-radius: 5px;
}


/* 在這裡放置子元件的樣式 */
</style>
  