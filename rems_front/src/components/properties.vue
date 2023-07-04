<script>
import { RouterLink } from 'vue-router'
import SearchProperty from "../components/SearchProperty.vue";
export default {
    components: {
        SearchProperty,
    },
    data() {
        return {
            propertySearch: [],
            infoList:[{}]

        }
    },
    methods: {
        getALL() {
            const body = {
            }
            fetch("http://localhost:8080/get_property_all", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then((response) => {

                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    this.propertySearch = data.propertyList;
                })
        },
         switchURL(event, infoList) {
      console.log(event)
      console.log(infoList)
      //this.$router.push("/keiyaku/info")

      this.$router.push({
        name: 'bukkenInfo',
        params: { property_id: infoList }
      })
    }

    },
    mounted() {
        this.getALL();
    }

}

</script>

<template >
    <div v-for="item in propertySearch" class="properties"  @click="switchURL($event, item.property_id)">
        <div class="flex">
            <div class="img">圖片</div>
            <div class="name">
                <h1 class="h1">{{ item.propertyName }}</h1>
            </div>
            <div class="p1">
                <p>租金 :{{ item.rentalPrice }}</p>
            </div>
            <div class="p2">
                <p>築年 : {{ item.buildYear }}</p>
            </div>
            <div class="p3">
                <p>樓層 : {{ item.propertyFloors }}</p>
            </div>
            <div class="p4">
                <p>第 {{ item.floorNumber }} 層</p>
            </div>
            <div class="p5">
                <p>地址 : {{ item.address }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.properties {
    width: 700px;
    height: 200px;
    border: 2px solid black;
    border-radius: 10px;
    background-image: linear-gradient(blue, blue), linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255));
    background-position: top, bottom;
    background-size: 100% 10%;
    background-repeat: no-repeat;
    margin-bottom: 20px;
}

.flex {
    position: relative;
}

.img {
    position: absolute;
    height: 140px;
    width: 200px;
    background-color: aquamarine;
    top: 38px;
    left: 20px;
}

.name {
    position: absolute;
    left: 250px;
    top: 45px;
}

.h1 {
    font-size: 20px;
}


.p1 {
    position: absolute;
    left: 240px;
    top: 140px;
}

.p2 {
    position: absolute;
    left: 350px;
    top: 140px;
}

.p3 {
    position: absolute;
    left: 450px;
    top: 140px;
}

.p4 {
    position: absolute;
    left: 550px;
    top: 140px;
}

.p5 {
    position: absolute;
    left: 275px;
    top: 100px;
}
</style>