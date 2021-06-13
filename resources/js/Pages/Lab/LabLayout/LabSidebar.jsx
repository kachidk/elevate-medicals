import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import logo from "@/assets/images/elevateLogo.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { ArrowBack, Home, ExpandLess, ExpandMore, Remove } from "@material-ui/icons";
import TodayIcon from '@material-ui/icons/Today';

function LabSidebar({ sidebarOpen, setSidebarOpen }) {
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const [appointmentDropdown, setAppointmentDropdown] = useState(false);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  const classes = useStlyes();
  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-gray-800 p-4 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between pr-3 mb-10 sm:px-2">
          {/* Logo */}
          <InertiaLink href="/labDashboard" className="block">
            <img src={logo} className="w-10 h-10 rounded-full" />
          </InertiaLink>

          {/* Close button */}
          <button
            ref={trigger}
            className="text-gray-500 lg:hidden hover:text-gray-400"
            onClick={() => setSidebarOpen(false)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <ArrowBack className={classes.arrowBackIcon} />
          </button>
        </div>

        {/* Links */}
        <div>
          <h3 className="pl-3 mb-3 text-xs font-semibold text-gray-500 uppercase">
            Main
          </h3>
          <List
            component="nav"
            className={classes.root}
            aria-labelledby="nested-list-subheader"
          >
            {/* home */}
            <ListItem button>
              <InertiaLink href="/labDashboard" className="flex items-center w-full">
                <Home className={classes.listIcons} />
                <ListItemText primary="Home" />
              </InertiaLink>
            </ListItem>

            {/* appointment menu */}
            <ListItem button onClick={()=>setAppointmentDropdown(!appointmentDropdown)}>
              <TodayIcon className={classes.listIcons}/>
              <ListItemText primary="Appointments" />
              {appointmentDropdown ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={appointmentDropdown} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                {/* today appointment */}
                <ListItem button className={classes.nested}>
                  <InertiaLink href="/labTodayAppointment" className="flex items-center w-full">
                    <Remove className={classes.listIcons}/>
                    <ListItemText primary="Today's Appointment" />
                  </InertiaLink>
                </ListItem>

                {/* all appointment */}
                <ListItem button className={classes.nested}>
                  <InertiaLink href="/nurseAllAppointment" className="flex items-center w-full">
                    <Remove className={classes.listIcons}/>
                    <ListItemText primary="All Appointment" />
                  </InertiaLink>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
      </div>
    </div>
  )
}

export default LabSidebar

const useStlyes = makeStyles({
  root: {
    width: "100%",
    maxWidth: 360,
    color: "white",
  },
  nested: {
    paddingLeft: "40px",
  },
  listIcons: {
    marginRight: "10px",
  },
  arrowBackIcon: {
    color: "white"
  },
  active: {
    color: "blue"
  }
});
