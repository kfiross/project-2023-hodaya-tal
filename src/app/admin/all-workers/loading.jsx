import {Box, CircularProgress} from "@mui/material";
import * as React from "react";

const Loading = () => {
  return (
    <main>
      <Box   display="flex"
             justifyContent="center"
             alignItems="center"
             minHeight="80vh">
        <CircularProgress/>
        <Box width={12}/>
        <p>טוען פרטים...</p>

      </Box>
    </main>
  )
}

export default Loading;
