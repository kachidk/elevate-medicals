import React, {useState} from 'react'
import NurseSidebar from './NurseSidebar';
import NurseHeader from './NurseHeader/NurseHeader';


function NurseLayout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
    <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <NurseSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">

          {/*  Site header */}
          <NurseHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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

export default NurseLayout
