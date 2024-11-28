'use client';

// React Imports
import { useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Components Imports
import { toast } from 'react-toastify'

import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import Loading from '@/components/loading/loading'

import { useUser_addMutation } from '@/redux-store/api/talkrightApi'


const AddUserForm = () => {
  const router = useRouter()
  const { lang: locale } = useParams()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isPasswordShown: false,
    confirmPassword: '',
    isConfirmPasswordShown: false,
    firstName: '',
    lastName: '',
    country: '',
    gender: '',
    date: null,
    phoneNumber: '+971'
  })

  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [fileInput, setFileInput] = useState('')
  const [loading, setloading] = useState(false)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  const usernamePattern = /^[a-zA-Z0-9_]{3,16}$/;

  // Calculate the minimum date (18 years ago from today)
  const minDate = new Date();

  minDate.setFullYear(minDate.getFullYear() - 18);

  const [user_add, { isLoading, error }] = useUser_addMutation();



  const handleClickShowPassword = () => setFormData(show => ({ ...show, isPasswordShown: !show.isPasswordShown }))

  const handleClickShowConfirmPassword = () =>
    setFormData(show => ({ ...show, isConfirmPasswordShown: !show.isConfirmPasswordShown }))

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      isPasswordShown: false,
      confirmPassword: '',
      isConfirmPasswordShown: false,
      firstName: '',
      lastName: '',
      country: '',
      gender: '',
      date: null,
      phoneNumber: '+971'
    })
    setImgSrc('/images/avatars/1.png')
    setFileInput(null)
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(file)
      setFileInput(file)
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  //=======================================Register User Function=============================================

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      formData.username === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === '' ||
      formData.firstName === '' || formData.lastName === '' || formData.country === '' || formData.gender === '' ||
      formData.date === null || formData.phoneNumber === ''
    ) {
      toast.error('All fields are required.');
    }
    else if (fileInput == '') {
      toast.error('Image is required.');
    }
    else if (!usernamePattern.test(formData.username)) {
      toast.error("Username must be 3-16 characters long, can contain letters, numbers, underscores. It can't contain spaces.");
    }
    else if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
    }
    else if (!passwordRegex.test(formData.password)) {
      toast.error('Password must be at least 6 characters long, include one letter, one number, and one special character.');
    }
    else {
      setloading(true)
      const formDataToSend = new FormData();

      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('date', formData.date.toISOString());
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('file', fileInput);

      try {
        const result = await user_add(formDataToSend).unwrap();

        if (result?.message == "User Registered Successfully!") {
          console.log(result)
          toast.success(result.message);
          handleReset(); // Reset form on success
          setloading(false)
          router.push(`/${locale}/admin-talkright/users`)

        }
      } catch (err) {
        toast.error(err?.data?.message);
        setloading(false)

      }
    }

  };

  return (
    <Card>
      <form onSubmit={handleRegister} autoComplete='off'>
        <CardContent>
          <div className='flex max-sm:flex-col items-center gap-6'>
            <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
            <div className='flex flex-grow flex-col gap-4'>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={handleFileInputChange}
                    id='account-settings-upload-image'
                  />
                </Button>
                <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
                  Reset
                </Button>
              </div>
              <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
            </div>
          </div>
          <Grid container className='mt-2' spacing={6}>
            <Grid item xs={12}>
              <Typography variant='body2' className='font-medium'>
                1. Account Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                id='username'
                label='Username'
                placeholder='johnDoe'
                autoComplete="off"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                id='email'
                type='email'
                label='Email'
                value={formData.email}
                placeholder='johndoe@gmail.com'
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                id='password'
                label='Password'
                placeholder='············'
                type={formData.isPasswordShown ? 'text' : 'password'}
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <i className={formData.isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                id='confirm-password'
                label='Confirm Password'
                placeholder='············'
                type={formData.isConfirmPasswordShown ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle confirm password visibility'
                      >
                        <i className={formData.isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' className='font-medium'>
                2. Personal Info
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                id='first-name'
                label='First Name'
                placeholder='John'
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                id='last-name'
                label='Last Name'
                placeholder='Doe'
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                id='country'
                label='Country'
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
              >
                <MenuItem value=''>Select Country</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                id='gender'
                label='Gender'
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
              >
                <MenuItem value=''>Select Gender</MenuItem>
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppReactDatepicker
                selected={formData.date}
                showYearDropdown
                showMonthDropdown

                // onChange={date => setFormData({ ...formData, date })}
                onChange={(date) => {
                  if (date && date > minDate) {
                    alert('You must be at least 18 years old.');
                  } else {
                    setFormData({ ...formData, date });
                  }
                }}
                placeholderText='MM/DD/YYYY'
                minDate={new Date('1900-01-01')} // Optional: Set a minimum date if needed
                maxDate={new Date()}
                customInput={<CustomTextField fullWidth id='birth-date' label='Birth Date' placeholder='MM-DD-YYYY' />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                id='phone-number'
                label="Phone"
                placeholder="+971"
                type="tel"
                value={formData.phoneNumber}
                onChange={e => {
                  let value = e.target.value;

                  if (value.startsWith("+971")) {
                    value = value.replace(/[^0-9+\-() ]/g, "");
                  } else {
                    value = "+971";
                  }

                  setFormData({ ...formData, phoneNumber: value });
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type='submit' variant='contained' className='mie-2'>
            Submit
          </Button>
          <Button
            type='reset'
            variant='tonal'
            color='secondary'
            onClick={handleReset}
          >
            Reset
          </Button>
        </CardActions>
        {loading == true && <Loading />}
      </form>
    </Card>
  )
}

export default AddUserForm
