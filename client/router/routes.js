/* eslint-disable no-undef */
import Loadable from '@loadable/component';
import Loading from '@/components/common/Loading';

// import Index from '@/pages/Index';
// import Resident from '@/pages/admin/Resident';
// import Test from '@/pages/Test';
// import Account from '@/pages/admin/Account';
// import Complaints from '@/pages/admin/Complaints';
// import Repair from '@/pages/admin/Repair';
// import Bills from '@/pages/admin/Bills';
// import Park from '@/pages/admin/Park';
const Resident = Loadable(() => import('@/pages/admin/Resident'), {
    fallback: Loading,
});
const Account = Loadable(() => import('@/pages/admin/Account'), {
    fallback: Loading,
});
const Complaints = Loadable(() => import('@/pages/admin/Complaints'), {
    fallback: Loading,
});
const Repair = Loadable(() => import('@/pages/admin/Repair'), {
    fallback: Loading,
});
const Bills = Loadable(() => import('@/pages/admin/Bills'), {
    fallback: Loading,
});
const Park = Loadable(() => import('@/pages/admin/Park'), {
    fallback: Loading,
});


const UserInfo = Loadable(() => import('@/pages/user/UserInfo'), {
    fallback: Loading,
});
const UserTrouble = Loadable(() => import('@/pages/user/UserRepair'), {
    fallback: Loading,
});
const UserPayment = Loadable(() => import('@/pages/user/UserPayment'), {
    fallback: Loading,
});
const UserComplaint = Loadable(() => import('@/pages/user/UserComplaint'), {
    fallback: Loading,
});
// import UserInfo from '@/pages/user/UserInfo';
// import UserTrouble from '@/pages/user/UserRepair';
// import UserPayment from '@/pages/user/UserPayment';
// import UserComplaint from '@/pages/user/UserComplaint';

module.exports = [
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
        path: '/Bills',
        component: Bills,
    },
    {
        path: '/Park',
        component: Park,
    },
    {
        path: '/Resident',
        component: Resident,
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
