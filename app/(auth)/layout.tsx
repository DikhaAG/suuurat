import React from 'react'

interface AuthLayoutInterface {
    children: React.ReactNode
}

const AuthLayout = ({children}: AuthLayoutInterface) => {
  return (
    <div>AuthLayout</div>
  )
}

export default AuthLayout