import Navbar from './components/Navbar'
import Footer from './components/Footer'


// eslint-disable-next-line react/prop-types
function Layout({ children }) {
    return (
        <div className="layout">
            <Navbar />
            <main className="content">{children}</main>
            <Footer />
        </div>
    )
}


export default Layout