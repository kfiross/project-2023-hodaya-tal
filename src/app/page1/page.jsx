'use client'

import HeaderBar from "../../components/HeaderBar";
import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import heLocale from '@fullcalendar/core/locales/he';
import moment from "moment";
// import {createStyles, makeStyles} from "@mui/material";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     calendar: {
//       // Your custom styles for the calendar container
//     },
//   })
// );

const Page1 = () => {
  // const classes = useStyles();

  return(
    <div>

      <div>
        <FullCalendar
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin
          ]}
          hiddenDays={[5,6]} // hide "Jewish" weekends
          titleFormat={{
             month: "long",
              year: "numeric",
             //  omitCommas: true,
             // year: "2-digit",
             // separator: ' עד ה- '
          }}

          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}

          height={'90vh'}
          expandRows={true}
          contentHeight={"80vh"}
          locale={heLocale}
          initialView='timeGridWeek'
          nowIndicator={false}
          editable={false}
          selectable={false}
          allDaySlot={false}
          selectMirror={true}
          direction={"rtl"}
          displayEventEnd={true}
          eventTimeFormat={{
            hour:   '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          resources={[
            { id: 'a', title: 'Auditorium A', eventColor: 'color'},
            // { id: 'b', title: 'Auditorium B', eventColor: 'green' },
            // { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
          ]}
          events={
            [
              {
                title: 'משמרת לילה',
                start: moment('11-09-2023 22:00', "DD-MM-YYYY HH:mm").format('YYYY-MM-DDTHH:mm:ssZ'),
                end: moment('12-09-2023 06:00', "DD-MM-YYYY HH:mm").format('YYYY-MM-DDTHH:mm:ssZ'),
                resourceId: 'a'
              }
            ]
          }
        />
      </div>

    </div>
  );
}

export default Page1;
