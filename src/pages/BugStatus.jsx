import React,{useEffect, useState} from 'react'
import BugStatusTable from '../components/BugStatusTable'
import Typography from '@mui/material/Typography'
import apiService from '../services/apiService'
 
const BugStatus = () => {
    const [bugResponse, setBugResponse] = useState([]);

    const headers = ['Bug_id','Status','CreatedBy','CreatedOn']

    const bugStatusApi = async() => {
        const bugStatusResponse = await apiService.bugStatus()
        setBugResponse(bugStatusResponse)
    }

    useEffect(() => {
        bugStatusApi();
      },[]);
    return(
        <>
        <Typography variant="h4" color="initial">Bug Status</Typography>
        <BugStatusTable bugStatusData={bugResponse}  headers={headers}/>
        </>
    )
}

export default BugStatus