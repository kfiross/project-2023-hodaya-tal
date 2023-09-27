import {Box, Button, CircularProgress, IconButton, Stack, Typography} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import * as moment from 'moment'
import API from "../api/api";
import BasicTable from "@/components/BasicTable";
import {delay} from '@/utils/utils';
import Grid from "@mui/material/Grid";
import * as Algo from "@/algo/algo";
import {MishmaretName} from "@/constants/app_consts";


const workerVetek = (worker) => {
  return moment().diff(moment(worker.beginWork, "DD.MM.YYYY"), "Y");
}

// TODO: better
const workers = [
  { id: 120, firstName: 'יוסי',  lastName: 'לוי', beginWork: "1.2.2018" },
  { id: 121, firstName: 'כוכבה', lastName: 'כהן', beginWork: "24.10.2020" },
  { id: 122, firstName: 'שירה',  lastName: 'יחזקאל', beginWork: "28.11.2022" },
  { id: 123, firstName: 'אביה',  lastName: 'סבג', beginWork: "17.5.2017" },
  { id: 124, firstName: 'דניאל', lastName: 'מירגן', beginWork: "4.9.2019" },
  { id: 125, firstName: 'טל',    lastName: 'מצליח', beginWork: " 6.8.2004" },
  { id: 126, firstName: 'הודיה', lastName: 'וייס', beginWork: "7.12.2021" },
  { id: 127, firstName: 'מוטי',  lastName: 'שלום', beginWork: "3.9.2016" },
  { id: 128, firstName: 'ויקי',  lastName: 'אברג’יל', beginWork: "28.2.2015" },
  { id: 129, firstName: 'ניסים', lastName: 'מסיקה', beginWork: "26.11.2013" },
  { id: 130, firstName: 'שי',     lastName: 'דואני', beginWork: "24.10.2012" },
  { id: 131, firstName: 'שירז',   lastName: 'לגזיאל', beginWork: "15.7.2011" },
  { id: 132, firstName: 'אלעד', lastName: 'מזרחי', beginWork: "9.10.2008" },
  { id: 133, firstName: 'רפאל', lastName: 'דוד', beginWork: "7.12.2006" },
  { id: 134, firstName: 'רם', lastName: 'שמואל', beginWork: "18.4.2005" },
  { id: 135, firstName: 'תומר', lastName: 'אבוטבול', beginWork: "4.3.2007" },
];

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

  const [algoResultsState, setAlgoResultsState] = useState('initial');
  const [algoResults1, setAlgoResults1] = useState(/** @type {number[][]} */[])
  const [algoResults2, setAlgoResults2] = useState(/** @type {number[][]} */[])
  const [algoResults3, setAlgoResults3] = useState(/** @type {number[][]} */[])
  const [algoResults4, setAlgoResults4] = useState(/** @type {number[][]} */[])
  const [algoResults5, setAlgoResults5] = useState(/** @type {number[][]} */[])

  const shomrimByVetek =
      shomrim.map((id) => workers.find((w) => w.id === id))
              .sort((w1, w2) => workerVetek(w2) - workerVetek(w1))


  useEffect(() => {
    jumpToToday()
  }, []);


  useEffect(() => {
    if(algoResultsState !== 'loading'){
      return;
    }

    delay(2000).then(() => {
      let promises = [
        getShibuzByAlgo(0),
        getShibuzByAlgo(1),
        getShibuzByAlgo(2),
        getShibuzByAlgo(3),
        getShibuzByAlgo(4),
      ];

      Promise.all(promises).then((res) => {

        console.log("=== FINISHED  TO RUN ON ALL DAYS === ")



        setAlgoResultsState('done');

        return res;
      }).then((res) => {
        // check hitnagshut
        console.log("===  Check hitnagshut === ")
        setAlgoResultsState('loading');
        delay(1000).then(async ()=> {
          const last = 3;
          const first = 0;
          for (let dayIndex=0; dayIndex<3; dayIndex ++){
            let todayLastShomerOrderID = res[dayIndex][last][1]
            let nextDayFirstShomerOrderID = res[dayIndex+1][first][1]
            //   console.log("todayLastShomer", todayLastShomer.id)
            //   console.log("nextDayFirstShomer", nextDayFirstShomer.id)
            if (todayLastShomerOrderID === nextDayFirstShomerOrderID){
              // we need to re run the next day with "-1" to this problematic shomer
              console.log("problem with: Shomer " + todayLastShomerOrderID)
              let newRes = await getShibuzByAlgo(dayIndex+1, {shomerId: shomrimByVetek[todayLastShomerOrderID].id})
              res[dayIndex+1] = newRes;

              console.log("updated day:", moment(startDate).add(dayIndex+1, "days").format('DD/MM/YYYY'))
            }

            setAlgoResults1(res[0]);
            setAlgoResults2(res[1]);
            setAlgoResults3(res[2]);
            setAlgoResults4(res[3]);
            setAlgoResults5(res[4]);
            setAlgoResultsState('done');
          }
        })

      }).catch((e) => {
            setAlgoResultsState('done');
          })
    });


    //

    // delay(2000).then(() => {
    //   getShibuzByAlgo(0).then(res => setAlgoResults1(res)).catch(() => setAlgoResults1([]));
    //   getShibuzByAlgo(1).then(res => setAlgoResults2(res)).catch(() => setAlgoResults2([]));
    //   getShibuzByAlgo(2).then(res => setAlgoResults3(res)).catch(() => setAlgoResults3([]));
    //   getShibuzByAlgo(3).then(res => setAlgoResults4(res)).catch(() => setAlgoResults4([]));
    //   getShibuzByAlgo(4).then(res => setAlgoResults5(res)).catch(() => setAlgoResults5([]));
    //   setAlgoResultsState('done');
    // });


  }, [algoResultsState]);

  useEffect(() => {
    const fromDate = moment(startDate).format('DD/MM/YYYY')
    const toDate = moment(startDate).add(6, "days").format('DD/MM/YYYY');

    const fetchData = async () => {
      if(choicesState !== 'loading'){
        return;
      }
      await delay(700);
      const results = [
        [],
        [],
        [],
        [],
        [],
      ];
      let k = 0

      for (let i=0; i<shomrimByVetek.length; i++){
        let shomer= shomrimByVetek[i];
        console.log("Shomer " + (i+1) +": id=" +shomer.id + " vetek=" + workerVetek(shomer))
      }
      let shomrimOrdered =  shomrimByVetek.map(w => w.id);

      for (let shomerId of shomrimOrdered) {

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
          const shibuzimForAllDays = await API.getShomerShibutzim(''+shomerId, fromDate, toDate)
          results[0][k] = shibuzimForAllDays[0]
          results[1][k] = shibuzimForAllDays[1]
          results[2][k] = shibuzimForAllDays[2]
          results[3][k] = shibuzimForAllDays[3]
          results[4][k] = shibuzimForAllDays[4]
        }

      k++;
      }


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
        console.error(156)
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
    setChoicesState("initial");
    setAlgoResultsState("initial")
  }

  const nextOption = () => {
    setStartDate(moment(startDate).add(7, 'days').toDate());
    setChoicesState("initial");
    setAlgoResultsState("initial")
  }

  const jumpToToday = () => {
    const days = firstDate.getDay() === 0 ? 6 : firstDate.getDay();
    console.log(days);
    setStartDate(moment().subtract(days, 'd').toDate());
  }

  const getShibuzByAlgo = async  (index, reduction) => {
    console.log("reduction", reduction)
    let allDaysChoices = [
      choices1,
      choices2,
      choices3,
      choices4,
      choices5,
    ];

    let results = [[1,0], [2, 0], [3, 0], [4, 0]];
    try {
      let c = allDaysChoices[index]



      /** @type {number[][]}*/
      let matrix = [];
      for (let i = 0; i < 4; i++) {
        matrix.push([]);
        for (let j = 1; j <= 4; j++) {
          if(!c[i][j]){
            return [];
          }
          matrix[i].push(c[i][j])
        }
      }




      let date = moment(startDate).add(index, 'days');
      console.log(`running algo for date ${date.format('DD-MM-YYYY')}..`)
      await delay(200);

      if(reduction != null){
        let shomer = shomrimByVetek.find(w => w.id === reduction.shomerId)
        let shomerIndex = shomrimByVetek.indexOf(shomer);
        console.log(`running algo for date ${date.format('DD-MM-YYYY')} with reduction for ${shomer.id}..`)

        matrix[shomerIndex-1][0] ++;
      }

      console.log("matrix")
      let arrText = "";
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          arrText += (matrix[i][j] ?? "?") + ' ';
        }
        arrText += '\n';
      }
      console.log(arrText);

      results = Algo.run(matrix);
    }
    catch (e){
      console.log(e);
    }
    return results;
  }

  const showChoices = () => {
    setChoices1([])
    setChoices2([])
    setChoices3([])
    setChoices4([])
    setChoices5([])
    setChoicesState('loading')
  }

  const showShibutim = () => {
    setAlgoResults1([])
    setAlgoResults2([])
    setAlgoResults3([])
    setAlgoResults4([])
    setAlgoResults5([])
    setAlgoResultsState('loading')
    // console.log(shomrim)
  }

  // const shomerInResults = (arr) => {
  //   console.log("arr=", arr)
  //   let shomerIndex = arr[1]
  //   let shomerId = shomrimByVetek.map(w => w.id)[shomerIndex-1]
  //   return workers.find(w => w.id == shomerId);
  // }

  const prettifyAlgoResults = (results) => {
    let text = ""
    for(let arr of results){
      let [mishmeretNumber, shomerIndex] = arr
      let shomerId = shomrimByVetek.map(w => w.id)[shomerIndex-1]
      let mishmaret = Object.values(MishmaretName)[mishmeretNumber-1]
      let shomer = workers.find(w => w.id == shomerId);
      if (shomer)
        text += `${mishmaret}: ${shomer.firstName} ${shomer.lastName} \n`
      else {
        text += `${mishmaret}: ? \n`
      }
    }
    if (!text){
      text = "חסר מידע אודות בחירה"
    }
    return text
  }

  return (
    <div>
      <Stack direction="row" alignItems="center" gap={3}>
        <Box>
          <IconButton onClick={nextOption}>
            <span>{"<"}</span>
          </IconButton>
        </Box>

        <Typography ariant="body1" >
          {`${startDateString()} - ${endDateString()}`}
        </Typography>
        <IconButton onClick={prevOption}>
          <span>{">"}</span>
        </IconButton>


        <Button variant="contained" onClick={jumpToToday}>שבוע נוכחי</Button>
        <Button
          variant="contained"
          disabled={shomrim.length !== 4}
          onClick={showChoices}
        >הצגת בחירות</Button>
      </Stack>
      <Box height={12}/>
      {/*<Stack direction="row" alignItems="center" gap={3}>*/}
      <Box>
        {/*<BasicTable choices={baseCompanyChoices} user={"base"}/>*/}

        {choicesState === 'loaded' &&

        <>
          <Grid container spacing={8}>
            <Grid item xs={8} md={6} lg={4}>
              <BasicTable choices={choices1} shomrim={shomrimByVetek} user={"users"} dateStr={moment(startDate).format('DD-MM-YYYY')}/>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <BasicTable choices={choices2} shomrim={shomrimByVetek}  user={"users"} dateStr={moment(moment(startDate).toDate()).add(1, 'd').format('DD-MM-YYYY')}/>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <BasicTable choices={choices3} shomrim={shomrimByVetek}  user={"users"} dateStr={moment(startDate).add(2, 'd').format('DD-MM-YYYY')}/>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <BasicTable choices={choices4} shomrim={shomrimByVetek}  user={"users"} dateStr={moment(startDate).add(3, 'd').format('DD-MM-YYYY')}/>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <BasicTable choices={choices5} shomrim={shomrimByVetek}  user={"users"} dateStr={moment(startDate).add(4, 'd').format('DD-MM-YYYY')}/>
            </Grid>
          </Grid>
          <Box height={"3vh"}/>
          <Button variant="contained" onClick={showShibutim}>הצגת שיבוצים</Button>

        </>
        }


        {choicesState === 'loading' && <CircularProgress/>}



      </Box>

      <Box>
        {algoResultsState === 'done' &&

          <>
            <Box height={"3vh"}/>
            <Typography variant="h6" sx={{fontWeight: 'bold'}} >
              תוצאות שיבוץ
            </Typography>
            <Box height={"3vh"}/>
            <Grid container spacing={4} >
              <Grid item xs={12} md={4} lg={2}>
                  <Stack direction="column" alignItems="start" gap={3}>
                    <Typography component="subtitle1" sx={{fontWeight: 'bold'}} >
                      {moment(startDate).add(0, 'd').format('DD-MM-YYYY')}
                    </Typography>
                    <Typography component="subtitle1"  style={{width: '20vw', whiteSpace: 'pre-line'}}>
                      {prettifyAlgoResults(algoResults1)}
                    </Typography>
                  </Stack>
              </Grid>

              <Grid item xs={12} md={4} lg={2}>
                <Stack direction="column" alignItems="start" gap={3}>
                  <Typography component="subtitle1" sx={{fontWeight: 'bold'}} >
                    {moment(startDate).add(1, 'd').format('DD-MM-YYYY')}
                  </Typography>
                  <Typography component="subtitle1"  style={{width: '20vw', whiteSpace: 'pre-line'}}>
                    {prettifyAlgoResults(algoResults2)}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item  xs={12} md={4} lg={2}>
                <Stack direction="column" alignItems="start" gap={3}>
                  <Typography component="subtitle1" sx={{fontWeight: 'bold'}} >
                    {moment(startDate).add(2, 'd').format('DD-MM-YYYY')}
                  </Typography>
                  <Typography component="subtitle1"  style={{width: '20vw', whiteSpace: 'pre-line'}}>
                    {prettifyAlgoResults(algoResults3)}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item  xs={12} md={4} lg={2}>
                <Stack direction="column" alignItems="start" gap={3}>
                  <Typography component="subtitle1" sx={{fontWeight: 'bold'}} >
                    {moment(startDate).add(3, 'd').format('DD-MM-YYYY')}
                  </Typography>
                  <Typography component="subtitle1"  style={{width: '20vw', whiteSpace: 'pre-line'}}>
                    {prettifyAlgoResults(algoResults4)}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item  xs={12} md={4} lg={2}>
                <Stack direction="column" alignItems="start" gap={3}>
                  <Typography component="subtitle1" sx={{fontWeight: 'bold'}} >
                    {moment(startDate).add(4, 'd').format('DD-MM-YYYY')}
                  </Typography>
                  <Typography component="subtitle1"  style={{width: '20vw', whiteSpace: 'pre-line'}}>
                    {prettifyAlgoResults(algoResults5)}
                  </Typography>
                </Stack>
              </Grid>




              {/*<Grid item xs={8} md={6} lg={4}>*/}
              {/*  <Stack direction="column" alignItems="center" gap={3}>*/}
              {/*    <Typography component="subtitle1" sx={{fontWeight: 'bold'}} >*/}
              {/*      {moment(startDate).add(1, 'd').format('DD-MM-YYYY')}*/}
              {/*    </Typography>*/}
              {/*    {algoResults2}*/}
              {/*  </Stack>*/}
              {/*</Grid>*/}
              {/*<Grid item xs={8} md={6} lg={4}>*/}
              {/*  <Stack direction="column" alignItems="center" gap={3}>*/}
              {/*    <Typography component="subtitle1" sx={{fontWeight: 'bold'}} >*/}
              {/*      {moment(startDate).add(2, 'd').format('DD-MM-YYYY')}*/}
              {/*    </Typography>*/}
              {/*    {algoResults3}*/}
              {/*  </Stack>*/}
              {/*</Grid>*/}
              {/*<Grid item xs={8} md={6} lg={4}>*/}
              {/*  <Stack direction="column" alignItems="center" gap={3}>*/}
              {/*    <Typography component="subtitle1" sx={{fontWeight: 'bold'}} >*/}
              {/*      {moment(startDate).add(3, 'd').format('DD-MM-YYYY')}*/}
              {/*    </Typography>*/}
              {/*    {algoResults4}*/}
              {/*  </Stack>*/}
              {/*</Grid>*/}
              {/*<Grid item xs={8} md={6} lg={4}>*/}
              {/*  <Stack direction="column" alignItems="center" gap={3}>*/}
              {/*    <Typography component="subtitle1" sx={{fontWeight: 'bold'}} >*/}
              {/*      {moment(startDate).add(4, 'd').format('DD-MM-YYYY')}*/}
              {/*    </Typography>*/}
              {/*    {algoResults5}*/}
              {/*  </Stack>*/}
              {/*</Grid>*/}
            </Grid>
          </>
        }

        {algoResultsState === 'loading' && <CircularProgress/>}

      </Box>

    </div>
  )
}

export default WeekDates;
