// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import Form from '@components/Form'
import CustomTextField from '@core/components/mui/TextField'


const AddMints = () => {

  return (
    <Card>
      <CardHeader title='Add Mints' />
      <CardContent className='flex flex-col'>
      <Form>
          <CustomTextField fullWidth label='Add Mints' className='mbe-6' />
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

export default AddMints
