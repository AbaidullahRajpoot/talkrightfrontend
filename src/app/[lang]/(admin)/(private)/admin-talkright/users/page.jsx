// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserTableList from './components/UserListTable'


/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/ecommerce` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getEcommerceData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/ecommerce`)

  if (!res.ok) {
    throw new Error('Failed to fetch ecommerce data')
  }

  return res.json()
} */
const Agentlist = async () => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserTableList />
      </Grid>
    </Grid>
  )
}

export default Agentlist
