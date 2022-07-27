import { Fragment, useState} from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  AnnotationIcon,
  LocationMarkerIcon,
  SwitchVerticalIcon,
  MenuAlt2Icon,
  CloudIcon,
  UserIcon,
  MapIcon,
  XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import MapAllStops from '../Components/MapAllStops'
import { Link } from 'react-router-dom'
import { useJsApiLoader } from '@react-google-maps/api';
import HeaderLogo from '../Components/HeaderLogo'


const sidebarNavigation = [
  { name: 'Planner', href: '#', path:'/',  icon: MapIcon, current: false },
  { name: 'Stops', href: '#', path:'/stops', icon: SearchIcon, current: false },
  { name: 'Lines', href: '#',  path:'/lines', icon: SwitchVerticalIcon, current: false },
  { name: 'Explore', href: '#',  path:'/explore', icon: LocationMarkerIcon, current: false },
  { name: 'Weather', href: '#', path:'/weather', icon: CloudIcon, current: false },
  { name: 'Account', href: '#', path:'/account', icon: UserIcon, current: false },
  // { name: 'Donate', href: '#',  path:'/donate', icon: BellIcon, current: false },
  { name: 'Feedback', href: '#',  path:'/feedback', icon: AnnotationIcon, current: true },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Planner() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // const { isLoaded } = useJsApiLoader({  
  //   libraries: ["places"],
  //   googleMapsApiKey: "AIzaSyAPFUKh9yhgAoe5r0bcJ2CXyLZM2MBKMVU"
  // })

  return (
    <>
      <div className="h-full flex">
        {/* Narrow sidebar */}
        <div className="hidden w-28 bg-green-700 overflow-y-auto md:block">
          <div className="w-full py-6 flex flex-col items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://www.transportforireland.ie/wp-content/themes/transportforireland/assets/img/branding/transport-for-ireland-logo.svg"
                alt="Transport for Ireland"
              />
            </div>
    
            <Menu as="div" className="flex-1 mt-6 w-full px-2 space-y-1">
              {sidebarNavigation.map((item) => (
                <Link to={item.path}  as='div'
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-green-800 text-white' : 'text-indigo-100 hover:bg-yellow-300 hover:text-indigo-400',
                    'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined} 
                  > 
                  <item.icon
                    className={classNames(
                      item.current ? 'text-white place-items-center' : 'text-white group-hover:text-indigo-300',
                      'h-6 w-6','place-items-center'
                    )}
                    aria-hidden="true" />
                  <span className="mt-2">{item.name}</span>
                </Link>   
              ))}

              {/* <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Menu.Items className="origin-top-left absolute left-200 mt-3 px-2 w-screen max-w-xs sm:px-0">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      
                    </div>
                  </div>
                </Menu.Items>
              </Transition> */}

            </Menu>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative max-w-xs w-full bg-green-800 pt-5 pb-4 flex-1 flex flex-col">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-1 right-0 -mr-14 p-1">
                      <button
                        type="button"
                        className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 px-4 flex items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://www.transportforireland.ie/wp-content/themes/transportforireland/assets/img/branding/transport-for-ireland-logo.svg"
                      alt="Transport for Ireland"
                    />
                  </div>
                  <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                    <nav className="h-full flex flex-col">
                      <div className="space-y-1">
                        {sidebarNavigation.map((item) => (
                        
                            <Link to={item.path} key={item.name}
                              
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-green-800 text-white'
                                  : 'text-indigo-100 hover:bg-yellow-300 hover:text-indigo-300',
                                'group py-2 px-3 rounded-md flex items-center text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            > 
                              <item.icon
                                className={classNames(
                                  item.current ? 'text-white' : 'text-white group-hover:text-indigo-300',
                                  'mr-3 h-6 w-6'
                                )}
                                aria-hidden="true"
                              />
                              <span>{item.name}</span> 
                            </Link>
                          
                        ))}
                      </div>
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Header area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="w-full">
            <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
              
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              
              <div className="flex-1 flex justify-between px-4 sm:px-6">
               
               <div className="flex-1 flex">
                <HeaderLogo />
               </div>
                
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt=""
                        />
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="flex items-stretch overflow-hidden">
            
            {/* Primary column */}           
            <main className="overflow-y-auto w-96">
              <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">
                
                <div className='Feedback'>
                  <form method='POST' action="https://getform.io/f/88d3345f-5af7-45fa-8de0-ae29296ac12e" className='flex flex-col max-w-[600px] w-full'>
                    
                    <div className="w-full flex flex-col items-center space-y-8 sm:items-end p-2">
                      <div className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="p-2">

                          <div className='p-2'>
                            <p className='text-4xl font-bold inline border-b-4 border-green-600 text-gray-300'>Feedback</p>
                            <p className='text-gray-300 py-4'>// Submit the form below or shoot me an email - zhilin.yang@ucdconnect.ie</p>
                          </div>                   
                          <input className="w-full font-light rounded-md border border-gray-300 bg-white my-4 py-2 pl-3 pr-10 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-green-400 sm:text-sm" type="text" placeholder='Name' name='name' />
                          <input className="w-full font-light rounded-md border border-gray-300 bg-white my-4 py-2 pl-3 pr-10 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-green-400 sm:text-sm" type="email" placeholder='Email' name='email' />
                          <textarea className="w-full font-light rounded-md border border-gray-300 bg-white my-4 py-2 pl-3 pr-10 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-green-400 sm:text-sm" name="message" rows="10" placeholder='Message'></textarea>
                          <button className="flex place-content-center w-full items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400">Submit Feedback</button>
                        </div>
                      </div>
                    </div>
                  
                  </form>    
                </div>

              </section>
            </main>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden w-full bg-white border-l border-gray-200 overflow-y-auto lg:block">
              <div className="flex w-full items-stretch overflow-hidden">
                <MapAllStops />
              </div>  
            </aside>

          </div>
        
        </div>
        
      </div>
      
    </>
  )
}