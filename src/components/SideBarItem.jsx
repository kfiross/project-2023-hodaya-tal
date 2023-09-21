'use client'

import {Link, Typography} from "@mui/material";
import {DynamicFeed} from "@mui/icons-material";
import {usePathname, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const SideBarItem = ({icon, name, path, navigateTo}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isActive, setIsActive] = useState(pathname === path);
  useEffect(() => {
    setIsActive(pathname === path);
  }, [router, pathname])

  return (
    <li className={`sidebarListItem ${isActive ? 'active' : ''}`} onClick={()=> navigateTo(path)} >
      <Stack direction="row" alignItems="center" gap={1}>
        {icon}
        <Typography variant="body1">{name}</Typography>
      </Stack>
    </li>
  );
}

export default SideBarItem
