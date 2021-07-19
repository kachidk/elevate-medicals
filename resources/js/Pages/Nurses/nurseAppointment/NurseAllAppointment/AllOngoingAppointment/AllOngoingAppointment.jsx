import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Pagination from "react-js-pagination";
import TextField from "@material-ui/core/TextField";
import AllOngoingInfo from "./AllOngoingInfo";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "patientId", label: "Patient ID", minWidth: 100 },
  {
    id: "age",
    label: "Age",
    minWidth: 170,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
  },
];

function OngoingAllAppointment() {
  const [ongoingData, setOngoingData] = useState(null);
  const [searchState, setSearchState] = useState("");
  const [ongoingInfo, setOngoingInfo] = useState(null);

  const classes = useStyles();

  function fetchData(pageNumber = 1) {
    axios
      .get("nurseAllOngoingAppointment", {
        params: {
          page: pageNumber,
          searchValue: searchState.length >= 4 ? searchState : "",
        },
      })
      .then((res) => {
        setOngoingData(res.data);
      })
      .catch((err) => {
        if (err.response) {
          Object.keys(err.response.data.errors).forEach((key) => {
            alert("error: " + err.response.data.errors[key][0]);
          });
        }
      });
  }

  useEffect(() => {
    if (searchState.length >= 4 || searchState.length == 0) {
      fetchData();
    }
  }, [searchState]);

  // patient information
  function getOngoingInfo(id) {
    axios
      .get("nurseAllOngoingInfo", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setOngoingInfo(res.data);
      })
      .catch((err) => {
        if (err.response) {
          Object.keys(err.response.data.errors).forEach((key) => {
            alert("error: " + err.response.data.errors[key][0]);
          });
        }
      });
  }
  return (
    <>
      {/* search */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="font-bold text-md">All Ongoing Appointments</h1>
        </div>
        <TextField
          label="Search"
          id="patientId"
          placeholder="Search (min 4 letters)"
          helperText="Search (min 4 letters)"
          margin="normal"
          variant="outlined"
          onChange={(e) => setSearchState(e.target.value)}
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
              {ongoingData &&
                ongoingData.data.map((xyz, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => getOngoingInfo(xyz.id)}
                      >
                        {xyz.patient_name}
                      </span>
                    </TableCell>
                    <TableCell>{xyz.patient_id}</TableCell>
                    <TableCell>{xyz.patient_age}</TableCell>
                    <TableCell>
                      <span
                        className={
                          xyz.status == "ongoing" ? "text-red-500" : undefined
                        }
                      >
                        {xyz.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* pagination */}
        <div className="flex justify-end p-2 mr-4 md:p-5">
          {ongoingData && (
            <Pagination
              activePage={ongoingData.current_page}
              itemsCountPerPage={ongoingData.per_page}
              totalItemsCount={ongoingData.total}
              pageRangeDisplayed={5}
              onChange={(pageNumber) => fetchData(pageNumber)}
              pageRangeDisplayed={screen.width < 768 ? 3 : 5}
              innerClass="inline-flex items-center text-gray-700"
              itemClassPrev="mr-2"
              itemClassNext="ml-2"
              itemClass="px-3 py-1 rounded-md cursor-pointer"
              hideFirstLastPages
              activeClass="text-white bg-blue-600 border border-blue-600"
            />
          )}
        </div>
        {/* ! pagination */}

        {ongoingInfo && (
          <AllOngoingInfo
            open={ongoingInfo}
            onClose={setOngoingInfo}
            header="Appointment Information"
          />
        )}
      </Paper>
      {/* ! table */}
    </>
  );
}

export default OngoingAllAppointment;

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
