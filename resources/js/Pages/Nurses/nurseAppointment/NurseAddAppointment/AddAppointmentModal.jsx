import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { usePage } from '@inertiajs/inertia-react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddAppointmentModal(props) {
  const authUser = usePage().props.user;
  const [addAppointmentForm, setAddAppointmentForm] = useState({
    patientName: '',
    patientId: '',
    age: '',
    vitalTemperature: "",
    vitalBloodPressure: "",
    vitalWeight: "",
    nurseName: '',
    nurseId: '',
  });

  useEffect(() => {
    if(props.data){
      setAddAppointmentForm((addAppointmentForm)=>({
        ...addAppointmentForm,
        patientName: props.data ? props.data.name : '',
        patientId:  props.data ? props.data.patient_id : '',
        age: props.data ? props.data.age : '',
        nurseName: authUser ? authUser.name : '',
        nurseId: authUser ? authUser.id : '',
        status: "ongoing"
      }))
    }
  }, [props.data])

  function handleFormChange(e) {
    setAddAppointmentForm((addAppointmentForm)=>({
      ...addAppointmentForm,
      [e.target.id]: e.target.value
    }))
  }

  function handleFormSubmit(e){
    e.preventDefault();
    axios.post('/nurseAddAppointmentSubmit',addAppointmentForm)
      .then(()=>{
          props.onClose(null);
          clearAppointmentForm();
          toast.success("appointment submitted")
      }).catch((err)=>{
        if(err.response){
          Object.keys(err.response.data.errors).forEach(key=>{
            toast.error(err.response.data.errors[key][0])
          })
        }
      });
  }
  function clearAppointmentForm() {
    setAddAppointmentForm((addAppointmentForm)=>({
      ...addAppointmentForm,
      patientName: '',
      patientId: '',
      age: '',
      vitalTemperature: "",
      vitalBloodPressure: "",
      vitalWeight: "",
      nurseName: '',
      nurseId: '',
    }));
    document.getElementById('vitalTemperature').value = "";
    document.getElementById('vitalBloodPressure').value = "";
    document.getElementById('vitalWeight').value = "";
  }

  return (
    <>
      { props.open ?
        <form>
          <Dialog open={props.open == null ? false : true} onClose={()=>props.onClose(null)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
              <div className="flex items-center justify-between">
                <span>{props.header}</span>
                <IconButton aria-label="close" onClick={()=>{props.onClose(null); clearAppointmentForm()}}>
                  <CloseIcon/>
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent>
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                { <>
                  <div>
                    <span className="font-bold">Name: </span>
                    <span>{props.data.name}</span>
                  </div>
                  <div>
                    <span className="font-bold">Patient ID: </span>
                    <span>{props.data.patient_id}</span>
                  </div>
                  <div>
                    <span className="font-bold">Age: </span>
                    <span>{props.data.age}</span>
                  </div>
                  <div>
                    <span className="font-bold">Phone No: </span>
                    <span>{props.data.phone_no}</span>
                  </div>
                  <div>
                    <span className="font-bold">Email: </span>
                    <span>{props.data.email}</span>
                  </div>
                  <div>
                    <span className="font-bold">State of Origin: </span>
                    <span>{props.data.state_of_origin}</span>
                  </div>
                  <div>
                    <span className="font-bold">L.G.A of Origin: </span>
                    <span>{props.data.lga_of_origin}</span>
                  </div>
                  <div>
                    <span className="font-bold">Residential State: </span>
                    <span>{props.data.residential_state}</span>
                  </div>
                  <div>
                    <span className="font-bold">Residential L.G.A: </span>
                    <span>{props.data.residential_lga}</span>
                  </div>
                  <div>
                    <span className="font-bold">Account Created At: </span>
                    <span>{props.data.created_at}</span>
                  </div>
                  </>
                }
              </div>
                <Divider/>
              <div className="mt-3">
                <h1 className="mb-2 text-2xl font-bold">Vitals:</h1>
                <TextField
                  autoFocus
                  margin="dense"
                  id="vitalTemperature"
                  label="Temperature"
                  type="text"
                  fullWidth
                  onChange={handleFormChange}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="vitalBloodPressure"
                  label="Blood Pressure"
                  type="text"
                  fullWidth
                  onChange={handleFormChange}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="vitalWeight"
                  label="Weight"
                  type="text"
                  fullWidth
                  onChange={handleFormChange}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{props.onClose(null); clearAppointmentForm()}} color="primary">
                Cancel
              </Button>
              <Button onClick={handleFormSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </form>
        : null
      }
    </>
  )
}

export default AddAppointmentModal
