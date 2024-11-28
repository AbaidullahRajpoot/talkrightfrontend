// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import MenuItem from '@mui/material/MenuItem'

import Form from '@components/Form'
import CustomTextField from '@core/components/mui/TextField'


const FeedBackCard = () => {

  return (
    <Card>
      <CardHeader title='Survey' />
      <CardContent className='flex flex-col'>
      <Form>
          <CustomTextField
          className='mbe-6'
                      select
                      fullWidth
                      label='Rate Us'
                    >
                      <MenuItem value='Excellent'>Excellent</MenuItem>
                      <MenuItem value='Very Good'>Very Good</MenuItem>
                      <MenuItem value='Good'>Good</MenuItem>
                      <MenuItem value='Fair'>Fair</MenuItem>
                      <MenuItem value='Poor5'>Poor</MenuItem>
                    </CustomTextField>
          <CustomTextField rows={5} multiline fullWidth label='Feedback' className='mbe-6' />
          <Button
            variant='contained'
            type='submit'
             >
                  Submit
            </Button>
         
        </Form>
      </CardContent>
    </Card>
  )
}

export default FeedBackCard
