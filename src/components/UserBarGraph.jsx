import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

const UserBarGraph = ({assigned,closed}) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Bugs</h3>
            <BarChart
                xAxis={[{ scaleType: 'band', data: ['Assigned', 'Closed'] }]}
                series={[{ data: [assigned,closed]}]}
                width={500}
                height={400}
                sx={{maxHeight:'350px'}}
            />
        </div>
    )
}

export default UserBarGraph