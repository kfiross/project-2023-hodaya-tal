import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./Sidebar";


const AppDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open) => {
    setIsOpen(open)
  };


  return (
    <div>
      <React.Fragment>
        <Button onClick={()=> toggleDrawer(true)}><MenuIcon /></Button>
        <Drawer
          anchor={'left'}
          open={isOpen}
          onClose={()=> toggleDrawer(false)}
        >
          <Box>
            <Sidebar toggleDrawer={toggleDrawer}/>
          </Box>
        </Drawer>

      </React.Fragment>
    </div>
  );
}

export default AppDrawer;
