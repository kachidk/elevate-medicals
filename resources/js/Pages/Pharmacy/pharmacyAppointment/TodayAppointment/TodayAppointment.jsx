import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import OngoingAppointment from './OngoingAppointment/OngoingAppointment';
import PharmacyLayout from '../../PharmacyLayout/PharmacyLayout';
import CompletedAppointment from './CompletedAppointment/CompletedAppointment';

function TodayAppointment() {
  const [open, setOpen] = useState("ongoing");
  return (
    <div>
      <PharmacyLayout>
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
      </PharmacyLayout>
    </div>
  )
}

export default TodayAppointment
