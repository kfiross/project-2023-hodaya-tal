import {Autocomplete, TextField, Box} from "@mui/material";
import * as React from 'react';

const ChooseWorker = ({counter, onChange}) => {

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

  const options = workers.map((worker) => {
    return `${worker.id} - ${worker.firstName} ${worker.lastName}`;
  }).sort((w1, w2) => w1.localeCompare(w2));


  const onSelected = (name) => {
    console.log(name);
    if (!name){
      onChange(null);
      return;
    }
    const worker = workers.find(w => name === `${w.id} - ${w.firstName} ${w.lastName}`)
    if (worker) {
      console.log("workerId=", worker.id)
    }
    onChange(worker.id)
  }

  return (
    <Box>
      <Autocomplete
        disablePortal
        onChange={(event, newValue) => {
          // setValue(newValue);
          onSelected(newValue);
        }}
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}

        renderInput={(params) => {

          const label = `שומר ${counter}`
          return <TextField variant="filled"
                            margin="normal" {...params} label={label}/>;
        }}
      />
    </Box>
  );
}

export default ChooseWorker;
