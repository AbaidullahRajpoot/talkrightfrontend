// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AgentEditHeader from '../components/AgentEditHeader'

import EditAgentForm from '../components/EditAgentForm'

const AddAgent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AgentEditHeader />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
             <EditAgentForm />
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default AddAgent
