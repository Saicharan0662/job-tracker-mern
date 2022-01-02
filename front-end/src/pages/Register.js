import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router';
import axios from 'axios';
import '../axios'
import Navbar from '../components/navbar/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Register = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const register = (e) => {
        e.preventDefault()

        setIsLoading(true)
        axios.post('/auth/register', {
            ...input
        }).then(res => {
            localStorage.setItem(
                'user',
                JSON.stringify({ name: res.data.user.name, token: res.data.token })
            )
            console.log(res);
            setIsLoading(false)
            navigate('/dashboard')
        }).catch(error => {
            setIsLoading(false)
            if (error.response) {
                toast.info(error.response.data.msg)
            }
        })
        setInput({
            name: "",
            email: "",
            password: "",
        })
    }

    return (
        <div style={{ background: '#cacadf', minHeight: '100vh' }}>
            <div className="fixed top-0 w-full" style={{ zIndex: '2' }}>
                <Navbar code={1} />
                {isLoading && <LinearProgress color="inherit" />}
            </div>
            <div className='w-full h-full flex justify-center items-center' style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24p' }}>
                <div className='bg-white p-8 font-semibold my-16 flex flex-col items-center' style={{ minWidth: '27%' }}>
                    <h1 className="text-xl ">Register</h1>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate={false}
                        autoComplete="off"
                        onSubmit={register}
                    >
                        <div>
                            <TextField
                                required
                                helperText="Ex: John Doe"
                                id="standard-basic"
                                label="Name"
                                variant="standard"
                                margin="normal"
                                value={input.name}
                                onChange={e => setInput({ ...input, name: e.target.value })}
                            />
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
                                helperText="min 8 char"
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
                    <p className="text-xs font-normal mt-3">already have an account!
                        <span className='text-blue-300 cursor-pointer' onClick={() => navigate('/login')}> login here</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
