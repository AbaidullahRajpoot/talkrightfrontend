import Grid from '@mui/material/Grid'

import ProjectsTable from './components/ProjectsTable'
import {getProfileData } from '@/app/server/actions'



export default async function CallRecord() {
  const profiledata = await getProfileData()

  return (
    <Grid item xs={12} lg={12}>
    <ProjectsTable projectTable={profiledata?.users.profile.DashboardTable} callType="all" />
  </Grid>
  )
}
