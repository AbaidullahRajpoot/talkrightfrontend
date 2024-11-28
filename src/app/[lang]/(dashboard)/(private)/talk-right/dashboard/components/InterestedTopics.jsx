'use client'

// Next Imports
import { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [
  {
    data: [35, 20, 16, 14, 10, 9]
  }
]

const data1 = [
  { title: 'Cardiovascular', value: 35, colorClass: 'text-primary' },
  { title: 'Internal Medicine', value: 20, colorClass: 'text-info' },
  { title: 'Neurology', value: 18, colorClass: 'text-secondary' }
]

const data2 = [
  { title: 'Orthopaedics', value: 16, colorClass: 'text-success' },
  { title: 'Oncology', value: 10, colorClass: 'text-warning' },
  { title: 'Urology', value: 9, colorClass: 'text-error' }
]

const labels = ['Cardiovascular', 'Internal Medicine', 'Orthopaedics', 'Neurology', 'Oncology', 'Urology']


const InterestedTopics = () => {
  // Hooks
  const theme = useTheme()
  const [fontSize, updateFontSize] = useState("16px")




  // Vars
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '70%',
        distributed: true,
        borderRadius: 7,
        borderRadiusApplication: 'end'
      }
    },
    colors: [
      'var(--mui-palette-primary-main)',
      'var(--mui-palette-info-main)',
      'var(--mui-palette-secondary-main)',
      'var(--mui-palette-success-main)',
      'var(--mui-palette-warning-main)',
      'var(--mui-palette-error-main)'
    ],
    grid: {
      strokeDashArray: 8,
      borderColor: 'var(--mui-palette-divider)',
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -25,
        left: 21,
        right: 25,
        bottom: 0
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: 0,
      style: {
        colors: ['#fff'],
        fontWeight: 500,
        fontSize: "clamp(10px, 1vw, 16px)"
      },
      formatter(val, opt) {
        return labels[opt.dataPointIndex]
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '0.75rem'
      },
      onDatasetHover: {
        highlightDataSeries: false
      }
    },
    legend: { show: false },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['6', '5', '4', '3', '2', '1'],
      labels: {
        formatter: val => `${val}%`,
        style: {
          fontSize: '0.8125rem',
          colors: 'var(--mui-palette-text-disabled)'
        }
      }
    },
    yaxis: {
      labels: {
        align: theme.direction === 'rtl' ? 'right' : 'left',
        style: {
          fontWeight: 500,
          fontSize: '0.8125rem',
          colors: 'var(--mui-palette-text-disabled)'
        },
        offsetX: theme.direction === 'rtl' ? -15 : -30
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Total Appointments'
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={6} className='max-sm:mbe-6'>
            <AppReactApexCharts type='bar' height={296} width='100%' series={series} options={options} />
          </Grid>
          <Grid item xs={12} sm={6} alignSelf='center'>
            <div className='flex justify-around items-start'>
              <div className='flex flex-col gap-y-12'>
                {data1.map((item, i) => (
                  <div key={i} className='flex gap-2'>
                    <i className={classnames('tabler-circle-filled text-xs m-[5px]', item.colorClass)} />
                    <div>
                      <Typography className='responsive-text'>{item.title}</Typography>
                      <Typography className='responsive-text' variant='h5'>{`${item.value}%`}</Typography>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-col gap-y-12'>
                {data2.map((item, i) => (
                  <div key={i} className='flex gap-2'>
                    <i className={classnames('tabler-circle-filled text-xs m-[5px]', item.colorClass)} />
                    <div>
                      <Typography className='responsive-text'>{item.title}</Typography>
                      <Typography className='responsive-text' variant='h5'>{`${item.value}%`}</Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default InterestedTopics
