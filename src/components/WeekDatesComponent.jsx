import {Box, Stack, IconButton, Typography, Button, CircularProgress} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import * as moment from 'moment'
import API from "../api/api";
import BasicTable from "@/components/BasicTable";
import {delay, shuffleArray, transpose} from '@/utils/utils';
import Grid from "@mui/material/Grid";
import ChooseWorker from "@/components/ChooseWorker";


const baseCompanyChoices = [
  {'1': 1, '2': 2, '3': 3, '4': 4},
  {'1': 2, '2': 1, '3': 3, '4': 4},
  {'1': 3, '2': 4, '3': 2, '4': 1},
  {'1': 4, '2': 3, '3': 2, '4': 1},
];


const WeekDates = ({firstDate, shomrim}) => {
  const [startDate, setStartDate] = useState(firstDate);

  const [choicesState, setChoicesState] = useState('initial');

  const [choices1, setChoices1] = useState(/**@type {Array<Object>} */[]);
  const [choices2, setChoices2] = useState(/**@type {Array<Object>} */[]);
  const [choices3, setChoices3] = useState(/**@type {Array<Object>} */[]);
  const [choices4, setChoices4] = useState(/**@type {Array<Object>} */[]);
  const [choices5, setChoices5] = useState(/**@type {Array<Object>} */[]);


  useEffect(() => {
    jumpToToday()
  }, []);


  useEffect(() => {
    const fromDate = moment(startDate).format('DD/MM/YYYY')
    const toDate = moment(startDate).add(6, "days").format('DD/MM/YYYY');

    const fetchData = async () => {
      if(choicesState !== 'loading'){
        return;
      }
      await delay(2000);
      const results = [
        [],
        [],
        [],
        [],
        [],
      ];
      let k = 0
      for (let shomerId of shomrim) {

        // let arr = new Map<number, number>();

        if (shomerId < 0) {
          console.log("missing shomerId")
          results[0][k] = {1 :null, 2: null, 3: null, 4: null}
          results[1][k] = {1 :null, 2: null, 3: null, 4: null}
          results[2][k] = {1 :null, 2: null, 3: null, 4: null}
          results[3][k] = {1 :null, 2: null, 3: null, 4: null}
          results[4][k] = {1 :null, 2: null, 3: null, 4: null}
        }
        else {
          console.log("shomerId=", shomerId)
          const shibuzimForAllDays = await API.getShomerShibutzim(''+shomerId, fromDate, toDate)
          console.log(shibuzimForAllDays)
          results[0][k] = shibuzimForAllDays[0]
          results[1][k] = shibuzimForAllDays[1]
          results[2][k] = shibuzimForAllDays[2]
          results[3][k] = shibuzimForAllDays[3]
          results[4][k] = shibuzimForAllDays[4]
        }

      k++;
      }

      console.log(results)

      setChoices1(results[0])
      setChoices2(results[1])
      setChoices3(results[2])
      setChoices4(results[3])
      setChoices5(results[4])
      setChoicesState('loaded')
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch((e) => {
        console.error(e)
        setChoices1([])
        setChoices2([])
        setChoices3([])
        setChoices4([])
        setChoices5([])
        setChoicesState('error')
      });


  },[startDate, choicesState])


  const startDateString = () => {
    return moment(startDate).format("DD/MM/YYYY")
  }

  const endDateString = () => {
    return moment(startDate).add(6, 'days').format("DD/MM/YYYY")
  }

  const prevOption = () => {
    setStartDate(moment(startDate).subtract(7, 'days').toDate());
  }

  const nextOption = () => {
    setStartDate(moment(startDate).add(7, 'days').toDate());
  }

  const jumpToToday = () => {
    const days = firstDate.getDay() === 0 ? 6 : firstDate.getDay();
    console.log(days);
    setStartDate(moment().subtract(days, 'd').toDate());
  }

  const showChoices = () => {
    setChoices1([])
    setChoices2([])
    setChoices3([])
    setChoices4([])
    setChoices5([])
    setChoicesState('loading')
    // console.log(shomrim)
  }

  return (
    <div>
      <Stack direction="row" alignItems="center" gap={3}>
        <Box>
          <IconButton onClick={nextOption}>
            <span>{"<"}</span>
          </IconButton>
        </Box>

        <Typography component="h2" variant="h6">
          {`${startDateString()} - ${endDateString()}`}
        </Typography>
        <IconButton onClick={prevOption}>
          <span>{">"}</span>
        </IconButton>

        <Box width={8}/>
        <Button variant="contained" onClick={jumpToToday}>היום</Button>
        <Button variant="contained" onClick={showChoices}>הצגת בחירות</Button>
      </Stack>
      <Box height={12}/>
      <Stack direction="row" alignItems="center" gap={3}>
        {/*<BasicTable choices={baseCompanyChoices} user={"base"}/>*/}

        {choicesState === 'loaded' &&

        <>
          <Grid container spacing={8}>
            <Grid item xs={8} md={6} lg={4}>
              <BasicTable choices={choices1} user={"users"} dateStr={moment(startDate).format('DD-MM-YYYY')}/>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <BasicTable choices={choices2} user={"users"} dateStr={moment(moment(startDate).toDate()).add(1, 'd').format('DD-MM-YYYY')}/>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <BasicTable choices={choices3} user={"users"} dateStr={moment(startDate).add(2, 'd').format('DD-MM-YYYY')}/>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <BasicTable choices={choices4} user={"users"} dateStr={moment(startDate).add(3, 'd').format('DD-MM-YYYY')}/>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <BasicTable choices={choices5} user={"users"} dateStr={moment(startDate).add(4, 'd').format('DD-MM-YYYY')}/>
            </Grid>
          </Grid>
        </>
        }


        {choicesState === 'loading' && <CircularProgress/>}



      </Stack>

    </div>
  )
}

export default WeekDates;
