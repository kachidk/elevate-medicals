import React, { useState, useEffect } from "react";
import NurseLayout from "../../NurseLayout/NurseLayout";
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
import PatientInfoModal from "./PatientInfoModal";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "patientId", label: "Patient ID", minWidth: 100 },
  {
    id: "age",
    label: "Age",
    minWidth: 170,
  },
  {
    id: "phoneNo",
    label: "Phone No.",
    minWidth: 170,
  },
];

function NurseViewPatient() {
  // patient table, searching and patient info
  const [patientData, setPatientData] = useState(null);
  const [searchState, setSearchState] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);

  const classes = useStyles();

  function fetchPatientData(pageNumber = 1) {
    axios
      .get("nurseViewPatientData", {
        params: {
          page: pageNumber,
          searchValue: searchState.length >= 4 ? searchState : "",
        },
      })
      .then((res) => {
        setPatientData(res.data);
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
      fetchPatientData();
    }
  }, [searchState]);

  // patient information
  function getPatientInfo(id) {
    axios
      .get("nurseViewPatientInfo", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setPatientInfo(res.data);
      })
      .catch((err) => {
        alert("errors :", err.response.data.errors);
      });
  }

  return (
    <div>
      <NurseLayout>
        <div className="header">
          <div className="header-text">View Patients</div>
        </div>

        {/* search */}
        <div className="flex justify-end px-2">
          <TextField
            label="Search"
            id="patientId"
            placeholder="Search (min 4 letters)"
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
                {patientData &&
                  patientData.data.map((xyz, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => getPatientInfo(xyz.id)}
                        >
                          {xyz.name}
                        </span>
                      </TableCell>
                      <TableCell>{xyz.patient_id}</TableCell>
                      <TableCell>{xyz.age}</TableCell>
                      <TableCell>{xyz.phone_no}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* pagination */}
          <div className="flex justify-end p-2 mr-4 md:p-5">
            {patientData && (
              <Pagination
                activePage={patientData.current_page}
                itemsCountPerPage={patientData.per_page}
                totalItemsCount={patientData.total}
                pageRangeDisplayed={5}
                onChange={(pageNumber) => fetchPatientData(pageNumber)}
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
        </Paper>
        {/* ! table */}
        {patientInfo && (
          <PatientInfoModal
            open={patientInfo}
            onClose={setPatientInfo}
            header="Patient Information"
          />
        )}
      </NurseLayout>
    </div>
  );
}

export default NurseViewPatient;

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
