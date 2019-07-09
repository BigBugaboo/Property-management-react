/* eslint-disable no-undef */
import Index from '@/pages/Index';
import Resident from '@/pages/Resident';
import Test from '@/pages/Test';
import Account from '@/pages/Account';
import Park from '@/pages/Park';

module.exports = [
    {
        path: '/Index',
        component: Index,
    },
    {
        path: '/Account',
        component: Account,
    },
    {
        path: '/Test',
        component: Test,
    },
    {
        path: '/Resident',
        component: Resident,
    },
    {
        path: '/Park',
        component: Park,
    },
];
