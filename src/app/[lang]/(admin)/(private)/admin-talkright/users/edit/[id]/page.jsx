'use client'

// MUI Imports
import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'


import Grid from '@mui/material/Grid'

// Component Imports
import UserEditHeader from '../../components/UserEditHeader'

import EditUserForm from '../../components/EditUserForm'
import { useGetUserByIdMutation } from '@/redux-store/api/talkrightApi'
import ProgressCircularCustomization from '@/components/loader'


const EditUsers = ({ params }) => {

  const [getUserById, { isLoading, error }] = useGetUserByIdMutation();
  const [userData, setUserData] = useState(null)


  //==================================Get User By Id===================================
  const UserById = async () => {
    try {
      const getuserResult = await getUserById({ documentId: params.id });

      if (getuserResult.data) {
        setUserData(getuserResult.data)
      }
      else {
        toast.error(getuserResult?.error?.data?.message)
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error(error.data.message);

    }
  }

  //==================================Call Whenever Page Rendered===================================
  useEffect(() => {
    UserById()
  }, [])

  return (
    isLoading == true ?
      <ProgressCircularCustomization />
      :
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <UserEditHeader />
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <EditUserForm userData={userData} uid={params.id} />
            </Grid>
          </Grid>
        </Grid>

      </Grid>
  )
}

export default EditUsers
