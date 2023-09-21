'use client'

import React, {useRef, useState} from "react";
import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "dayjs/locale/he";
import dayjs from 'dayjs';
import API from "../../api/api";
import AuthUtils from "../../utils/authUtils";

const Page2 = () => {
  const [date, setDate] = useState(new Date());
  /** @type HTMLFormElement */
  let myFormRef;

  const [boker, setBoker] = useState(/** @type {number|null} */null)
  const [noon, setNoon] = useState(/** @type {number|null} */null)
  const [eve, setEve] = useState(/** @type {number|null} */null)
  const [night, setNight] = useState(/** @type {number|null} */null)


  const cleanForm = () => {

    myFormRef.reset();

  }
  /**
   * @returns {string|null}
   */
  const isFormValid = () => {
    let prefs = [];
    prefs.push(boker);
    prefs.push(noon);
    prefs.push(eve);
    prefs.push(night);
    if (prefs.size < 4) {
      return "must choose all 4 mishmarot";
    }

    const set = Array.from(new Set(prefs));
    if (set.length < 4){
      return "must choose unique value to each mishmarot";
    }

    const sum = prefs.reduce((a, b) => a + b, 0);
    if (sum !== 10) {
      return "must choose prefs are have to be between 1 to 4";
    }

    console.log("all good!!")
    return null;
  };
  /**
   * @param {FormEvent<HTMLFormElement>} event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const errorMsg = isFormValid();
    if (errorMsg){
      return alert(errorMsg);
    }

    const promises = [
      API.addShibutz(AuthUtils.userId(), 1, boker, date),
      API.addShibutz(AuthUtils.userId(), 2, noon, date),
      API.addShibutz(AuthUtils.userId(), 3, eve, date),
      API.addShibutz(AuthUtils.userId(), 4, night, date),
    ];

    const resolvers = await Promise.all(promises)

    console.log(resolvers);

    cleanForm();
  };

  return(
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"

        minHeight="80vh">

        <Stack direction={"column"} alignItems={"center"}>
          <Typography component="h1" variant="h5" sx={{fontWeight: 'bold'}} >
            הוספת העדפה למשמרת
          </Typography>
          <Box height={"12px"}/>

          <form onSubmit={onSubmit} ref={(el) => myFormRef = el}>
            <Stack direction="column" width="22vw" minWidth={"320px"}>
              <LocalizationProvider adapterLocale="he" dateAdapter={AdapterDayjs}>
                <DatePicker
                  format={"DD/MM/YYYY"}
                  label="תאריך"
                  minDate={dayjs("01/08/2023",'DD/MM/YYYY')}
                  slotProps={{ textField: { variant: 'filled' } }}
                  value={dayjs(date)}
                  onChange={(value) => {
                    if (!value) {
                      return
                    }
                    const pickedDate = new Date(Date.parse(value.format()));
                    const startOfDayDate = new Date(pickedDate.getFullYear(), pickedDate.getMonth(), pickedDate.getDate());
                    setDate(startOfDayDate)
                  }}
                />
              </LocalizationProvider>
              <Box height={"1vh"}/>
              <p>
                יש לבחור את ההעדפות שלך לכל משמרת בתאריך שנבחר:
              </p>
              <Box height={"2vh"}/>
              <TextField id="mishmeret-1" label="משמרת בוקר" variant="filled"
                         onChange={(ev) => setBoker(parseInt(ev.target.value))}
                         placeholder={"יש לדרג בין 1 (הכי רוצה) ל-4 (הכי פחות רוצה)"}
              />
              <Box height={"3vh"}/>
              <TextField id="mishmeret-2" label="משמרת צהריים" variant="filled"
                         onChange={(ev) => setNoon(parseInt(ev.target.value))}
                         placeholder={"יש לדרג בין 1 (הכי רוצה) ל-4 (הכי פחות רוצה)"}
              />
              <Box height={"3vh"}/>
              <TextField id="mishmeret-3" label="משמרת ערב" variant="filled"
                         onChange={(ev) => setEve(parseInt(ev.target.value))}
                         placeholder={"יש לדרג בין 1 (הכי רוצה) ל-4 (הכי פחות רוצה)"}
              />
              <Box height={"3vh"}/>
              <TextField id="mishmeret-4" label="משמרת לילה" variant="filled"
                         onChange={(ev) => setNight(parseInt(ev.target.value))}
                         placeholder={"יש לדרג בין 1 (הכי רוצה) ל-4 (הכי פחות רוצה)"}
              />
              <Box height={"3vh"}/>
              <Button
                disabled={!boker || !noon || !eve || !night}
                variant="contained"
                color="primary"
                type="submit"
                onClick={onSubmit}
                sx={{fontWeight: 'bold'}}
              >
                הוספת שיבוץ
              </Button>
            </Stack>
          </form>
        </Stack>

      </Box>

    </div>
  );
}

export default Page2;
