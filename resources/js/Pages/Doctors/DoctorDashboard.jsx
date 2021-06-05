import React from 'react';
import DoctorLayout from './DoctorLayout/DoctorLayout';


function DoctorDashboard() {
  return (
    <div>
      <DoctorLayout>
        <div className="header">
          <div className="header-text">
            Doctor Dashboard
          </div>
        </div>
      </DoctorLayout>
    </div>
  )
}

export default DoctorDashboard
