'use client'

import HeaderBar from "@/components/HeaderBar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import {Select, SelectChangeEvent, Typography} from "@mui/material";
import {useState} from "react";


import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Stack from "@mui/material/Stack";
import ChooseWorker from "../../../components/ChooseWorker";
import WeekDates from "@/components/WeekDatesComponent";


const Page4 = () => {
    const [age, setAge] = useState('');
    const [shomer1, setShomer1] = useState(-1);
    const [shomer2, setShomer2] = useState(-2);
    const [shomer3, setShomer3] = useState(-3);
    const [shomer4, setShomer4] = useState(-4);

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const options = ["1","2","3","4","5"]

    // calculate weeks
    const weeks = [];


    return (
        <div>
            <Box sx={{m: 4}}>

                <Typography variant="h6" sx={{fontWeight: 'bold'}} >
                    בחירת עובדים
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={8} md={6} lg={3}>
                        <ChooseWorker counter={1} onChange={(id: number) => setShomer1(id)}/>
                    </Grid>
                    <Grid item xs={8} md={6} lg={3}>
                        <ChooseWorker counter={2} onChange={(id: number) => setShomer2(id)}/>
                    </Grid>
                    <Grid item xs={8} md={6} lg={3}>
                        <ChooseWorker counter={3} onChange={(id: number) => setShomer3(id)}/>
                    </Grid>
                    <Grid item xs={8} md={6} lg={3}>
                        <ChooseWorker counter={4} onChange={(id: number) => setShomer4(id)}/>
                    </Grid>
                <Box height={"4vh"}/>
                </Grid>
                <Typography variant="h6"  sx={{fontWeight: 'bold'}} >
                    בחירת שבוע עבודה
                </Typography>
                {/*<OptionsComponent options={options}/>*/}
                <WeekDates firstDate={new Date()} shomrim={[shomer1, shomer2, shomer3, shomer4]} />
            </Box>
        </div>
    );
};

export default Page4;

//
// <Stack direction="row" alignItems="center" gap={4}>
//     {/*<FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>*/}
//     {/*    <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>*/}
//     {/*    <Select*/}
//     {/*        labelId="demo-simple-select-filled-label"*/}
//     {/*        id="demo-simple-select-filled"*/}
//     {/*        value={age}*/}
//     {/*        onChange={handleChange}*/}
//     {/*    >*/}
//     {/*        <MenuItem value="">*/}
//     {/*            <em>None</em>*/}
//     {/*        </MenuItem>*/}
//     {/*        <MenuItem value={10}>Ten</MenuItem>*/}
//     {/*        <MenuItem value={20}>Twenty</MenuItem>*/}
//     {/*        <MenuItem value={30}>Thirty</MenuItem>*/}
//     {/*    </Select>*/}
//     {/*</FormControl>*/}
//
//     {/*<FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>*/}
//     {/*    <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>*/}
//     {/*    <Select*/}
//     {/*        labelId="demo-simple-select-filled-label"*/}
//     {/*        id="demo-simple-select-filled"*/}
//     {/*        value={age}*/}
//     {/*        onChange={handleChange}*/}
//     {/*    >*/}
//     {/*        <MenuItem value="">*/}
//     {/*            <em>None</em>*/}
//     {/*        </MenuItem>*/}
//     {/*        <MenuItem value={10}>Ten</MenuItem>*/}
//     {/*        <MenuItem value={20}>Twenty</MenuItem>*/}
//     {/*        <MenuItem value={30}>Thirty</MenuItem>*/}
//     {/*    </Select>*/}
//     {/*</FormControl>*/}
//
//     {/*<FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>*/}
//     {/*    <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>*/}
//     {/*    <Select*/}
//     {/*        labelId="demo-simple-select-filled-label"*/}
//     {/*        id="demo-simple-select-filled"*/}
//     {/*        value={age}*/}
//     {/*        onChange={handleChange}*/}
//     {/*    >*/}
//     {/*        <MenuItem value="">*/}
//     {/*            <em>None</em>*/}
//     {/*        </MenuItem>*/}
//     {/*        <MenuItem value={10}>Ten</MenuItem>*/}
//     {/*        <MenuItem value={20}>Twenty</MenuItem>*/}
//     {/*        <MenuItem value={30}>Thirty</MenuItem>*/}
//     {/*    </Select>*/}
//     {/*</FormControl>*/}
//
//     {/*<FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>*/}
//     {/*    <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>*/}
//     {/*    <Select*/}
//     {/*        labelId="demo-simple-select-filled-label"*/}
//     {/*        id="demo-simple-select-filled"*/}
//     {/*        value={age}*/}
//     {/*        onChange={handleChange}*/}
//     {/*    >*/}
//     {/*        <MenuItem value="">*/}
//     {/*            <em>None</em>*/}
//     {/*        </MenuItem>*/}
//     {/*        <MenuItem value={10}>Ten</MenuItem>*/}
//     {/*        <MenuItem value={20}>Twenty</MenuItem>*/}
//     {/*        <MenuItem value={30}>Thirty</MenuItem>*/}
//     {/*    </Select>*/}
//     {/*</FormControl>*/}
//
//     <ChooseWorker />
//
//     <ChooseWorker />
//
//     <ChooseWorker />
//
//     <ChooseWorker />
// </Stack>
