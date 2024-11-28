'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'


// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const BillingInformation = () => {
  // States
  const [country, setCountry] = useState('')

  return (
    <Card>
      <CardHeader title='Firebase Service Account' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <CustomTextField fullWidth label='Google Project Id' placeholder='GOOGLE_PROJECT_ID' />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField fullWidth label='Google Private Key Id' placeholder='GOOGLE_PRIVATE_KEY_ID' />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField fullWidth label='Google Private Key' placeholder='GOOGLE_PRIVATE_KEY' />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField fullWidth label='Google Client Email' placeholder='GOOGLE_CLIENT_EMAIL' />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField fullWidth label='Google Client Id' placeholder='GOOGLE_CLIENT_ID' />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField fullWidth label='Google Auth Url' placeholder='GOOGLE_AUTH_URI' />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField fullWidth label='Google Token Uri' placeholder='GOOGLE_TOKEN_URI' />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField fullWidth label='Google Auth Provider Cert Url' placeholder='GOOGLE_AUTH_PROVIDER_CERT_URL' />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField fullWidth label='Google Client Cert Url' placeholder='GOOGLE_CLIENT_CERT_URL' />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField fullWidth label='Google Universe Domain' placeholder='GOOGLE_UNIVERSE_DOMAIN' />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant='contained'>Publish Setting</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BillingInformation
