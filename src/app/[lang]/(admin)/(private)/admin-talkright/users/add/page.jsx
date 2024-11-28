// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserAddHeader from '../components/UserAddHeader'
import AddUserForm from '../components/AddUserForm'

const AddAgent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserAddHeader />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AddUserForm />
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default AddAgent
