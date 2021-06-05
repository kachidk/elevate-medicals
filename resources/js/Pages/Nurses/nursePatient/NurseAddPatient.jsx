import React, { useState } from "react";
import NurseLayout from "../NurseLayout/NurseLayout";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

function NurseAddPatient() {
  const [addPatientForm, setAddPatientForm] = useState({
    name: "",
    patientId: "",
    age: "",
    phoneNo: "",
    email: "",
    stateOfOrigin: "",
    lgaOfOrigin: "",
    residentialState: "",
    residentialLga: "",
  });

  const [errors, setErrors] = useState();

  const classes = useStyles();

  function handleFormChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setAddPatientForm((addPatientForm) => ({
      ...addPatientForm,
      [key]: value,
    }));
  }

  function handleFormSubmit(e){
    e.preventDefault();
    axios.post('/nurseAddPatientSubmit',addPatientForm)
          .then(()=>{
            // reset the input fields
              document.getElementById('name').value = "";
              document.getElementById('patientId').value = "";
              document.getElementById('age').value = "";
              document.getElementById('phoneNo').value = "";
              document.getElementById('email').value = "";
              document.getElementById('stateOfOrigin').value = "";
              document.getElementById('lgaOfOrigin').value = "";
              document.getElementById('residentialState').value = "";
              document.getElementById('residentialLga').value = "";
            setErrors(null)
          })
          .then(()=>{
            // reset the addPatientForm(state)
            setAddPatientForm((addPatientForm)=>({
              ...addPatientForm,
              name: "",
              patientId: "",
              age: "",
              phoneNo: "",
              email: "",
              stateOfOrigin: "",
              lgaOfOrigin: "",
              residentialState: "",
              residentialLga: "",
            }))
          })
          .catch((error)=>{
            setErrors(error.response.data.errors)
          });
  }
  return (
    <div>
      <NurseLayout>
        <div className="header">
          <div className="header-text">Add Patients</div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className={classes.root}>
            <div className="flex justify-end w-full px-2 mb-3">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
            <div>
              <TextField
                id="name"
                label="Name"
                style={{ margin: 8 }}
                placeholder="Name"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.name ? true:false) :false }
                helperText={`${errors ? (errors.name ? errors.name : "") : ""}`}
              />
            </div>
            <div>
              <TextField
                label="Patient ID"
                id="patientId"
                placeholder="Patient ID"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.patientId ? true:false) :false }
                helperText={`${errors ? (errors.patientId ? errors.patientId : "") : ""}`}
              />
            </div>
            <div>
              <TextField
                label="Age"
                id="age"
                placeholder="Age"
                type="number"
                className={classes.numberField}
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.age ? true:false) :false }
                helperText={`${errors ? (errors.age ? errors.age : "") : ""}`}
              />
            </div>
            <div>
              <TextField
                label="Phone No."
                id="phoneNo"
                placeholder="Phone No."
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.phoneNo ? true:false) :false }
                helperText={`${errors ? (errors.phoneNo ? errors.phoneNo : "") : ""}`}
              />
              <TextField
                label="Email"
                id="email"
                placeholder="Email"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.email ? true:false) :false }
                helperText={`${errors ? (errors.email ? errors.email : "") : ""}`}
              />
            </div>
            <div>
              <TextField
                label="State of Origin"
                id="stateOfOrigin"
                placeholder="State of Origin"
                className={classes.textField}
                helperText="Some important text"
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.stateOfOrigin ? true:false) :false }
                helperText={`${errors ? (errors.stateOfOrigin ? errors.stateOfOrigin : "") : ""}`}
              />
              <TextField
                label="L.G.A of Origin"
                id="lgaOfOrigin"
                placeholder="L.G.A of Origin"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.lgaOfOrigin ? true:false) :false }
                helperText={`${errors ? (errors.lgaOfOrigin ? errors.lgaOfOrigin : "") : ""}`}
              />
            </div>
            <div>
              <TextField
                label="Residential State"
                id="residentialState"
                placeholder="Residential State"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.residentialState ? true:false) :false }
                helperText={`${errors ? (errors.residentialState ? errors.residentialState : "") : ""}`}
              />
              <TextField
                label="Residential L.G.A"
                id="residentialLga"
                placeholder="Residential L.G.A"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.residentialLga ? true:false) :false }
                helperText={`${errors ? (errors.residentialLga ? errors.residentialLga : "") : ""}`}
              />
            </div>
          </div>
        </form>
      </NurseLayout>
    </div>
  );
}

export default NurseAddPatient;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "35ch",
    "@media(min-width: 768px)": {
      width: "50ch",
    },
  },
  numberField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "20ch",
  },
}));
