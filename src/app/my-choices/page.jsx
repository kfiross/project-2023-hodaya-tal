"use client"

import {Box, Button, Stack, Typography} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, {useState} from "react";
import API from "@/api/api";
import AuthUtils from "@/utils/authUtils";
import * as moment from "moment/moment";
import {MishmaretName} from '@/constants/app_consts'



const MyChoicesPage = () => {

  const [date, setDate] = useState(new Date());
  const [choices, setChoices] = useState({});

  /** @type HTMLFormElement */
  let myFormRef;

  /**
   * @param {number} adifut
   * @return {string}
   */
  const adifutName = (adifut) => {
    switch (adifut) {
      case 1:
        return "עדיפות ראשונה";
      case 2:
        return "עדיפות שנייה";
      case 3:
        return "עדיפות שלישית";
      case 4:
        return "עדיפות רביעית";
    }
    return ""
  }

  /**
   * @param {FormEvent<HTMLFormElement>} event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const onDate = moment(date).format('DD/MM/YYYY')
    const results = await API.getShomerShibutz(AuthUtils.userId(), onDate);
    setChoices(results);
  }

  return (
    <main>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"

          minHeight="80vh">

          <Stack direction={"column"} alignItems={"center"}>
            <Typography component="h1" variant="h5" sx={{fontWeight: 'bold'}} >
              הצגת העדפה למשמרת
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



                <Box height={"3vh"}/>
                <Button
                  // disabled={!date}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={onSubmit}
                  sx={{fontWeight: 'bold'}}
                >
                  הצגת בחירה
                </Button>

                <Box height={"3vh"}/>
                {Object.keys(choices).length !== 0 && choices['1'] &&
                  <>
                    <Box height={"3vh"}/>
                    <Typography variant="body1">
                      <b>{MishmaretName.boker}:</b> {`${adifutName(choices['1'])} (${choices['1']})`}
                    </Typography>
                    <Box height={"3vh"}/>
                    <Typography variant="body1">
                      <b>{MishmaretName.noon}:</b> {`${adifutName(choices['2'])} (${choices['2']})`}
                    </Typography>
                    <Box height={"3vh"}/>
                    <Typography variant="body1">
                      <b>{MishmaretName.eve}:</b> {`${adifutName(choices['3'])} (${choices['3']})`}
                    </Typography>
                    <Box height={"3vh"}/>
                    <Typography variant="body1">
                      <b>{MishmaretName.night}:</b> {`${adifutName(choices['4'])} (${choices['4']})`}
                    </Typography>
                  </>

                }
                {!choices['1'] && <Typography variant="body1" align="center">
                  לא נעשתה בחירה ביום שנבחר
                </Typography>}


              </Stack>
            </form>
          </Stack>

        </Box>

      </div>
    </main>
  )
}

export default MyChoicesPage;
