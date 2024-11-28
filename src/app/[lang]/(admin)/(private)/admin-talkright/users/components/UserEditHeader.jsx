// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const UserEditHeader = () => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Edit User
        </Typography>
      </div>
    </div>
  )
}

export default UserEditHeader
