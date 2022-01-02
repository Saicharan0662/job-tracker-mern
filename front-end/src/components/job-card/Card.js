import React from 'react'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import deleteIcon from '../../assets/icons/deleteIcon.png'
import editIcon from '../../assets/icons/edit.png'
import axios from 'axios';
import '../../axios'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Card = ({ job, getAllJobs, setIsLoading }) => {
    const navigate = useNavigate()

    const deleteJob = (jobId) => {
        setIsLoading(true)
        axios.delete(`/jobs/${jobId}`)
            .then(res => {
                getAllJobs()
                setIsLoading(false)
                toast.success('Job deleted successfully')
            }).catch(err => {
                setIsLoading(false)
            })
    }

    return (
        <div className='bg-white flex flex-col justify-center items-start py-4 px-2 my-4 rounded-md relative' style={{ width: '300px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
            <div className="space-x-4 text-l flex">
                <Avatar sx={{ bgcolor: deepPurple[500] }}>{job.company[0]}</Avatar>
                <span className='mt-1 ml-2 font-bold'> {job.company}</span>
                <img src={deleteIcon} alt="delete" className='h-6 absolute top-4 right-2 cursor-pointer'
                    onClick={() => deleteJob(job._id)} />
                <img src={editIcon} alt="edit" className='h-4 absolute bottom-4 right-3 cursor-pointer'
                    onClick={() => navigate(`/edit-job/${job._id}`)} />
            </div>
            <div className="mt-3">
                <p><span className='font-semibold'>Position:</span> {job.position}</p>
                <p><span className='font-semibold'>Status:</span> {job.status}</p>
            </div>
        </div>
    )
}

export default Card
