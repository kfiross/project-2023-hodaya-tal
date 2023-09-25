'use client'

import React from "react";
import '../styles/components/topbar.css'
import {AppConsts} from '@/constants/app_consts';
// import "./topbar.styles";
// import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import LogoutIcon from '@mui/icons-material/Logout';
// import dashboardUserStore from "../store/DashboardUser";
import {observer} from "mobx-react";
import { usePathname } from "next/navigation";
import AppDrawer from "./AppDrawer";
import AuthUtils from "@/utils/authUtils";
import {Box} from "@mui/material";

function HeaderBar(){
  const pathname = usePathname();

  return (
    <Box sx={{ boxShadow: 4 }}>
      <div className="topbar">
        <div className="topbarWrapper">

          <div className="topLeft">
            {pathname !== "/login" && <AppDrawer/>}
            <span className="logo">{AppConsts.app_name}</span>
          </div>
          <div className="topRight">
            {/*<div className="topbarIconContainer">*/}
            {/*  <NotificationsNone />*/}
            {/*  <span className="topIconBadge">2</span>*/}
            {/*</div>*/}
            {/*<div className="topbarIconContainer">*/}
            {/*  <Language />*/}
            {/*  <span className="topIconBadge">2</span>*/}
            {/*</div>*/}
            {/*<div className="topbarIconContainer">*/}
            {/*  <LogoutIcon onClick={handleLogout}/>*/}
            {/*  /!*<Settings />*!/*/}
            {/*</div>*/}
            {/*<img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />*/}
          </div>
        </div>
      </div>
    </Box>

  );
}

export default observer(HeaderBar);
