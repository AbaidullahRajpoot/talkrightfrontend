// MUI Imports
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

const CircularProgressDeterminate = styled(CircularProgress)({
    color: 'var(--mui-palette-customColors-trackBg)'
})

const CircularProgressIndeterminate = styled(CircularProgress)(({ theme }) => ({
    left: 0,
    position: 'absolute',
    animationDuration: '550ms',
    color: theme.palette.mode === 'light' ? 'var(--primary-color)' : 'var(--primary-color)'
}))

const ProgressCircularCustomization = () => {
    return (
        <div className='custom-loader'>
            <CircularProgressDeterminate variant='determinate' size={50} thickness={5} value={100} />
            <CircularProgressIndeterminate variant='indeterminate' disableShrink size={50} thickness={5} />
        </div>
    )
}

export default ProgressCircularCustomization
