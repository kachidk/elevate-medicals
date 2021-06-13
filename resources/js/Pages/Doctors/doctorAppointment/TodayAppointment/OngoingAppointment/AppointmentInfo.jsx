import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import { Divider, FormControlLabel, Switch, TextField } from '@material-ui/core';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';


function AppointmentInfo(props) {
  const classes = useStyles();
  const authUser = usePage().props.user;
  const [labTestDescriptionView, setLabTestDescriptionView] = useState(false)

  const form = useForm({
    appointmentId: '',
    doctorName: '',
    doctorId: '',
    patientComplain: '',
    diagnosis: '',
    prescription: '',
    appointmentStatus: '',
    labTest: false,
    labTestDescription: '',
    admit: false,
  })
  // function handleSubmit(e){
  //   e.preventDefault();
  //   axios.post('/doctorDiagnosisSubmit', form.data)
  //     .then(()=>{
  //       props.onClose(null);
  //       toast.success("appointment submitted")
  //     }).then(()=>{
  //       props.fetchOngoingData()
  //     }).catch((err)=>{
  //       if(err.response){
  //         Object.keys(err.response.data.errors).forEach(key=>{
  //           toast.error(err.response.data.errors[key][0])
  //         })
  //       }
  //     });
  // }
  function handleSubmit(e) {
    e.preventDefault()
    form.post('/doctorDiagnosisSubmit', {
      onSuccess:()=>{
        toast.success("appointment submitted")
        props.onClose(null);
      },
      onFinish:()=>{
        props.fetchOngoingData()
      },
      onError:(errors)=>{
        if(errors){
          Object.keys(errors).forEach(key=>{
            toast.error(errors[key])
          })
        }
      }
    })
  }

  useEffect(() => {
    form.setData({
      ...form.data,
      'appointmentId': props.open.id,
      'doctorName': authUser ? authUser.name : '',
      'doctorId': authUser ? authUser.id : '',
      'appointmentStatus': 'completed'
    });
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
            <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-3">
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
            <Divider/>
            <div className="mt-3">
              <h1 className="text-2xl font-bold">Vitals:</h1>
              <div>
                <span className="font-bold">Nurse name: </span>
                <span>{props.open.nurse_name}</span>
              </div>
              <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-3">
                <div>
                  <span className="font-bold">Temperature: </span>
                  <span>{props.open.nurse_vital_temperature}</span>
                </div>
                <div>
                  <span className="font-bold">Blood pressure: </span>
                  <span>{props.open.nurse_vital_blood_pressure}</span>
                </div>
                <div>
                  <span className="font-bold">Weight: </span>
                  <span>{props.open.nurse_vital_weight}</span>
                </div>
              </div>
            </div>
            <Divider/>
              <div className="mt-3">
                <h1 className="mb-2 text-2xl font-bold">Vitals:</h1>
                <div className="grid gap-4 md:grid-flow-col md:grid-cols-2 md:grid-rows-3 md:gap-6">
                <TextField
                  onChange={(e)=>form.setData('patientComplain', e.target.value)}
                  defaultValue={form.data.patientComplain}
                  id="patientComplain"
                  label="Patient Complains"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                />
                 <TextField
                  onChange={(e)=>form.setData('diagnosis', e.target.value)}
                  defaultValue={form.data.diagnosis}
                  id="diagnosis"
                  label="Diagnosis"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  onChange={(e)=>form.setData('prescription', e.target.value)}
                  defaultValue={form.data.prescription}
                  id="prescription"
                  label="Prescription"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                />
                <div className="flex items-center">
                  <FormControlLabel
                    control={<Switch
                      checked={form.data.labTest}
                      onChange={(e)=>{form.setData('labTest', e.target.checked)
                        setLabTestDescriptionView(!labTestDescriptionView)
                      }}
                      name="checkedA" />}
                    labelPlacement="start"
                    label="Go for Lab Test"
                  />
                </div>
                { labTestDescriptionView &&
                  <div>
                    <TextField
                      onChange={(e)=>form.setData('labTestDescription', e.target.value)}
                      defaultValue={form.data.labTestDescription}
                      id="labTestDescription"
                      label="Lab Test Description"
                      multiline
                      rows={3}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  }
                <div className="flex items-center">
                  <FormControlLabel
                    control={<Switch
                      checked={form.data.admit}
                      onChange={(e)=>form.setData('admit', e.target.checked)}
                      name="checkedA" />}
                    labelPlacement="start"
                    label="Admit Patient"
                  />
                </div>
                </div>
              </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleSubmit}
            type="submit" color="primary" autoFocus
          >
            Submit
          </Button>
          <Button onClick={()=>props.onClose(null)} color="primary" autoFocus>
            Cancel
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
