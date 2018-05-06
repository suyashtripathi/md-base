
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { name: 'preferences', path: 'preferences', component: () => import('pages/mealplan/home') },
      { name: 'plan', path: 'plan', component: () => import('pages/mealplan/generate') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
