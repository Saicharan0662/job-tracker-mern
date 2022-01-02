import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '../components/job-card/Card';
import Navbar from '../components/navbar/Navbar';
import axios from 'axios';
import '../axios'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user')) ?
        JSON.parse(localStorage.getItem('user')).name : null
    const [input, setInput] = useState({ company: "", position: "" })
    const [jobs, setJobs] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllJobs()
    }, [])

    const getAllJobs = () => {
        setIsLoading(true)
        axios.get('/jobs')
            .then(res => {
                setJobs(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
            })
        setInput({ company: "", position: "" })
    }

    const addJob = (e) => {
        setIsLoading(true)
        e.preventDefault()
        axios.post('/jobs', {
            ...input
        }).then(res => {
            getAllJobs()
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }

    return (
        <>
            {!user && <Navigate to='/' />}
            <div style={{ background: '#cacadf', minHeight: '100vh' }}>
                <div className="fixed top-0 w-full" style={{ zIndex: '2' }}>
                    <Navbar code={2} />
                    {isLoading && <LinearProgress color="inherit" />}
                </div>
                <div className='w-full flex flex-col items-center' style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24p' }}>
                    <div className='bg-white p-8 font-semibold my-16 flex flex-col items-center' style={{ minWidth: '27%' }}>
                        <h1 className="text-xl ">Add a new Job</h1>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate={false}
                            autoComplete="off"
                            onSubmit={addJob}
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
                                <Button type='submit' variant="contained">Submit</Button>
                            </div>
                        </Box>
                    </div>
                </div>
                <div className="mx-18 px-8 ">
                    <h2 className='text-xl font-semibold'>All your Job's
                        {` ( ${jobs ? jobs.count : 0} )`}
                    </h2>
                    {jobs?.count > 0 ?
                        <div className='flex flex-wrap justify-center md:justify-start'>
                            {jobs.jobs.map(job => {
                                return (
                                    <span key={job._id} className='mx-4'>
                                        <Card job={job} getAllJobs={getAllJobs} setIsLoading={setIsLoading} />
                                    </span>
                                )
                            })}
                        </div>
                        : <h2 className='text-gray font-normal text-center my-4'>You dont have any job record yet!!</h2>}
                </div>
            </div>
        </>
    )
}

export default Dashboard
