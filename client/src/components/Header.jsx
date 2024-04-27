import React from 'react'
import{Avatar,Button, Navbar, NavbarLink, NavbarToggle, TextInput,Dropdown} from 'flowbite-react'
import { Link,useLocation ,useNavigate} from 'react-router-dom'
import{FaMoon,FaSun} from 'react-icons/fa';
import{AiOutlineSearch} from 'react-icons/ai'
import {useSelector,useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
    const path=useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const{currentUser}=useSelector(state=>state.user);
    const { theme } = useSelector((state) => state.theme);
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
        <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (

                <Link to ='/Login'>
                    <Button gradientDuoTone='purpleToBlue' outline>
                     Login
                    </Button>
                </Link>
        )}
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

