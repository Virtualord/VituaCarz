import Menus from './Menus'

const Layout = ({children}) => {
  return (
    <>
    <div className="row min-[90vh]:">
        <div className="col-md-2 bg-gray-700 text-amber-50">
            <Menus />
        </div>
        <div className="col-md-10">
            {children}
        </div>
    </div>
    </>
  )
}

export default Layout
