import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout/AdminLayout";
import PeopleIcon from "@material-ui/icons/People";
import axios from "axios";

function AdminDashboard() {
  const [userCount, setUserCount] = useState();

  useEffect(() => {
    async function fetchCount() {
      const res1 = await axios.get("adminUsersCount");
      setUserCount(res1.data);
    }
    fetchCount();
  }, []);
  return (
    <div>
      <AdminLayout>
        <div className="header">
          <div className="header-text">Admin Dashboard</div>
        </div>

        <div className="grid gap-6 mx-auto mb-8 sm:grid-cols-3 md:grid-cols-4 w-max">
          {/* <!-- Card --> */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className="p-3 mr-4 bg-gray-100 rounded-full text-blueGray-500">
              <PeopleIcon />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">Admin</p>
              <p className="text-lg font-semibold text-gray-700">
                {userCount ? userCount.admin : null}
              </p>
            </div>
          </div>
          {/* <!-- Card --> */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-red-500 bg-gray-100 rounded-full">
              <PeopleIcon />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">Patient</p>
              <p className="text-lg font-semibold text-gray-700">
                {userCount ? userCount.patient : null}
              </p>
            </div>
          </div>
          {/* <!-- Card --> */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-pink-500 bg-gray-100 rounded-full">
              <PeopleIcon />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">Nurse</p>
              <p className="text-lg font-semibold text-gray-700">
                {userCount ? userCount.nurse : null}
              </p>
            </div>
          </div>
          {/* <!-- Card --> */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-blue-500 bg-gray-100 rounded-full">
              <PeopleIcon />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">Doctor</p>
              <p className="text-lg font-semibold text-gray-700">
                {userCount ? userCount.doctor : null}
              </p>
            </div>
          </div>
          {/* <!-- Card --> */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className="p-3 mr-4 bg-gray-100 rounded-full text-fuchsia-500">
              <PeopleIcon />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">Lab</p>
              <p className="text-lg font-semibold text-gray-700">
                {userCount ? userCount.lab : null}
              </p>
            </div>
          </div>
          {/* <!-- Card --> */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-teal-500 bg-gray-100 rounded-full">
              <PeopleIcon />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">Pharmacy</p>
              <p className="text-lg font-semibold text-gray-700">
                {userCount ? userCount.pharmacy : null}
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

export default AdminDashboard;
