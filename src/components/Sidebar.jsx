
import '../styles/components/sidebar.css'

import {
  LineStyle,
  TrendingUp,
  Storefront,
  DynamicFeed, WorkOutline,
} from "@mui/icons-material";
import TuneIcon from '@mui/icons-material/Tune';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import React, { useState } from "react";
import PollIcon from '@mui/icons-material/Poll';
import CommentIcon from '@mui/icons-material/Comment';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import {useRouter} from "next/navigation";
import {Box, Button, Link, Typography} from "@mui/material";
import SideBarItem from "@/components/SideBarItem";
import AuthUtils from "@/utils/authUtils";
import Stack from "@mui/material/Stack";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PrefsUtils, {PrefsKeys} from "@/utils/prefsUtils";
import MyChoicesPage from "@/app/my-choices/page";
import {CalendarIcon} from "@mui/x-date-pickers";

const Sidebar = (props) => {
  const [active, setActive] = useState('')
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const admin = PrefsUtils.getString(PrefsKeys.USER_TYPE) === 'admin';

  function navigateTo(to) {
    setActive(to)
    props.toggleDrawer(false)
    router.push(to);
  }


  const logout = () => {
    dismissDialog();
    AuthUtils.logoutUser().then(() => {
      PrefsUtils.clear();
      router.replace('/login');
    });
  }

  const dismissDialog = () => {
    setDialogOpen(false);
  };


  const showDialog = () => {
    setDialogOpen(true);
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">

        {!admin &&
          <div className="sidebarMenu">
            {/*<h3 className="sidebarTitle">Dashboard</h3>*/}
            <ul className="sidebarList">
              <SideBarItem name={"המשמרות שלי"} icon={<CalendarIcon  className="sidebarIcon" />} path={'/page1'} navigateTo={navigateTo}/>
              <SideBarItem name={"העדפות למשמרת"} icon={<EventAvailableIcon className="sidebarIcon" />} path={'/my-choices'} navigateTo={navigateTo}/>
              <SideBarItem name={"הוספת העדפה חדשה"} icon={<EditCalendarIcon className="sidebarIcon" />} path={'/page2'} navigateTo={navigateTo}/>
              {/*<SideBarItem name={"עדכון פרטי עובד"} icon={<TuneIcon className="sidebarIcon" />} path={'/page3'} navigateTo={navigateTo}/>*/}
            </ul>
          </div>
        }
        {admin &&
          <div className="sidebarMenu">
            {/*<h3 className="sidebarTitle">Dashboard</h3>*/}
            <ul className="sidebarList">
              <SideBarItem name={"עדכון משמרות"} icon={<TuneIcon className="sidebarIcon" />} path={'/admin/update-mismarot'} navigateTo={navigateTo}/>
              <SideBarItem name={"הצגת פרטי עובדים"} icon={<EventAvailableIcon className="sidebarIcon" />} path={'/admin/all-workers'} navigateTo={navigateTo}/>
            </ul>
          </div>
        }

        <Box sx={{height:"auto"}}></Box>
        <div>
          <ul className="sidebarList">
            <li className={'sidebarListItem'} onClick={()=> showDialog()} >
              <Stack direction="row" alignItems="center" gap={1}>
                <LogoutIcon onClick={showDialog}/>
                <Typography variant="body1">להתנתקות</Typography>
              </Stack>
            </li>
          </ul>
        </div>



        {/*<div className="sidebarMenu">*/}
        {/*  <h3 className="sidebarTitle">Dashboard</h3>*/}
        {/*  <ul className="sidebarList">*/}
        {/*    <li className={`sidebarListItem ${active === '/home'? 'active' : ''}`} onClick={()=> navigateTo('/home')}>*/}
        {/*      <Link to="/home" className="link" onClick={()=> navigateTo('/home')}>*/}
        {/*        <LineStyle className="sidebarIcon" />*/}
        {/*        Home*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*    /!*<li className="sidebarListItem">*!/*/}
        {/*    /!*  <Timeline className="sidebarIcon" />*!/*/}
        {/*    /!*  Analytics*!/*/}
        {/*    /!*</li>*!/*/}
        {/*    <li className={`sidebarListItem ${active === '/posts'? 'active' : ''}`} onClick={()=> navigateTo('/posts')}>*/}
        {/*      <Link to="/posts" className="link" onClick={()=> navigateTo('/posts')}>*/}
        {/*        <TrendingUp className="sidebarIcon" />*/}
        {/*        Posts*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*    <li className={`sidebarListItem ${active === '/allComments'? 'active' : ''}`} onClick={()=> navigateTo('/allComments')}>*/}
        {/*      <Link to="/allComments" className="link" onClick={()=> navigateTo('/allComments')}>*/}
        {/*        <CommentIcon className="sidebarIcon" />*/}
        {/*        Comments*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}

        {/*<div className="sidebarMenu">*/}
        {/*  <h3 className="sidebarTitle">Moderation</h3>*/}
        {/*  <ul className="sidebarList">*/}
        {/*    /!*<Link to="/users" className="link">*!/*/}
        {/*    /!*  <li className="sidebarListItem">*!/*/}
        {/*    /!*    <PermIdentity className="sidebarIcon" />*!/*/}
        {/*    /!*    Users*!/*/}
        {/*    /!*  </li>*!/*/}
        {/*    /!*</Link>*!/*/}
        {/*    <li className={`sidebarListItem ${active === '/moderation/posts'? 'active' : ''}`} onClick={()=> navigateTo('/moderation/posts')}>*/}
        {/*      <Link to="/moderation/posts" className="link" onClick={()=> navigateTo('/moderation/posts')}>*/}
        {/*        <Storefront className="sidebarIcon" />*/}
        {/*        Moderate Posts*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*    <li className={`sidebarListItem ${active === '/moderation/comments'? 'active' : ''}`} onClick={()=> navigateTo('/moderation/comments')}>*/}
        {/*      <Link to="/moderation/comments" className="link" onClick={()=> navigateTo('/moderation/comments')}>*/}
        {/*        <Storefront className="sidebarIcon" />*/}
        {/*        Moderate Comments*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}

        {/*<div className="sidebarMenu">*/}
        {/*  <h3 className="sidebarTitle">Create</h3>*/}
        {/*  <ul className="sidebarList">*/}
        {/*    /!*<li className="sidebarListItem">*!/*/}
        {/*    /!*  <WorkOutline className="sidebarIcon" />*!/*/}
        {/*    /!*  Settings*!/*/}
        {/*    /!*</li>*!/*/}
        {/*    */}

        {/*    <li className={`sidebarListItem ${active === '/newPoll'? 'active' : ''}`} onClick={()=> navigateTo('/newPoll')}>*/}
        {/*      <Link to="/newPoll" className="link" onClick={()=> navigateTo('/newPoll')}>*/}
        {/*        <PollIcon className="sidebarIcon" />*/}
        {/*        New Water Io poll*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}
      </div>
      <Dialog
        open={dialogOpen}
        onClose={dismissDialog}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"התנתקות"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            להתנתק מהחשבון?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={logout} autoFocus>אישור</Button>
          <Button onClick={dismissDialog}>ביטול</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Sidebar;
