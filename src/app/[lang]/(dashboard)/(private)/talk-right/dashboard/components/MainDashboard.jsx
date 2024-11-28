// // MUI Imports
// import Grid from '@mui/material/Grid'

// // Component Imports
// import WelcomeCard from './WelcomeCard'
// import ProjectsTable from './ProjectsTable'
// import InterestedTopics from './InterestedTopics'
// import CardVerticalRatings from './CardVerticalRatings'
// import LogisticsShipmentStatistics from './LogisticsShipmentStatistics'
// import SupportTracker from './SupportTracker'

// // Data Imports
// import { getProfileData } from '@/app/server/actions'

// /**
//  * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
//  * ! `.env` file found at root of your project and also update the API endpoints like `/apps/academy` in below example.
//  * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
//  * ! because we've used the server action for getting our static data.
//  */
// /* const getAcademyData = async () => {
//   // Vars
//   const res = await fetch(`${process.env.API_URL}/apps/academy`)

//   if (!res.ok) {
//     throw new Error('Failed to fetch academy data')
//   }

//   return res.json()
// } */
// const MainDashboard = async () => {
//   // Vars
//   const profiledata = await getProfileData()

//   return (
//     <Grid container spacing={6}>
//       <Grid item xs={12}>
//         <WelcomeCard />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <LogisticsShipmentStatistics />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <SupportTracker />
//       </Grid>
//       <Grid item xs={12} md={8}>
//         <InterestedTopics />
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <CardVerticalRatings />
//       </Grid>
//       <Grid item xs={12} lg={12}>
//         <ProjectsTable projectTable={profiledata?.users.profile.DashboardTable} callType="today" />
//       </Grid>
//     </Grid>
//   )
// }

// export default MainDashboard



// Assuming you are using React

'use client'

import React, { useEffect, useState } from 'react';

const MainDashboard = () => {

  const [ws, setWs] = useState(null);

  useEffect(() => {
    try {
      const connectWebSocket = () => {
        const socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_BACKEND_URL}/connection`);

        socket.onopen = () => {
          console.log('WebSocket connection established');
          socket.send(JSON.stringify({ event: 'start', start: { streamSid: '123', callSid: 'abc', from: '(254) 218-5857' } }));
        };

        socket.onmessage = (message) => {
          console.log('Message from server:', message.data);
        };

        socket.onerror = (error) => {
          console.error('WebSocket error observed:', error);
        };

        socket.onclose = (event) => {
          if (event.wasClean) {
            console.log(`WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`);
          } else {
            console.error('WebSocket connection closed unexpectedly');
          }
        };

        setWs(socket);
      };

      connectWebSocket();

      return () => {
        if (ws) {
          ws.close();
        }
      };
    } catch (error) {
      console.log(error)
    }
  }, []);

  const handleCall = async () => {
    try {
      const response = await fetch('/incoming', { method: 'POST' });

      if (response.ok) {
        console.log('Call initiated', response);
      } else {
        console.error('Failed to initiate call');
      }
    } catch (error) {
      console.error('Error initiating call:', error);
    }
  };

  return (
    <div>
      <h1>Voice Interaction App</h1>
      <button onClick={handleCall}>Start Call</button>
    </div>
  );
};

export default MainDashboard;
