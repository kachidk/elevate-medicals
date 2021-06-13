import React,{useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Divider, TextField } from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify';
import {makeStyles} from '@material-ui/core/styles';
import { usePage } from '@inertiajs/inertia-react';



function AppointmentInfo(props) {
  const authUser = usePage().props.user

  const classes = useStyles();

  const [form, setForm] = useState({
    testResult: '',
    id: ''
  })
  function handleFormChange(e){
    setForm((form)=>({
      ...form,
      [e.target.id]: e.target.value
    }))
  }
  function handleFormSubmit(e) {
    e.preventDefault()
    axios.post('labAllOngoingResultSubmit', form)
      .then(()=>{
        props.onClose(null)
        toast.success("Test Result Saved")
      }).then(()=>{
        props.fetchData()
      }).catch((err)=>{
        if(err.response){
          Object.keys(err.response.data.errors).forEach(key=>{
            toast.error(err.response.data.errors[key][0])
          })
        }
      })
  }

  useEffect(() => {
    setForm((form)=>({
      ...form,
      id: props.open.id,
      staffName: authUser ? authUser.name : ''
    }))
  }, [])
  return (
    <form>
      <Dialog
        open={props.open == null ? false : true}
        onClose={()=>props.onClose(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen
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
                <div>
                  <span className="font-bold">Name: </span>
                  <span>{props.open.patient_name}</span>
                </div>
                <div>
                  <span className="font-bold">Age: </span>
                  <span>{props.open.patient_age}</span>
                </div>
                <div>
                  <span className="font-bold">Doctor Name: </span>
                  <span>{props.open.doctor_name}</span>
                </div>
                <div>
                  <span className="font-bold">Doctor Test Approval: </span>
                  <span>{props.open.doctor_test_status == '1' ? 'yes' : 'no'}</span>
                </div>
                <div>
                  <span className="font-bold">Doctor Test Description: </span>
                  <span>{props.open.doctor_test_description}</span>
                </div>
            </div>
            <Divider/>
            <div className="mt-3">
                <h1 className="mb-2 text-2xl font-bold">Test Results:</h1>
                <div className="grid grid-cols-1 gap-4">
                  <TextField
                    onChange={handleFormChange}
                    id="testResult"
                    label="Test Result"
                    multiline
                    rows={20}
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
        <Button onClick={handleFormSubmit}
            type="submit" color="primary" autoFocus
          >
            Submit
          </Button>
          <Button onClick={()=>props.onClose(null)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default AppointmentInfo

const useStyles = makeStyles({
  dialogActions: {
    marginBottom: '15px',
    marginRight: '15px'
  }
})
