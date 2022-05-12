import React from 'react'
import { useNavigate } from 'react-router'
import { LinearProgress } from '@mui/material'

const Navbar = ({ code, isLoading = false }) => {
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
        <div className='sticky top-0 left-0' style={{ zIndex: '2' }}>
            <div className='flex justify-between items-center text-white font-sans px-4 font-bold text-gray ' style={{ minHeight: '50px', background: "#000080", zIndex: '2' }}>
                <h3>JOB TRACKER</h3>
                <h3 className='cursor-pointer' onClick={() => action()}>{code === 2 ? 'Logout' : code === 1 ? 'Login' : 'Signup'}</h3>
            </div>
            {isLoading && <LinearProgress color='inherit' />}
        </div>
    )
}

export default Navbar
