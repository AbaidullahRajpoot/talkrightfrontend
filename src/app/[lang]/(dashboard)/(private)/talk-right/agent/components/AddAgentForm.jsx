'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MuiStepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormHelperText from '@mui/material/FormHelperText'

// Third-party Imports
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, array, forward, pipe, nonEmpty, check } from 'valibot'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import DirectionalIcon from '@components/DirectionalIcon'

// Vars
const steps = [
  {
    title: 'Agent config',
    subtitle: 'Create & configure your agent'
  },
  {
    title: 'Customize Behavior',
    subtitle: 'Tell your agent how to behave'
  },
  {
    title: 'Embed Agent',
    subtitle: 'Get calls and prospects'
  }
]

// Styled Components
const Stepper = styled(MuiStepper)(({ theme }) => ({
  justifyContent: 'center',
  '& .MuiStep-root': {
    '&:first-of-type': {
      paddingInlineStart: 0
    },
    '&:last-of-type': {
      paddingInlineEnd: 0
    },
    [theme.breakpoints.down('md')]: {
      paddingInline: 0
    }
  }
}))

const accountSchema = object({
  name: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  phone: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  language: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  voice: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  message: pipe(string(), nonEmpty('This field is required'), minLength(1)),

})


const personalSchema = object({
  agentType: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  tone: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  instruction: pipe(string(), nonEmpty('This field is required'), minLength(1)),
})

const socialSchema = object({
  Embedcode: pipe(string(), nonEmpty('This field is required'), minLength(1)),
  Webhookendpoint: pipe(string(), nonEmpty('This field is required'), minLength(1))
})

