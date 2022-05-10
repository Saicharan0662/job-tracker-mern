import React from 'react'
import Button from '../components/large-buton/Button'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router'

const Home = () => {

    const user = JSON.parse(localStorage.getItem('user')) ?
        JSON.parse(localStorage.getItem('user')).name : null

    const navigate = useNavigate()

    return (
        <div className="flex justify-start items-center landing-bg relative" style={{ height: '100vh' }}>
            {user && <Navigate to='/dashboard' />}
            <div className='mx-10'>
                <div className='text-white landing-text font-sans'>Job Tracker</div>
                <p className="my-2 relative left-1" style={{ color: '#d2c4c4' }}>Track your jobs at one place</p>
                <Button text='Get Started'
                    style={{ marginTop: '10px' }}
                    onClick={() => {
                        navigate('/register')
                    }} />
            </div>
        </div>
    )
}

export default Home
