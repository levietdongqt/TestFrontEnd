import {MainLayout} from "../_components/layout/main-layout";
import React, {Suspense} from "react";
import {UserContextProvider} from "../../../context/user-context";
import ChatContextProvider from "../../../context/chat-context";
import {NotificationContextProvider} from "../../../context/notification-context";
import {SocketProvider} from "../../../context/websocket-context1";
import {AuthContextProvider} from "../../../context/oauth2-context";
import {SearchContextProvider} from "../../../context/search-context";
import dynamic from "next/dist/shared/lib/dynamic";


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <MainLayout>
                {children}
            </MainLayout>
        </>

    )
}