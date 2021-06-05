import React, {useState} from 'react';
import NurseLayout from '../../NurseLayout/NurseLayout';
import Button from '@material-ui/core/Button';
import OngoingTodayAppointment from './OngoingTodayAppointment/OngoingTodayAppointment';
import CompletedTodayAppointment from './CompletedTodayAppointment/CompletedTodayAppointment';



function NurseTodayAppointment() {
  const [open, setOpen] = useState("ongoing");
  return (
    <div>
      <NurseLayout>
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
            <OngoingTodayAppointment/> :
            open == "completed" ?
            <CompletedTodayAppointment/> :
            null
          }

        </div>
      </NurseLayout>
    </div>
  )
}

export default NurseTodayAppointment
