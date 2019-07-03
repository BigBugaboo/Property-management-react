import Login from '@/layouts/login';
import Main from '@/layouts/Index';
import On from '@/pages/On';


export default [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Main,
    },
    {
        path: '/on',
        exact: true,
        component: On
    }
];
