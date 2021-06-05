import React, { useState, useEffect } from 'react';
import NurseLayout from '../../NurseLayout/NurseLayout';
import Button from '@material-ui/core/Button';
import AllOngoingAppointment from './AllOngoingAppointment/AllOngoingAppointment';
import AllCompletedAppointment from './AllCompletedAppointment/AllCompletedAppointment';

function NurseAllAppointment() {
  const [open, setOpen] = useState("ongoing");
  return (
    <div>
       <NurseLayout>
        <div className="header">
          <div className="header-text">
            All Appointments
          </div>
        </div>

        <div className="space-x-3">
          <Button variant={open == "ongoing" ? "contained" : "outlined"} color="primary" onClick={()=>setOpen("ongoing")}>
            Ongoing
          </Button>
          <Button variant={open == "completed" ? "contained" : "outlined"} color="primary" onClick={()=>setOpen("completed")}>
            Completed
          </Button>
        </div>

        <div>
          { open == "ongoing" ?
            <AllOngoingAppointment/> :
            open == "completed" ?
            <AllCompletedAppointment/> :
            null
          }
        </div>
      </NurseLayout>
    </div>
  )
}

export default NurseAllAppointment
