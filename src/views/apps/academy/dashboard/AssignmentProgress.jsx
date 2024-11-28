// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'
import DirectionalIcon from '@components/DirectionalIcon'

// Vars
const data = [
  { title: 'Total Calls', tasks: 120, progress: 72, color: 'primary' },
  { title: 'Waiting Calls', tasks: 32, progress: 48, color: 'success' },
  { title: 'Drepped Calls', tasks: 182, progress: 15, color: 'error' },
]

const AssignmentProgress = () => {
  return (
    <Card>
      <CardHeader title='Call Management Data' />
      <CardContent className='flex flex-col gap-16'>
        {data.map((item, i) => (
          <div key={i} className='flex items-center gap-4'>
            <div className='relative flex items-center justify-center'>
              <CircularProgress
                variant='determinate'
                size={54}
                value={100}
                thickness={3}
                className='absolute text-[var(--mui-palette-customColors-trackBg)]'
              />
              <CircularProgress
                variant='determinate'
                size={54}
                value={item.progress}
                thickness={3}
                color={item.color}
                sx={{ '& .MuiCircularProgress-circle': { strokeLinecap: 'round' } }}
              />
              <Typography className='absolute font-medium' color='text.primary'>
                {`${item.progress}%`}
              </Typography>
            </div>
            <div className='flex justify-between items-center is-full gap-4'>
              <div>
                <Typography className='font-medium mbe-1.5' color='text.primary'>
                  {item.title}
                </Typography>
                <Typography variant='body2'>{`${item.tasks} Calls`}</Typography>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default AssignmentProgress
