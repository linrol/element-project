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
            this.$http.post('/api/TestController/testMethod',{
              property1: '1',
              property2: '2'
            }).then(res => {
              console.log(res)
            }).catch(error => {
              console.log(error)
            });
          }
        }
    }
</script>
