import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='min-h-[100svh] bg-gray-900'>
      <Outlet />
    </div>
  )
}

export default Layout
