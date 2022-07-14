import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from '/styles/Home.module.css'

function NavLink({ to, children }) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>

}
function MobileNav({ open, setOpen }) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-french-raspberry transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-franch-berry h-20"> {/*logo container*/}
                <a className="text-xl font-semibold" href=''>LOGO</a>
            </div>
        </div>
    )

}

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { data: session } = useSession()
    const [showOptions, setShowOptions] = useState(false)
    const [showOptions2, setShowOptions2] = useState(false)
    const [showOptions3, setShowOptions3] = useState(false)

    const handleClick = ({ options }) => {
        setShowOptions(!showOptions)
    }
    const handleClick2 = ({ options }) => {
        setShowOptions2(!showOptions2)
    }

    const handleClick3 = ({ options }) => {
        setShowOptions3(!showOptions3)
    }
    return (
        <nav className="flex filter drop-shadow-md bg-french-raspberry px-4 py-4 h-20 items-center mb-4">
            <MobileNav open={open} setOpen={setOpen} />
            <div className="w-3/12 lg:flex-grow items-center text-white text-sm">
                <button onClick={() => router.push("/")}>
                    <img src='/images/probando.png' className='mx-5' />
                </button>
            </div>
            {session &&
                <div>
                    <div className='relative inline-block text-left'>
                        <div className='text-sm lg:flex-grow text-white'>
                            <button onClick={handleClick2} type='button' className='block mt-4 lg:inline-block lg:mt-0 font-semibold text-teal-200 hover:text-yellow mr-4' id="menu-button" aria-expanded="true" aria-haspopup="true">
                                Agendamientos
                            </button>
                        </div>
                        {showOptions2 && (<div className='absolute right-0 mt-2 w-56 origin-top-right rounder-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none' role="menu" aria-orientation='vertical' aria-labelledby='menu-button' tabIndex="-1">
                            <div className='py-1' role="none">
                                <div>
                                    {session && <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-yellow" onClick={() => {
                                        router.push('/SaveAppointment')
                                    }}> Agendar
                                    </button>}
                                </div>
                                <div>
                                    {session && <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-yellow" onClick={() => {
                                        router.push('/AppointmentToday')
                                    }}> Horas agendadas
                                    </button>}
                                </div>
                                <div>
                                    {session && <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-yellow" onClick={() => {
                                        router.push('/AppointmentView')
                                    }}> Estadisticas
                                    </button>}
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>}
            {session &&
                <div className='text-sm lg:flex-grow text-white'>
                    <button className='block mt-4 lg:inline-block lg:mt-0 font-semibold text-teal-200 hover:text-yellow mr-4' onClick={() => router.push('/getInsumo')}>
                        Insumos
                    </button>
                </div>}
            {session &&
            <div className='text-sm lg:flex-grow text-white'>
            <button onClick={()=>{
                router.push('/modal')
            }} className='block mt-4 lg:inline-block lg:mt-0 font-semibold text-teal-200 hover:text-yellow mr-4' >
                Notificaciones
            </button>
        </div>
                }


            <div className="w-9/12 flex justify-end items-center">


            </div>
            {session &&
                <div>
                    <div className='relative inline-block text-left'>
                        <div>
                            <button onClick={handleClick} type='button' className='flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent' id="menu-button" aria-expanded="true" aria-haspopup="true"> options
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </div>
                        {showOptions && (<div className='absolute right-0 mt-2 w-56 origin-top-right rounder-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none' role="menu" aria-orientation='vertical' aria-labelledby='menu-button' tabIndex="-1">
                            <div className='py-1' role="none">
                                <ul>
                                    <li href="/" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role="menuitem" tabIndex="-1" id="menu-item-0">
                                        Probando
                                    </li>
                                    <li href="/" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role="menuitem" tabIndex="-1" id="menu-item-0">
                                        Notification
                                    </li>
                                    <li href="/" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role="menuitem" tabIndex="-1" id="menu-item-0">
                                    </li>
                                </ul>
                                <div className="py-1">
                                    {session && <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-yellow" onClick={() => {
                                        signOut({ redirect: false })
                                        router.push('/')
                                    }}>Cerrar sesión</button>}
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>}

        </nav>
    )

}
/*


                <div className="hidden md:flex text-white">
                    <NavLink className='text-white'to="/contacts">
                        contactos
                    </NavLink>
                </div> */