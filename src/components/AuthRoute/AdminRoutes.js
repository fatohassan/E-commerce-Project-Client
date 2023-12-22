import React from 'react'

const AdminRoute = ({children}) => {
    // get user from localstorge
    const user = JSON.parse(localStorage.getItem("userInfo"))
    const isAdmin = user?.userFound?.isAdmin ? true : false
    if (!isAdmin) return <h1>Access Denied</h1>
    return <>{children}</>
}

export default AdminRoute