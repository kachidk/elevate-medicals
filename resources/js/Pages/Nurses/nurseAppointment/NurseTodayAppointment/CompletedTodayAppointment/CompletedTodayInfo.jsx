import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

function CompletedTodayInfo(props) {
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
                  <span>{props.open.patient_name}</span>
                </div>
                <div>
                  <span className="font-bold">Patient ID: </span>
                  <span>{props.open.patient_id}</span>
                </div>
                <div>
                  <span className="font-bold">Age: </span>
                  <span>{props.open.patient_age}</span>
                </div>
                <div>
                  <span className="font-bold">Began at: </span>
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

export default CompletedTodayInfo
