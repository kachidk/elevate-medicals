import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


function PatientInfoModal(props) {
  return (
    <>
      <Dialog
        open={props.open == null ? false : true}
        onClose={()=>props.onClose(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="flex items-center justify-between">
            <span>{props.header}</span>
            <IconButton aria-label="close" onClick={()=>props.onClose(null)}>
              <CloseIcon/>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
              { <>
                <div>
                  <span className="font-bold">Name: </span>
                  <span>{props.open.name}</span>
                </div>
                <div>
                  <span className="font-bold">Patient ID: </span>
                  <span>{props.open.patient_id}</span>
                </div>
                <div>
                  <span className="font-bold">Age: </span>
                  <span>{props.open.age}</span>
                </div>
                <div>
                  <span className="font-bold">Phone No: </span>
                  <span>{props.open.phone_no}</span>
                </div>
                <div>
                  <span className="font-bold">Email: </span>
                  <span>{props.open.email}</span>
                </div>
                <div>
                  <span className="font-bold">State of Origin: </span>
                  <span>{props.open.state_of_origin}</span>
                </div>
                <div>
                  <span className="font-bold">L.G.A of Origin: </span>
                  <span>{props.open.lga_of_origin}</span>
                </div>
                <div>
                  <span className="font-bold">Residential State: </span>
                  <span>{props.open.residential_state}</span>
                </div>
                <div>
                  <span className="font-bold">Residential L.G.A: </span>
                  <span>{props.open.residential_lga}</span>
                </div>
                <div>
                  <span className="font-bold">Account Created At: </span>
                  <span>{props.open.created_at}</span>
                </div>
                </>
              }
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.onClose(null)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PatientInfoModal

