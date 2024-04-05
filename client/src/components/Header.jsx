import React from 'react'
import{Button, Navbar, NavbarLink, NavbarToggle, TextInput} from 'flowbite-react'
import { Link,useLocation } from 'react-router-dom'
import{FaMoon} from 'react-icons/fa';
import{AiOutlineSearch} from 'react-icons/ai'
export default function Header() {
    const path=useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Manya's</span>
            Blog
        </Link>
        <form>
            <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden'color='gray'pill>
           <AiOutlineSearch/>
        </Button>
        <div className="flex gap-2 md:order-2">
            <Button className='w-12 h-10 hidden sm:inline'color='gray'pill>
                <FaMoon/>
                </Button>
                <Link to ='/Login'>
                    <Button graddientDuoTone='purpletoblue'>
                     Login
                    </Button>
                </Link>
                <NavbarToggle/>
            </div>
                <Navbar.Collapse>
                    <Navbar.Link active={path==="/"}>
                    <Link to='/'>
                            Home
                    </Link>
                    </Navbar.Link >
                    <Navbar.Link active={path==="/about"}>
                        <Link to='/about'>
                            About
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path==="/projects"}>
                        <Link to='/projects'>
                            Projects
                        </Link>
                    </Navbar.Link>
                </Navbar.Collapse>
           
      
    </Navbar>
  )
}

