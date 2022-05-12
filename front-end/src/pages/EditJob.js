import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router'
import Navbar from '../components/navbar/Navbar';
import axios from 'axios';
import '../axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const EditJob = () => {

    const user = JSON.parse(localStorage.getItem('user')) ?
        JSON.parse(localStorage.getItem('user')).name : null

    const [input, setInput] = useState({ company: "", position: "", status: "" })
    const optionList = ['interview', 'declined', 'pending']
    const [isLoading, setIsLoading] = useState(false)
    const { jobId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/jobs/${jobId}`)
            .then(res => {
                setInput({
                    company: res.data.job.company,
                    position: res.data.job.position,
                    status: res.data.job.status
                })
                setIsLoading(false)
            }).catch(err => {
                setIsLoading(false)
            })
    }, [jobId])

    const editJob = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.patch(`/jobs/${jobId}`, {
            ...input
        }).then(res => {
            setIsLoading(false)
            navigate('/dashboard')
            toast.success('Job edited successfully')
        }).catch(err => {
            setIsLoading(false)
        })
    }

    return (
        <div className='flex justify-center items-center' style={{ background: '#cacadf', minHeight: '100vh' }}>
            {!user && <Navigate to='/' />}
            <div className="fixed top-0 w-full" style={{ zIndex: '2' }}>
                <Navbar code={2} isLoading={isLoading} />
            </div>
            <div className='w-full flex flex-col items-center' >
                <div className='bg-white p-8 font-semibold my-16 flex flex-col items-center' style={{ minWidth: '27%', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24p" }}>
                    <h1 className="text-xl ">Edit Job</h1>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate={false}
                        autoComplete="off"
                        onSubmit={editJob}
                    >
                        <div>
                            <TextField
                                required
                                fullWidth
                                helperText="Ex: Google"
                                id="standard-basic"
                                label="Company"
                                variant="standard"
                                margin="normal"
                                value={input.company}
                                onChange={e => setInput({ ...input, company: e.target.value })}
                            />
                            <TextField
                                required
                                fullWidth
                                helperText="Ex: back-end developer"
                                id="standard-basic2"
                                label="Position"
                                variant="standard"
                                margin="normal"
                                value={input.position}
                                onChange={e => setInput({ ...input, position: e.target.value })}
                            />
                            <Autocomplete
                                options={optionList}
                                id="auto-complete"
                                autoComplete
                                required
                                includeInputInList
                                value={input.status}
                                onChange={(e, value) => {
                                    setInput({ ...input, status: value })
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Status" variant="standard" />
                                )}
                            />
                        </div>
                        <Button type='submit' variant="contained" className=''>Submit</Button>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default EditJob
