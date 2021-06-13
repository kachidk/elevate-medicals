import React, { useState, useEffect } from 'react';
import DoctorLayout from './DoctorLayout/DoctorLayout';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from "react-js-pagination";
import TextField from "@material-ui/core/TextField";
import BadgeText from "@/components/BadgeText";
import Today from '@material-ui/icons/Today';
import axios from 'axios';

const columns = [
  { id: 'name',
    label: 'Name',
    minWidth: 170
  },
  { id: 'patientId',
    label: 'Patient ID',
    minWidth: 100
  },
  {
    id: 'age',
    label: 'Age',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
  },
];

function DoctorDashboard() {
  const [ongoingCount, setOngoingCount] = useState();
  const [completedCount, setCompletedCount] = useState();
  const [ongoingData, setOngoingData] = useState(null);
  const [searchState, setSearchState] = useState('');

  const classes = useStyles();

  useEffect(() => {
    async function fetchCount() {
      const res1 = await axios.get('doctorOngoingTodayAppointmentCount')
      const res2 = await axios.get('doctorCompletedTodayAppointmentCount')
      setOngoingCount(res1.data)
      setCompletedCount(res2.data)
    }
    fetchCount();
  }, [])

  function fetchOngoingData(pageNumber = 1) {
    axios.get("doctorTodayOngoingAppointment",{
        params: {
          page: pageNumber,
          searchValue: searchState.length >= 4 ? searchState : '',
        }
    }).then((res)=>{
        setOngoingData(res.data)
      }).catch((err)=>{
        if(err.response){
          Object.keys(err.response.data.errors).forEach(key=>{
            alert("error: " + err.response.data.errors[key][0])
          })
        }
      })
  }
  useEffect(() => {
    if(searchState.length >= 4 || searchState.length == 0){
      fetchOngoingData()
    }
  }, [searchState])

  return (
    <div>
      <DoctorLayout>
        <div className="header">
          <div className="header-text">
            Doctor Dashboard
          </div>
        </div>

        <div className="grid gap-6 mx-auto mb-8 md:grid-cols-2 xl:grid-cols-2 w-max">
              {/* <!-- Card --> */}
              <div
                className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <div
                  className="p-3 mr-4 text-red-500 bg-red-100 rounded-full dark:text-blue-100 dark:bg-blue-500"
                >
                  <Today/>
                </div>
                <div>
                  <p
                    className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    Today's ongoing appointment
                  </p>
                  <p
                    className="text-lg font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {ongoingCount}
                  </p>
                </div>
              </div>
              {/* <!-- Card --> */}
              <div
                className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <div
                  className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
                >
                  <Today/>
                </div>
                <div>
                  <p
                    className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    Today's completed appointment
                  </p>
                  <p
                    className="text-lg font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {completedCount}
                  </p>
                </div>
              </div>
            </div>

            <div>
       {/* search */}
       <div className="flex items-center justify-between px-2">
          <div>
            <h1 className="font-bold text-md">
              Today's Ongoing Appointments
            </h1>
          </div>
          <TextField
            label="Search"
            id="patientId"
            placeholder="Search (min 4 letters)"
            margin="normal"
            variant="outlined"
            onChange={(e)=>setSearchState(e.target.value)}
          />
        </div>

        {/* table */}
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                { ongoingData &&
                  ongoingData.data.map((xyz, index)=>(
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          <TableCell>
                            <span>
                              {xyz.patient_name}
                            </span>
                          </TableCell>
                          <TableCell>
                            {xyz.patient_id}
                          </TableCell>
                          <TableCell>
                            {xyz.patient_age}
                          </TableCell>
                          <TableCell>
                            <BadgeText type={xyz.status == "ongoing" ? "danger" : null}>
                              {xyz.status}
                            </BadgeText>
                          </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>

          {/* pagination */}
          <div className="flex justify-end p-2 mr-4 md:p-5">
          {
            ongoingData &&
              <Pagination
                activePage={ongoingData.current_page}
                itemsCountPerPage={ongoingData.per_page}
                totalItemsCount={ongoingData.total}
                pageRangeDisplayed={5}
                onChange={(pageNumber)=> fetchOngoingData(pageNumber)}
                pageRangeDisplayed={screen.width < 768 ? 3 : 5}
                innerClass="inline-flex items-center text-gray-700"
                itemClassPrev="mr-2"
                itemClassNext="ml-2"
                itemClass="px-3 py-1 rounded-md cursor-pointer"
                hideFirstLastPages
                activeClass="text-white bg-blue-600 border border-blue-600"
              />
          }
          </div>
          {/* ! pagination */}

        </Paper>
        {/* ! table */}
      </div>
      </DoctorLayout>
    </div>
  )
}

export default DoctorDashboard

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
