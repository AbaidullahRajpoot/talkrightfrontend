// MUI Imports
import Typography from '@mui/material/Typography'

const AgentAddHeader = () => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Add a new agent
        </Typography>
      </div>
    </div>
  )
}

export default AgentAddHeader
