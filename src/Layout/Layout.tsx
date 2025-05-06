import Header from "../components/Header"
// import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

export default function Layout(){
    return(
        <>
        <header>
            <Header></Header>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        {/* <footer>
            <Footer></Footer>
        </footer> */}
        </>
    )
}