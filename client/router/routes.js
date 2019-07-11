/* eslint-disable no-undef */
import Index from '@/pages/Index';
import Resident from '@/pages/Resident';
import Test from '@/pages/Test';
import Account from '@/pages/Account';
import Park from '@/pages/Park';
import UserInfo from '@/pages/UserInfo';
import UserTrouble from '@/pages/UserRepair';
import UserPayment from '@/pages/UserPayment';
import UserComplaint from '@/pages/UserComplaint';

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
    {
        path: '/UserInfo',
        component: UserInfo,
    },
    {
        path: '/UserRepair',
        component: UserTrouble,
    },
    {
        path: '/UserPayment',
        component: UserPayment,
    },
    {
        path: '/UserComplaint',
        component: UserComplaint,
    },
];
