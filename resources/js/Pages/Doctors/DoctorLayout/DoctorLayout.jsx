import React, {useState} from 'react'
import DoctorSidebar from './DoctorSidebar';
import DoctorHeader from './DoctorHeader/DoctorHeader';


function DoctorLayout({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <DoctorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">

          {/*  Site header */}
          <DoctorHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main content */}
            <main>
                <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
                    {children}
                </div>
            </main>
        </div>
    </div>
  )
}

export default DoctorLayout
