import React from 'react';
import PropTypes from 'prop-types';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import logo from '@/assets/images/elevateLogo.png';

function Welcome({canLogin, canRegister}) {
    const auth = usePage().props.user;
    const authRole = usePage().props.user ? usePage().props.user.role : false;

    return (
      <>
      <main className="h-screen bg-gray-800">
      <header className="w-full px-4 py-4">
          <div className="w-full mx-auto max-w-7xl">
              <div className="flex items-center">
                  <img src={logo} className="w-12 h-12 mr-1"/>
                  <a href="/" className="text-4xl text-white">Elevate<span className="text-blue-400">Medicals</span></a>
              </div>
          </div>
      </header>
      <section className="relative w-full px-4 mx-auto top-1/3 max-w-7xl">
              <span className="block text-2xl text-white mb-7">Welcome</span>
              <h1 className="mb-5 text-6xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 w-max">Elevate Medicals</h1>
              <span className="block text-white"></span>
              <div className="flex flex-wrap">
              { canLogin &&
                <>
                  {  auth ?
                    <InertiaLink className="inline-flex px-8 py-4 mr-4 tracking-widest text-white uppercase transition duration-500 ease-in-out transform bg-gray-500 sm:mb-0 hover:bg-purple-600 hover:-translate-y-1 hover:scale-110 focus:bg-purple-600 focus:-translate-y-1 focus:scale-110"
                      href={authRole == 'nurse' ?
                              "/nurseDashboard" :
                            authRole == 'doctor' ?
                              "/doctorDashboard" :
                            "/home"
                      }
                    >
                        Dashboard
                    </InertiaLink>
                    :
                      <>
                        <InertiaLink href="/login" className="inline-flex px-8 py-4 mr-4 tracking-widest text-white uppercase transition duration-500 ease-in-out transform bg-gray-500 sm:mb-0 hover:bg-purple-600 hover:-translate-y-1 hover:scale-110 focus:bg-purple-600 focus:-translate-y-1 focus:scale-110">
                            Log in
                        </InertiaLink>

                        { canRegister &&
                          <InertiaLink href="/register" className="inline-flex px-8 py-4 mr-4 tracking-widest text-white uppercase transition duration-500 ease-in-out transform bg-gray-500 sm:mb-0 hover:bg-purple-600 hover:-translate-y-1 hover:scale-110 focus:bg-purple-600 focus:-translate-y-1 focus:scale-110">
                            Register
                          </InertiaLink>
                        }
                      </>
                  }
                </>
              }
              </div>
      </section>
      </main>
      </>
    )
}

Welcome.propTypes = {
    canLogin: PropTypes.bool,
    canRegister: PropTypes.bool
  }

export default Welcome
