import React from 'react'
import { useNavigate } from 'react-router'

const Navbar = ({ code }) => {
    const navigate = useNavigate()

    const action = () => {
        // 0 sign-up
        if (code === 0) navigate('/register')
        // 1 log-in
        if (code === 1) navigate('/login')
        // 2 log-out
        if (code === 2) logout()
    }
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }
    return (
        <div className='flex justify-between items-center text-gray font-sans px-4 font-semibold text-gray ' style={{ minHeight: '50px', background: "rgb(223 225 242 / 1)", zIndex: '2' }}>
            <h3>JOB TRACKER</h3>
            <h3 className='cursor-pointer' onClick={() => action()}>{code === 2 ? 'Logout' : code === 1 ? 'Login' : 'Signup'}</h3>
        </div>
    )
}

export default Navbar
