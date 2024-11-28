//MUI Imports
import Grid from '@mui/material/Grid'

//Component Imports
import LogisticsStatisticsCard from '@views/apps/logistics/dashboard/LogisticsStatisticsCard'

//Data Imports
import { getStatisticsData } from '@/app/server/actions'

const LogisticsDashboard = async () => {
  // Vars
  const data = await getStatisticsData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LogisticsStatisticsCard data={data?.statsHorizontalWithBorder} />
      </Grid>
    </Grid>
  )
}

export default LogisticsDashboard
