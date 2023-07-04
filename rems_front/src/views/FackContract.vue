<script>
export default {
    components: {

    },
    data() {
        return {

        }

    },

    methods: {

    },
    created() {
        const startDate = this.$route.query.startDate;
        const endDate = this.$route.query.endDate;

        console.log(startDate); // 输出开始日期值
        console.log(endDate); // 输出结束日期值
    }
}

</script>

<template>
    <div>
        <p>物件名: {{ $route.query.propertyName }}</p>
        <p>貸主名: {{ $route.query.fullLName }}</p>
        <p>借主名: {{ $route.query.fullName }}</p>
        <p>礼金: {{ $route.query.keyMoney }}</p>
        <p>敷金: {{ $route.query.deposit }}</p>
        <p>賃料: {{ $route.query.rentalPrice }}</p>
        <p>契約開始日: {{ $route.query.startDate }}</p>
        <p>期限: {{ $route.query.endDate }}</p>
    </div>
</template>
