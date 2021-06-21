import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../AdminLayout/AdminLayout";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "react-js-pagination";
import TextField from "@material-ui/core/TextField";
import BadgeText from "@/components/BadgeText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const columns = [
  { id: "checkbox", label: "", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "patientId", label: "Patient ID", minWidth: 100 },
  { id: "age", label: "Age", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
];

function ChangeRole() {
  const classes = useStyles();

  const [roleData, setRoleData] = useState(null);
  const [searchState, setSearchState] = useState("");
  const [roles, setRoles] = useState("patient");

  const [checkedData, setCheckedData] = useState([]);
  const [seeOptions, setSeeOptions] = useState(false);
  const sentRoles = useRef({
    id: null,
    value: "",
  });

  function fetchRoleData(pageNumber = 1) {
    axios
      .get("adminFetchRole", {
        params: {
          page: pageNumber,
          searchValue: searchState.length >= 4 ? searchState : "",
          roles: roles,
        },
      })
      .then((res) => {
        setRoleData(res.data);
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
      fetchRoleData();
    }
  }, [searchState, roles]);

  //view the different role table
  function handleRoleSelectChange(e) {
    document.getElementsByName("all-checkbox").forEach((abc) => {
      if (abc.checked == true) {
        abc.click();
      }
    });
    setCheckedData([]);
    setRoles(e.target.value);
  }
  //!view the different role table

  // role change and submit
  function handleCheckboxChange(params) {
    if (params.e.target.checked && !checkedData.includes(params.id)) {
      setCheckedData([...checkedData, params.id]);
    }
    if (!params.e.target.checked && checkedData.includes(params.id)) {
      const newArr = checkedData.filter((abc) => abc !== params.id);
      setCheckedData(newArr);
    }
  }
  useEffect(() => {
    if (checkedData.length >= 1) {
      setSeeOptions(true);
    } else {
      setSeeOptions(false);
    }
  }, [checkedData]);

  function roleSubmit() {
    Swal.fire({
      title: "Change Role",
      input: "select",
      inputOptions: {
        patient: "Patient",
        nurse: "Nurse",
        doctor: "Doctor",
        lab: "Lab",
        pharmacy: "Pharmacy",
        Admin: "Admin",
      },
      showCancelButton: true,
      inputPlaceholder: "Select a Role",
    }).then((value) => {
      if (value.isConfirmed) {
        sentRoles.current.id = checkedData;
        sentRoles.current.value = value.value;
        axios
          .post("adminUpdateRoleSubmit", sentRoles.current)
          .then(() => {
            toast.success("Role Saved");
            fetchRoleData();
          })
          .then(() => {
            sentRoles.current.id = null;
            sentRoles.current.value = "";
          })
          .catch((err) => {
            if (err.response) {
              Object.keys(err.response.data.errors).forEach((key) => {
                toast.error(err.response.data.errors[key][0]);
              });
            }
          });
      }
    });
  }
  // ! role change and submit

  function clearButton() {
    document.getElementsByName("all-checkbox").forEach((abc) => {
      if (abc.checked == true) {
        abc.click();
      }
    });
    setCheckedData([]);
  }
  return (
    <div>
      <AdminLayout>
        <div className="header">
          <div className="header-text">Change Role</div>
        </div>

        <div className="mb-2 space-y-2 md:justify-between md:space-y-0 md:flex md:items-center md:pr-2">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="roleId">Role</InputLabel>
            <Select
              labelId="roleId"
              id="roleId"
              value={roles}
              onChange={handleRoleSelectChange}
              label="Role"
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="nurse">Nurse</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="lab">Lab</MenuItem>
              <MenuItem value="pharmacy">Pharmacy</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          {seeOptions && (
            <div className="space-x-2">
              <Button
                onClick={roleSubmit}
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                onClick={clearButton}
                variant="outlined"
                color="primary"
                startIcon={<CancelIcon />}
              >
                Clear
              </Button>
            </div>
          )}
        </div>

        <div>
          {/* search */}
          <div className="px-2 sm:flex sm:items-center sm:justify-between">
            <div className="flex space-x-1">
              <h1 className="font-bold text-md">Roles:</h1>
              <span>{roles}</span>
            </div>
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
                  {roleData &&
                    roleData.data.map((xyz, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell>
                          <Checkbox
                            onChange={(e) =>
                              handleCheckboxChange({ e: e, id: xyz.id })
                            }
                            color="primary"
                            inputProps={{
                              "aria-label": "secondary checkbox",
                              name: "all-checkbox",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <span>{xyz.name}</span>
                        </TableCell>
                        <TableCell>{xyz.email}</TableCell>
                        <TableCell>{xyz.photo_name}</TableCell>
                        <TableCell>
                          <BadgeText>{xyz.role}</BadgeText>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* pagination */}
            <div className="flex justify-end p-2 mr-4 md:p-5">
              {roleData && (
                <Pagination
                  activePage={roleData.current_page}
                  itemsCountPerPage={roleData.per_page}
                  totalItemsCount={roleData.total}
                  pageRangeDisplayed={5}
                  onChange={(pageNumber) => fetchRoleData(pageNumber)}
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
        </div>
      </AdminLayout>
    </div>
  );
}

export default ChangeRole;

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  formControl: {
    minWidth: 120,
  },
});
