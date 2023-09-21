'use client'

import moment from "moment/moment";
import {DataGrid, heIL} from "@mui/x-data-grid";
import * as React from "react";

const WorkersTable = ({rows}) =>{
  const columns = [
    { field: 'id', headerName: 'מספר עובד', width: 100 },
    { field: 'firstName', headerName: 'שם פרטי', width: 120 },
    { field: 'lastName', headerName: 'שם משפחה', width: 120 },
    {
      field: 'beginWork',
      headerName: 'תחילת עבודה',
      type: 'number',
      sortable: false,
      width: 120,
    },
    {
      field: 'vetek',
      headerName: 'וותק (בשנים)',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${moment().diff(moment(params.row.beginWork, "DD.MM.YYYY"), "Y")}`,
    },
  ];

  return (
    <DataGrid
      localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 20]}
      disableColumnFilter={true}
      rowSelection={false}
      // checkboxSelection
    />
  )

}

export default WorkersTable
