import React from 'react';

/**
 *  I use this page to design components before adding it to my app
 */

function Test() {
  return (
    <div>
      <Button type="outlined">I am button</Button>
    </div>
  )
}

export default Test


function Error404(){
  return(
    <div className="flex flex-col items-center">
       {/* <ForbiddenIcon className="w-12 h-12 mt-8 text-purple-200" aria-hidden="true" /> */}
    <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">404</h1>
    <p className="text-gray-700 dark:text-gray-300">
      Page not found. Check the address or{' '}
      <a className="text-purple-600 hover:underline dark:text-purple-300" href="../index.html">
        go back
      </a>
      .
    </p>
  </div>
  )
}

function Button(props) {
  function type() {
    return(
      props.type == 'secondary' ?
        secondary() :
      props.type == 'outlined' ?
        outlined() :
      primary()
    )
  }
  function primary() {
    return(
     "flex items-center px-1 py-1 text-white bg-indigo-500 rounded hover:bg-indigo-400"
    )
  }
  function secondary() {
    return(
      "flex items-center px-1 py-1 text-white bg-red-500 rounded hover:bg-red-400"
    )
  }
  function outlined(){
    return(
      "flex items-center px-1 py-1 text-black bg-transparent rounded hover:bg-gray-400 border border-black"
    )
  }
  return(
    <button className={type()}>
      {props.children}
    </button>
  )
}
