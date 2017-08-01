const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/my',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/my.vue'], resolve)
    }
];
export default routers;
