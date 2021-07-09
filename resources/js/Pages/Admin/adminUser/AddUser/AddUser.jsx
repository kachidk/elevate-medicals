import React, { useState } from "react";
import AdminLayout from "../../AdminLayout/AdminLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { toast } from "react-toastify";

function AddUser() {
  const [addUserForm, setAddUserForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState();

  function handleFormChange(e) {
    setAddUserForm({
      ...addUserForm,
      [e.target.id]: e.target.value,
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    axios
      .post("/adminAddUserSubmit", addUserForm)
      .then(() => {
        // reset the input fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
      })
      .then(() => {
        toast.success("User Saved");
        // reset the addUserForm(state)
        setAddUserForm({
          ...addUserForm,
          name: "",
          email: "",
          role: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data.errors);
        }
      });
  }
  return (
    <div>
      <AdminLayout>
        <div className="header">
          <div className="header-text">Add User</div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col flex-wrap">
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
                error={errors ? (errors.name ? true : false) : false}
                helperText={`${errors ? (errors.name ? errors.name : "") : ""}`}
              />
            </div>
            <div>
              <TextField
                label="Email"
                id="email"
                placeholder="Email"
                className="mx-2 w-[35ch] md:w-[50ch]"
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.email ? true : false) : false}
                helperText={`${
                  errors ? (errors.email ? errors.email : "") : ""
                }`}
              />
            </div>
            <div>
              <FormControl
                variant="outlined"
                className="m-2 min-w-[120px]"
                error={errors ? (errors.role ? true : false) : false}
              >
                <InputLabel id="roleInputLabel">Role</InputLabel>
                <Select
                  labelId="Role"
                  id="roleId"
                  value={addUserForm.role}
                  onChange={(e) =>
                    setAddUserForm({ ...addUserForm, role: e.target.value })
                  }
                  label="Role"
                >
                  <MenuItem value="patient">Patient</MenuItem>
                  <MenuItem value="nurse">Nurse</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="lab">Lab</MenuItem>
                  <MenuItem value="pharmacy">Pharmacy</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
                {errors ? (
                  errors.role ? (
                    <FormHelperText>{errors.role}</FormHelperText>
                  ) : null
                ) : null}
              </FormControl>
            </div>
            <div>
              <TextField
                label="Password"
                id="password"
                placeholder="Password"
                className="mx-2 w-[35ch] md:w-[50ch]"
                type="password"
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.password ? true : false) : false}
                helperText={`${
                  errors ? (errors.password ? errors.password : "") : ""
                }`}
              />
            </div>
            <div>
              <TextField
                label="Confirm Password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="mx-2 w-[35ch] md:w-[50ch]"
                type="password"
                margin="normal"
                variant="outlined"
                onChange={handleFormChange}
                error={errors ? (errors.password ? true : false) : false}
                helperText={`${
                  errors ? (errors.password ? errors.password : "") : ""
                }`}
              />
            </div>
          </div>
        </form>
      </AdminLayout>
    </div>
  );
}

export default AddUser;
