import "./styles/globals.scss";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "react-toastify/dist/ReactToastify.css";
import {Bounce, ToastContainer} from "react-toastify";
import {AppHead} from "./(users)/_components/common/app-head";
import {ThemeContextProvider} from "../context/theme-context";
import {AuthContextProvider} from "../context/oauth2-context";
import {UserContextProvider} from "../context/user-context";

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <AppHead/>
        <body>
        <UserContextProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </UserContextProvider>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
        />
        </body>
        </html>
    );
}
