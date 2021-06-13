import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

function BadgeText(props) {
  const badgeText = clsx({
    "inline-flex items-center px-2 text-xs font-medium leading-5 text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100": props.type == "danger",
    "inline-flex items-center px-2 text-xs font-medium leading-5 text-yellow-700 bg-yellow-100 rounded-full dark:bg-yellow-700 dark:text-yellow-100": props.type == "warning",
    "inline-flex items-center px-2 text-xs font-medium leading-5 text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100": props.type == "success",
    "inline-flex items-center px-2 text-xs font-medium leading-5 text-gray-700 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-100": props.type == "neutral",
    "inline-flex items-center px-2 text-xs font-medium leading-5 text-blue-700 bg-blue-100 rounded-full dark:bg-blue-700 dark:text-blue-100": !props.type || props.type == "primary"
  })
  return (
    <span className={badgeText}>
      {props.children}
    </span>
  )
}

export default BadgeText

BadgeText.propTypes = {
  type: PropTypes.string
}

