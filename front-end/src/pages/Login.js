import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router';
import axios from 'axios';
import '../axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Login = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const Login = (e) => {
        setIsLoading(true)
        e.preventDefault()
        axios.post('/auth/login', {
            ...input
        }).then(res => {
            localStorage.setItem(
                'user',
                JSON.stringify({ name: res.data.user.user, token: res.data.token })
            )
            setIsLoading(false)
            navigate('/dashboard')
        }).catch(err => {
            setIsLoading(false)
            if (err.response) {
                toast.error(err.response.data.msg)
            }
        })
        setInput({
            email: "",
            password: "",
        })
    }

    return (
        <div style={{ background: '#cacadf', minHeight: '100vh' }}>
            <div className="fixed top-0 w-full" style={{ zIndex: '2' }}>
                <Navbar code={0} />
                {isLoading && <LinearProgress color="inherit" />}
            </div>
            <div className='w-full h-full flex justify-center items-center' style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24p' }}>
                <div className='bg-white p-8 font-semibold my-16 flex flex-col items-center' style={{ minWidth: '27%' }}>
                    <h1 className="text-xl ">Login</h1>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate={false}
                        autoComplete="off"
                        onSubmit={Login}
                    >
                        <div>
                            <TextField
                                required
                                type={'email'}
                                helperText="Ex: johndoe@gmail.com"
                                id="standard-basic2"
                                label="Email"
                                variant="standard"
                                margin="normal"
                                value={input.email}
                                onChange={e => setInput({ ...input, email: e.target.value })}
                            />
                            <TextField
                                required
                                type={'password'}
                                id="standard-basic3"
                                label="Password"
                                variant="standard"
                                margin="normal"
                                value={input.emailpassword}
                                onChange={e => setInput({ ...input, password: e.target.value })}
                            />
                            <Button type='submit' variant="contained">Submit</Button>
                        </div>
                    </Box>
                    <p className="text-xs font-normal mt-3">dont have an account?
                        <span className='text-blue-300 cursor-pointer' onClick={() => navigate('/register')}> Sign-up here</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
