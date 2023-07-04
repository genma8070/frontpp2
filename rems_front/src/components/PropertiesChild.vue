<script>
export default {
    components: {

    },
    data() {
        return {

        }

    },
    props: [
        "property"
    ],
    methods: {
        sendData(value) {
            this.$emit('button-click', value);
        }
    }
}

</script>

<template>
    <div class="button-container">
        <!-- 按鈕元件送資料出去 -->
        <button @click="sendData(property)" class="btnp">
            <div class="btnArea">
                <div style="height: 10%; width: 100%; background-color: dodgerblue;"></div>
                <div style="height: 90%; width: 100%; display: flex;">
                    <!-- 圖片 -->
                    <div
                        style="width:12rem; height: 6rem; margin: 5px; background-color: aqua;  margin-top: 0.7rem; margin-left: 1rem; margin-right: 1rem;">
                        <img class="img" :src="image" :alt="title">
                    </div>
                    <div class="rightInfo">
                        <!-- 頂層 -->
                        <div>
                            <h1 style="font-size: 20px; margin-top: 0.5rem;">{{ property.propertyName }}</h1>
                        </div>
                        <!-- 中層 -->
                        <div
                            style="display: flex; justify-content: space-between; border-style: solid; border-top: 2rem; border-left: 2rem; border-right: 2rem; margin-right: 1rem; border-color: rgb(100, 165, 3);">
                            <div>
                                <p style="margin-bottom: -0.5rem;">{{ property.address }}</p>
                                <p style="margin-bottom: -0.2rem;"></p>
                            </div>
                            <div>
                                <div>
                                    <p style="margin-bottom: -0.5rem;">{{ property.buildYear }}</p>
                                </div>
                                <div>
                                    <p style="margin-bottom: -0.2rem;">{{ property.floorNumber }}</p>
                                </div>
                            </div>
                        </div>
                        <!-- 底層 -->
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-right: 1rem;">
                                <div style="display: flex;">

                                    <p>{{ property.rentalPrice }}</p>
                                    <p>万円</p>
                                </div>
                                <div style="display: flex;">
                                    <p>可入住日期:</p>
                                    <p>1919/94/87</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.button-container {
    margin-bottom: 20px;
}

.btnp {

    display: inline-block;
    background-color: white;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;

    .btnArea {
        border: 3px;
        border-style: solid;
        border-color: black;
        overflow: hidden;
        width: 50vw;
        height: 25vh;

        .rightInfo {
            margin-left: 0.4rem;
            width: 100%;
        }

    }
}

.btnp:hover {
    /* 滑鼠懸停時的樣式 */
    transform: scale(1.2);
}
</style>