// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AgentAddHeader from '../components/AgentAddHeader'
import AddAgentForm from '../components/AddAgentForm'  

const AddAgent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AgentAddHeader />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
             <AddAgentForm />
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default AddAgent
