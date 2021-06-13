import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import OngoingAppointment from './OngoingAppointment/OngoingAppointment';
import LabLayout from '../../LabLayout/LabLayout';
import CompletedAppointment from './CompletedAppointment/CompletedAppointment'

function AllAppointment() {
  const [open, setOpen] = useState("ongoing");
  return (
    <div>
      <LabLayout>
        <div className="header">
          <div className="header-text">
            All Appointment
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
            <OngoingAppointment/> :
            open == "completed" ?
            <CompletedAppointment/> :
            null
          }
        </div>
      </LabLayout>
    </div>
  )
}

export default AllAppointment
