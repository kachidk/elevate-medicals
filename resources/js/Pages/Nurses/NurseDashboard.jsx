import React from 'react';
import NurseLayout from './NurseLayout/NurseLayout';

function NurseDashboard() {
  return (
    <div>
       <NurseLayout>
          {/* check app.css for related css */}
          <div className="header">
              <h1 className="header-text">Nurse Dashboard</h1>
          </div>

          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                  You're logged in!
              </div>
          </div>
        </NurseLayout>
    </div>
  )
}

export default NurseDashboard
