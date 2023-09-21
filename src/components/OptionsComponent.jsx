import {Box, Stack, IconButton, Typography} from "@mui/material";
import * as React from "react";
import {useState} from "react";

const OptionsComponent = ({options}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const prevOption = () => {
    let newVal = selectedIndex-1;
    if (newVal < 0){
      newVal = options.length - 1;
    }
    setSelectedIndex(newVal)
  }

  const nextOption = () => {
    setSelectedIndex((selectedIndex+1) % options.length)
  }

  return (
    <Stack direction="row" alignItems="center" gap={3}>
      <Box>
        <IconButton onClick={prevOption}>
          <span>{"<"}</span>
        </IconButton>
      </Box>

      <Box width={4}/>
      <Typography component="h2" variant="h6">
        {options[selectedIndex]}
      </Typography>
      <Box width={4}/>
      <IconButton onClick={nextOption}>
        <span>{">"}</span>
      </IconButton>

    </Stack>
  )
}

export default OptionsComponent;
