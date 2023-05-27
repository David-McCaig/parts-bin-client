import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline'
import AuthContext from "../../Contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

const navigation = [
    { name: 'Bikes', href: '/bikes', current: false },
    { name: 'Components', href: '/components', current: false },
    { name: 'Post Add', href: '/upload', current: false },
]

export default function NavBar() {

    const { success, setFailedAuth, setUser, user } = useContext(AuthContext)

    let customer = user && user.customer_name ? user.customer_name.slice(0, 1) : '';

    const navigate = useNavigate();

    const handleLogout = () => {
        setFailedAuth(true);
        setUser(null);
        sessionStorage.removeItem('authToken');
        message.success('Log Out successful', 2);
        navigate('/')
    }

    return (
        <Disclosure as="nav" className="bg-slate-50">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <a className='text-2xl font-semibold text-black no-underline' href='/'>
                                        PartsBin
                                    </a>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="rounded-md px-3 py-2 text-base font-medium text-zinc-500 no-underline hover:text-black block "
                                            >
                                                {item.name}
                                            </a>
                                        ))}

                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {success ? (<a
                                    type="button"
                                    href='/chatdashboard'
                                    className="rounded-full bg-slate-50 p-1 text-gray-400 hover:text-gray-500 hover:space-y-1 hover:space-y-reverse focus:outline-none"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                    </svg>
                                </a>) :
                                    (<></>)
                                }

                                {/* Profile dropdown */}
                                {success ? (<Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-slate-300 text-sm">
                                            <span className="sr-only">Open user menu</span>
                                            <div
                                                className="h-8 w-8 rounded-full"
                                            > <p className='text-gray-600 items-center text-2xl font-medium hover:text-gray-500'>{customer}</p></div>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button className='block px-4 py-2 text-sm text-zinc-500 no-underline hover:text-black' onClick={handleLogout} >
                                                        Log Out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>)
                                    :
                                    (
                                        <div>
                                            <a href="/login"
                                                className="rounded-md px-3 py-2 text-base font-medium text-zinc-500 no-underline hover:text-black block "
                                            >
                                                Login
                                            </a>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="rounded-md px-3 py-2 text-base font-medium text-zinc-500 no-underline hover:text-black block "
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}