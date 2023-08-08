import { Header } from "../header/header";

export const Container = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
}