/* eslint-disable no-undef */
import Index from '@/pages/Index';
import Resident from '@/pages/admin/Resident';
import Test from '@/pages/Test';
import Account from '@/pages/admin/Account';
import Complaints from '@/pages/admin/Complaints';
import Repair from '@/pages/admin/Repair';
import Park from '@/pages/admin/Park';

import UserInfo from '@/pages/user/UserInfo';
import UserTrouble from '@/pages/user/UserRepair';
import UserPayment from '@/pages/user/UserPayment';
import UserComplaint from '@/pages/user/UserComplaint';

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
        path: '/Complaints',
        component: Complaints,
    },
    {
        path: '/Repair',
        component: Repair,
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
