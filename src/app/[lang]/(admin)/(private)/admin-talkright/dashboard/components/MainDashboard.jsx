// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ProjectsTable from './ProjectsTable'
import InterestedTopics from './InterestedTopics'
import CardVerticalRatings from './CardVerticalRatings'
import LogisticsShipmentStatistics from './LogisticsShipmentStatistics'
import SupportTracker from './SupportTracker'

// Data Imports
import { getProfileData } from '@/app/server/actions'
import LogisticsDashboard from './LogisticsDashboard'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/academy` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getAcademyData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/academy`)

  if (!res.ok) {
    throw new Error('Failed to fetch academy data')
  }

  return res.json()
} */
const MainDashboard = async () => {
  // Vars
  const profiledata = await getProfileData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LogisticsDashboard />
      </Grid>
      <Grid item xs={12} md={6}>
        <LogisticsShipmentStatistics />
      </Grid>
      <Grid item xs={12} md={6}>
        <SupportTracker />
      </Grid>
      <Grid item xs={12} md={8}>
        <InterestedTopics />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardVerticalRatings />
      </Grid>
      <Grid item xs={12} lg={12}>
        <ProjectsTable projectTable={profiledata?.users.profile.DashboardTable} callType="today" />
      </Grid>
    </Grid>
  )
}

export default MainDashboard
