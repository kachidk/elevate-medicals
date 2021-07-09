import React from "react";
import PropTypes from "prop-types";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import logo from "@/assets/images/elevateLogo.png";

function Welcome({ canLogin, canRegister }) {
  const auth = usePage().props.user;
  const authRole = usePage().props.user ? usePage().props.user.role : false;

  return (
    <>
      <div className="h-screen bg-blueGray-800">
        <section className="flex items-center pt-4 ml-4">
          <img src={logo} className="w-12 h-12 mr-1" />
          <a
            href="/"
            className="flex flex-wrap text-2xl text-white sm:text-4xl"
          >
            <span>Elevate</span>
            <span className="text-blue-400">Medicals</span>
          </a>
        </section>

        <section className="absolute bottom-4 left-4 sm:bottom-20 sm:left-10">
          <span className="text-2xl text-white mb-7">Welcome</span>
          <div className="flex flex-wrap mb-5 text-6xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            <span>Elevate</span>
            <span>Medicals</span>
          </div>
          <div className="flex flex-wrap space-y-2 sm:space-y-0">
            {canLogin && (
              <>
                {auth ? (
                  <InertiaLink
                    className="inline-flex px-8 py-4 mr-4 tracking-widest text-white uppercase transition duration-500 ease-in-out transform bg-gray-500 sm:mb-0 hover:bg-purple-600 hover:-translate-y-1 hover:scale-110 focus:bg-purple-600 focus:-translate-y-1 focus:scale-110"
                    href={
                      authRole == "nurse"
                        ? "/nurseDashboard"
                        : authRole == "doctor"
                        ? "/doctorDashboard"
                        : authRole == "lab"
                        ? "/labDashboard"
                        : authRole == "pharmacy"
                        ? "/pharmacyDashboard"
                        : authRole == "admin"
                        ? "/adminDashboard"
                        : "/home"
                    }
                  >
                    Dashboard
                  </InertiaLink>
                ) : (
                  <>
                    <InertiaLink
                      href="/login"
                      className="inline-flex px-8 py-4 mr-4 tracking-widest text-white uppercase transition duration-500 ease-in-out transform bg-gray-500 sm:mb-0 hover:bg-purple-600 hover:-translate-y-1 hover:scale-110 focus:bg-purple-600 focus:-translate-y-1 focus:scale-110"
                    >
                      Log in
                    </InertiaLink>

                    {canRegister && (
                      <InertiaLink
                        href="/register"
                        className="inline-flex px-8 py-4 mr-4 tracking-widest text-white uppercase transition duration-500 ease-in-out transform bg-gray-500 sm:mb-0 hover:bg-purple-600 hover:-translate-y-1 hover:scale-110 focus:bg-purple-600 focus:-translate-y-1 focus:scale-110"
                      >
                        Register
                      </InertiaLink>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

Welcome.propTypes = {
  canLogin: PropTypes.bool,
  canRegister: PropTypes.bool,
};

export default Welcome;
