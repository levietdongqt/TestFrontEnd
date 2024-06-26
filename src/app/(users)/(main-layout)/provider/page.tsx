"use client";
import {Tabs} from "antd";
import {MainHeader} from "../../_components/home/main-header";
import {useRouter} from "next/navigation";
import ServiceMain from "../../_components/main-service/servcie-main";
import Promotions from "app/(users)/_components/main-service/promotions";
import ServiceExtra from "../../_components/extra-service/servcie-extra";
import WorkingTimes from "app/(users)/_components/main-service/workingtimes";
import Order from "app/(users)/_components/order/order";
import {useUser} from "../../../../context/user-context";
import {UserRole} from "@lib/enum/UserRole";

const items = [
    {
        key: "1",
        label: "Hóa đơn",
        children:<Order/> ,
    },
    {
        key: "2",
        label: "Dịch vụ chính",
        children:<ServiceMain/> ,
    },
    {
        key: "3",
        label: "Dịch vụ Thêm",
        children: <ServiceExtra/>,
    },
    {
        key: "4",
        label: "Khuyến mãi",
        children: <Promotions/>,
    },
    {
        key: "5",
        label: "Thời gian làm việc",
        children: <WorkingTimes/>,
    },
];
export default function AdminMain() {
    // const {currentUser} = useUser()
    // const {back} = useRouter();
    // if(currentUser?.roles.includes(UserRole.ROLE_PROVIDER)){
    //     return (
    //         <>
    //             <MainHeader useActionButton action={back}>
    //                 Quay lại
    //             </MainHeader>
    //             <div>
    //                 <Tabs items={items}/>
    //             </div>
    //         </>
    //     );
    // }
    // back()
    const {back} = useRouter();
    return (
        <>
            <MainHeader useActionButton action={back}>
                Quay lại
            </MainHeader>
            <div>
                <Tabs items={items}/>
            </div>
        </>
    );
}
