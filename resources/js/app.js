require('./bootstrap');

import { App } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'
import { InertiaProgress } from '@inertiajs/progress';
import {toast} from 'react-toastify';

toast.configure({
  hideProgressBar: true,
  limit: 3
})

const el = document.getElementById('app')

render(
    <App
      initialPage={JSON.parse(el.dataset.page)}
      resolveComponent={name => require(`./Pages/${name}`).default}
    />,
  el
);

InertiaProgress.init({ color: '#4B5563' });
