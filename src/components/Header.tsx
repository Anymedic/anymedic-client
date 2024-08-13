import './Header.scss';
import {Menu, X} from "lucide-react";
import {useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Drawer, DrawerContent, DrawerOverlay, useDisclosure} from "@chakra-ui/react";
import Logo from '../assets/images/img_logo.png'
const menu = [
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Talk',
    route: '/talk'
  },
  {
    label: 'Medicine',
    route: '/medicine'
  },
  {
    label: 'my',
    route: '/my'
  }
]

const Header = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const headerPage = useMemo(() => {
    const pathname = location.pathname.split('/')[1]
    switch (pathname) {
      case '':
        return 'home'
      default:
        return pathname
    }
  }, [location])

  const navigateMenu = (route: string) => {
    navigate(route);
    onClose();
  }

  return (
    <header className='header'>
      <img className='header-logo' src={Logo} alt="" onClick={() => navigate('/')}/>
      <span className='header-page'>
        {headerPage}
      </span>
      <Menu width={18} onClick={() => onOpen()}/>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay/>
        <DrawerContent className='menu-panel-wrapper'>
          <div className="menu-panel">
            <div className="menu-panel-close" onClick={() => onClose()}>
              <X width={18}/>
            </div>
            <div className="menu-wrapper">
              {menu.map(el =>
                <span className='menu-panel-menu' onClick={() => navigateMenu(el.route)}>
                  {el.label}
                </span>
              )}
            </div>

          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
