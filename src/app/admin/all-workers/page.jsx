
import * as React from 'react';
import {Box, Typography} from "@mui/material";
import WorkersTable from "./WorkersTable";
import {delay} from "../../../utils/utils";

async function fetchWorkers() {
  await delay(1000);

  const jsonData = [
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

  return jsonData;
}

const AllWorkersPage = async () => {
  const rows = await fetchWorkers()

  return (
    <div>
      <div style={{ marginLeft: "10vw", marginTop: 40, height: "80vh", width: '80%', marginRight: "10vw"}}>
        <Typography component="h1" variant="h5" sx={{fontWeight: 'bold'}} >
          פרטי עובדים
        </Typography>
        <Box height={"12px"}/>
        <WorkersTable rows={rows}/>
      </div>
    </div>
  );
};

export default AllWorkersPage;

// 5.7 - 52
// 10.11 - 55

// 22 ah katan
// 19 ah moed katn
