import { Banknote, Cable, ChartColumn, Cog, HandCoins, LayoutGrid, MessageCircleQuestion, Pickaxe, ShoppingCart, TicketCheck, Users, WalletMinimal, Waypoints , AlignEndHorizontal} from "lucide-react";

export const user = [
    {name:'Time Board', icon: <LayoutGrid width={20} height={20}/>, route:'/user/dashboard'},
    {name:'Time Level', icon: <Waypoints width={15} height={15}/>, route:'/user/unilevel'},
    {name:'Pay-out Time', icon: <Banknote width={15} height={15}/>, route:'/user/requestpayout'},
    {name:'Buy Chrono Package', icon: <ShoppingCart width={15} height={15}/>, route:'/user/purchase'},
    {name:'My Chrono Package', icon: <ShoppingCart width={15} height={15}/>, route:'/user/mychronopackage'},
    {name:'Bot Assistance', icon: <MessageCircleQuestion width={15} height={15}/>, route:'/user/faq'},
]

export const superadmin = [
    {name:'Time Board', icon: <LayoutGrid width={15} height={15}/>, route:'/superadmin/dashboard'},
    {name:'Manage Account', icon: <Users width={15} height={15}/>, route:'/superadmin/manageaccount'},
    {name:'Sales', icon: <ChartColumn width={15} height={15}/>, route:'/superadmin/sales'},
    {name:'Maintenance', icon: <Cable width={15} height={15}/>, route:'/superadmin/maintenance'},
    {name:'Deposit', icon: <HandCoins width={15} height={15}/>, route:'/superadmin/deposit'},
    {name:'Withdrawal', icon: <WalletMinimal width={15} height={15}/>, route:'/superadmin/withdrawal'},
    {name:'Price Pool', icon: <AlignEndHorizontal width={15} height={15}/>, route:'/superadmin/prizepool'},
    {name:'Chrono Package', icon: <Pickaxe width={15} height={15}/>, route:'/superadmin/chrono'},
    {name:'Master Key', icon: <TicketCheck width={15} height={15}/>, route:'/superadmin/masterkey'},
    {name:'Settings', icon: <Cog width={15} height={15}/>, route:'/superadmin/settings'},
]


export const admin = [
    {name:'Time Board', icon: <LayoutGrid width={15} height={15}/>, route:'/admin/dashboard'},
    {name:'Manage Account', icon: <Users width={15} height={15}/>, route:'/admin/manageaccount'},
    {name:'Withdrawal', icon: <WalletMinimal width={15} height={15}/>, route:'/admin/withdrawal'},
    {name:'Settings', icon: <Cog width={15} height={15}/>, route:'/admin/settings'},
]