const AddAgentForm = () => {
  // States
  const [activeStep, setActiveStep] = useState(0)

  // Vars
  const Languages = ['English', 'French', 'Spanish', 'Portuguese', 'Italian', 'German', 'Arabic']

  // Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    resolver: valibotResolver(accountSchema),
    defaultValues: {
      name: '',
      phone: '+971',
      language: '',
      voice: '',
      message: ''
    }
  })

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    resolver: valibotResolver(personalSchema),
    defaultValues: {
      agentType: '',
      tone: '',
      instruction: '',
    }
  })

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    resolver: valibotResolver(socialSchema),
    defaultValues: {
      Embedcode: '',
      Webhookendpoint: '',
    }
  })

  const onSubmit = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)

    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    accountReset({ name: '', phone: '', language: '', voice: '', message: '' })
    personalReset({ agentType: '', tone: '', instruction: '', })
    socialReset({ Embedcode: '', Webhookendpoint: '' })
  }

  const renderStepContent = activeStep => {
    switch (activeStep) {
      case 0:
        return (
          <form key={0} onSubmit={(handleAccountSubmit(onSubmit))}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography className='font-medium' color='text.primary'>
                  {steps[0].title}
                </Typography>
                <Typography variant='body2'>{steps[0].subtitle}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='name'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Name'
                      placeholder='johnDoe'
                      {...(accountErrors.name && { error: true, helperText: accountErrors.name.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Phone"
                      placeholder="+971"
                      type="tel"
                      onChange={(e) => {
                        let value = e.target.value;

                        if (value.startsWith("+971")) {
                          value = value.replace(/[^0-9+\-() ]/g, "");
                        } else {
                          value = "+971";
                        }

                        field.onChange(value);
                      }}
                      {...(accountErrors.phone && { error: true, helperText: accountErrors.phone.message })}
                    />
                  )}
                />


              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='language'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      select
                      fullWidth
                      label='Language'
                      {...field}
                      error={Boolean(accountControl.language)}
                    >
                      <MenuItem value="English">English</MenuItem>
                      <MenuItem value="English(United States)">English (United States)</MenuItem>
                      <MenuItem value="Bulgarian">Bulgarian</MenuItem>
                      <MenuItem value="Catalan">Catalan</MenuItem>
                      <MenuItem value="Czech">Czech</MenuItem>
                      <MenuItem value="Danish">Danish</MenuItem>
                      <MenuItem value="Dutch">Dutch</MenuItem>
                      <MenuItem value="Estonian">Estonian</MenuItem>
                      <MenuItem value="Finnish">Finnish</MenuItem>
                      <MenuItem value="Flemish">Flemish</MenuItem>
                      <MenuItem value="French">French</MenuItem>
                      <MenuItem value="German">German</MenuItem>
                      <MenuItem value="German(Switzerland)">German (Switzerland)</MenuItem>
                      <MenuItem value="Greek">Greek</MenuItem>
                      <MenuItem value="Hindi">Hindi</MenuItem>
                      <MenuItem value="Hungarian">Hungarian</MenuItem>
                      <MenuItem value="Indonesian">Indonesian</MenuItem>
                      <MenuItem value="Italian">Italian</MenuItem>
                      <MenuItem value="Japanese">Japanese</MenuItem>
                      <MenuItem value="Korean">Korean</MenuItem>
                      <MenuItem value="Latvian">Latvian</MenuItem>
                      <MenuItem value="Lithuanian">Lithuanian</MenuItem>
                      <MenuItem value="Malay">Malay</MenuItem>
                      <MenuItem value="Norwegian">Norwegian</MenuItem>
                      <MenuItem value="Polish">Polish</MenuItem>
                      <MenuItem value="Portuguese">Portuguese</MenuItem>
                      <MenuItem value="Romanian">Romanian</MenuItem>
                      <MenuItem value="Russian">Russian</MenuItem>
                      <MenuItem value="Slovak">Slovak</MenuItem>
                      <MenuItem value="Spanish">Spanish</MenuItem>
                      <MenuItem value="Swedish">Swedish</MenuItem>
                      <MenuItem value="Thai">Thai</MenuItem>
                      <MenuItem value="Turkish">Turkish</MenuItem>
                      <MenuItem value="Ukrainian">Ukrainian</MenuItem>
                      <MenuItem value="Vietnamese">Vietnamese</MenuItem>
                    </CustomTextField>
                  )}
                />
                {accountErrors.language && <FormHelperText error>language is a required field</FormHelperText>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='voice'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      select
                      fullWidth
                      label='Voice'
                      {...field}
                      error={Boolean(accountControl.voice)}
                    >
                      <MenuItem value='Male - Friendly and expressive'>Male - Friendly and expressive</MenuItem>
                      <MenuItem value='Male - Clear and natural'>Male - Clear and natural  </MenuItem>
                      <MenuItem value='Male - Professional'>Male - Professional  </MenuItem>
                      <MenuItem value='Male - Deep and resonant'>Male - Deep and resonant  </MenuItem>
                      <MenuItem value='Female - Ethereal and gentle'>Female - Ethereal and gentle  </MenuItem>
                      <MenuItem value='Female - Dynamic and versatile'>Female - Dynamic and versatile</MenuItem>
                    </CustomTextField>
                  )}
                />
                {accountErrors.voice && <FormHelperText error>voice is a required field</FormHelperText>}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='message'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      rows={4}
                      multiline
                      label='Wellcome Message'
                      placeholder='Wellcome Message'
                      {...(accountErrors.message && { error: true, helperText: accountErrors.message.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} className='flex justify-between'>
                <Button
                  variant='tonal'
                  disabled
                  color='secondary'
                  startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography className='font-medium' color='text.primary'>
                  {steps[1].title}
                </Typography>
                <Typography variant='body2'>{steps[1].subtitle}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='agentType'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      select
                      fullWidth
                      label='Agent Type'
                      {...field}
                      error={Boolean(personalErrors.agentType)}
                    >
                      <MenuItem value='Sales representative'>Sales representative</MenuItem>
                      <MenuItem value='Support agent'>Support agent </MenuItem>
                      <MenuItem value='Lead Engagement'>Lead Engagement</MenuItem>
                    </CustomTextField>
                  )}
                />
                {personalErrors.agentType && <FormHelperText error>This field is required</FormHelperText>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='tone'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      select
                      fullWidth
                      label='Agent Tone'
                      {...field}
                      error={Boolean(personalErrors.tone)}
                    >
                      <MenuItem value='Conversational'>Conversational</MenuItem>
                      <MenuItem value='Professional'>Professional </MenuItem>
                      <MenuItem value='Humorous'>Humoroust</MenuItem>
                    </CustomTextField>
                  )}
                />
                {personalErrors.tone && <FormHelperText error>This field is required</FormHelperText>}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='instruction'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      rows={4}
                      multiline
                      label='Instructions'
                      placeholder='Instructions'
                      {...(personalErrors.instruction && { error: true, helperText: personalErrors.instruction.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} className='flex justify-between'>
                <Button
                  variant='tonal'
                  onClick={handleBack}
                  color='secondary'
                  startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography className='font-medium' color='text.primary'>
                  {steps[2].title}
                </Typography>
                <Typography variant='body2'>{steps[2].subtitle}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='Webhookendpoint'
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      rows={4}
                      multiline
                      label='Webhook Endpoint'
                      placeholder='Webhook Endpoint'
                      {...(socialErrors.Webhookendpoint && { error: true, helperText: socialErrors.Webhookendpoint.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='Embedcode'
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      rows={4}
                      multiline
                      label='Embed Code'
                      placeholder='Embed Code'
                      {...(socialErrors.Embedcode && { error: true, helperText: socialErrors.Embedcode.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} className='flex justify-between'>
                <Button
                  variant='tonal'
                  onClick={handleBack}
                  color='secondary'
                  startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
                >
                  Back
                </Button>
                <Button variant='contained' type='submit' endIcon={<i className='tabler-check' />}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return <Typography>Unknown stepIndex</Typography>
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const labelProps = {}

              if (index === activeStep) {
                labelProps.error = false

                if (
                  (accountErrors.email ||
                    accountErrors.username ||
                    accountErrors.password ||
                    accountErrors['confirmPassword']) &&
                  activeStep === 0
                ) {
                  labelProps.error = true
                } else if (
                  (personalErrors.firstName ||
                    personalErrors.lastName ||
                    personalErrors.country ||
                    personalErrors.language) &&
                  activeStep === 1
                ) {
                  labelProps.error = true
                } else if (
                  (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
                  labelProps.error = true
                } else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index} className='max-md:mbe-5'>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title' color='text.primary'>
                          {label.title}
                        </Typography>
                        <Typography className='step-subtitle'>{label.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider />
      <CardContent>
        {activeStep === steps.length ? (
          <>
            <Typography className='mlb-2 mli-1'>All steps are completed!</Typography>
            <div className='flex justify-end mt-4'>
              <Button variant='contained' onClick={handleReset}>
                Reset
              </Button>
            </div>
          </>
        ) : (
          renderStepContent(activeStep)
        )}
      </CardContent>
    </Card>
  )
}

export default AddAgentForm
