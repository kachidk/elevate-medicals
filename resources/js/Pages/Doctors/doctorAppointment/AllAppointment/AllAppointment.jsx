import React, { useState } from 'react';
import DoctorLayout from '../../DoctorLayout/DoctorLayout';
import Button from '@material-ui/core/Button';
import OngoingAppointment from './OngoingAppointment/OngoingAppointment'
import CompletedAppointment from './CompletedAppointment/CompletedAppointment'

function AllAppointment() {
  const [open, setOpen] = useState("ongoing");
  return (
    <div>
      <DoctorLayout>
        <div className="header">
          <div className="header-text">
            Today's Appointment
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
      </DoctorLayout>
    </div>
  )
}

export default AllAppointment
