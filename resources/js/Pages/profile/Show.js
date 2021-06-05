import React from "react";
import SectionBorder from "@/layouts/partials/SectionBorder";
import DeleteUserForm from "./DeleteUserForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateProfileInformationForm from "./UpdateProfileInformationForm";
import UpdateProfilePhoto from "./UpdateProfilePhoto";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import logo from '@/assets/images/elevateLogo.png';
import {Home} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {InertiaLink, usePage} from '@inertiajs/inertia-react';

function Show() {
  const classes = useStyles();
  const authRole = usePage().props.user.role
  return (
    <div className="bg-gray-100">
      {/* header */}
      <div>
        <AppBar position="static" className={classes.myAppBar} elevation={0} color="default">
          <Toolbar className="flex items-center justify-between w-full">
            <div>
              <img src={logo} className="w-12 h-12"/>
            </div>

            <Button color="inherit" startIcon={<Home/>}>
              { authRole == 'nurse' ?
                  <InertiaLink href="/nurseDashboard" className="inline-flex">Home</InertiaLink> :
                authRole == 'doctor' ?
                  <InertiaLink href="/doctorDashboard" className="inline-flex">Doctor Home</InertiaLink> :
                authRole == 'pharmacy' ?
                  <InertiaLink href="/pharmacyDashboard">Pharmacy Home</InertiaLink> :
                authRole == 'user' ?
                  <InertiaLink href="/userDashboard">Home</InertiaLink> :
                authRole == 'admin' ?
                  <InertiaLink href="/doctorDashboard">Admin Home</InertiaLink> :
                authRole == 'lab' ?
                  <InertiaLink href="/labDashboard">Lab Home</InertiaLink> :
                null
              }
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      {/* body */}
      <div className="w-full max-w-screen-lg px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="header">
          <h1 className="header-text">Profile</h1>
        </div>

        <div className="mx-auto max-w-7xl">
          <UpdateProfilePhoto />
          <SectionBorder />
          <UpdateProfileInformationForm />
          <SectionBorder />
          <UpdatePasswordForm />
          <SectionBorder />
          <DeleteUserForm />
        </div>
      </div>
    </div>
  );
}

export default Show;

const useStyles = makeStyles({
  myAppBar: {
    backgroundColor: 'white',
    color: 'black',
    borderBottomWidth: '1px'
  },
})
