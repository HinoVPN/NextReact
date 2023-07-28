import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import { Menu, MenuItem, Sidebar, SubMenu, sidebarClasses } from 'react-pro-sidebar'

export default function SideBar({changeToggled,toggled}) {
  const [broken, setBroken] = React.useState(window.matchMedia('(max-width: 1200px)').matches);
  return (
    <Sidebar  
    onBackdropClick={() => changeToggled(false)} 
    toggled={toggled} 
    onBreakPoint={setBroken} 
    customBreakPoint="1200px"
    width="300px"
    rootStyles={{
      position: 'fixed',
      top: '60px',
      left: '0',
      bottom: '0',
      zIndex: '996',
      transition: 'all 0.3s',
      // padding: '20px',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#aab7cf transparent',
      boxShadow: '0px 0px 20px rgb(1 41 112 / 10%)',
      backgroundColor: '#fff',
    }}
    >
    <Menu
      transitionDuration={1000}
      menuItemStyles={{
        root:{
          backgroundColor: 'white'
        },
        button: {
            backgroundColor: '#FbFbFb',
            '&:hover': {backgroundColor: 'white',},
          },
      }}
    >
        <MenuItem className="nav-item"> <span>Dashboard</span> </MenuItem>
        <MenuItem className="nav-item"> <span>Profile</span> </MenuItem>
    </Menu>
    </Sidebar>
  )
}