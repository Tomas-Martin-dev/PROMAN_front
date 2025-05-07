import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from '../components/Header'
import { useAuth } from '../hooks/useAuth'

export default function AppLoyout() {
    const {data, isError, isLoading, error} = useAuth();
    
    
    if (isLoading) return "Cargando..."
    
    if (error) {
        console.log(isError, error) 
        return <Navigate to={"/auth/login"}/>
    }
    
    if (data) return (
        <>
            <Header data={data}/>

            <section className='max-w-11/12  mx-auto mt-10 p-5'>
                <Outlet />
            </section>

            <footer className='p-5 bg-gray-200'>
                <p className='text-center flex flex-col'>
                    Todos los derechos reservados {new Date().getFullYear()}
                    <span>Tomas-dev</span>
                </p>
            </footer>
            <ToastContainer
                autoClose={2000}
                hideProgressBar
                closeOnClick
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                theme="light"
                transition={Slide}
            />
        </>
    )
}
