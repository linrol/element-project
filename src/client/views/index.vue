<template>
        <div>首页</div>
</template>

<script>

    export default {
        created () {
            this.init();
        },
        data () {
          return {
          }
        },
        methods: {
          init () {
            this.$http({
                url: '/RewardAction/getInfoListByAssId',
                method: 'post',
                data: null
            }).then(res => {
                if (res.success) {
                } else {
                }
            });
          }
        }
    }
</script>
