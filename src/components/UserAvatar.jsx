import React from 'react'
import { lightGreen } from '@mui/material/colors'
import { Button, Avatar, Box } from '@mui/material'

const UserAvatar = ({ children }) => {
  return (
    <Box>
      <Button
        onClick={() => {('clicked user avatar')}}
      >
        <Avatar
          sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: lightGreen[500],
          }}
        >
          { children[0] }
        </Avatar>
      </Button>
    </Box>
  )
}

export default UserAvatar