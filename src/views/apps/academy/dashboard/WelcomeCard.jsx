'use client'

// Next Imports
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'


// MUI Imports
import Link from 'next/link'

import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { lighten, darken, useTheme } from '@mui/material/styles'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const data = [
  {
    title: 'Total no of calls',
    value: '34',
    color: 'primary',
    icon: 'tabler-phone-call',
  },
  {
    title: 'Average call time',
    value: '82',
    color: 'info',
    icon: 'tabler-phone-call',
  },
  {
    title: 'Today calls',
    value: '14',
    color: 'warning',
    icon: 'tabler-phone-call',
  }
]

const WelcomeCard = () => {
  // Hooks
  const theme = useTheme()
  const { lang: locale } = useParams()
  const belowMdScreen = useMediaQuery(theme.breakpoints.down('md'))

  // Vars
  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    grid: {
      padding: {
        left: 20,
        right: 20
      }
    },
    colors: [
      darken(theme.palette.success.main, 0.15),
      'var(--mui-palette-success-main)',
      darken(theme.palette.success.main, 0.1),
      lighten(theme.palette.success.main, 0.2),
      lighten(theme.palette.success.main, 0.4),
      lighten(theme.palette.success.main, 0.6)
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { theme: 'false' },
    dataLabels: { enabled: false },
    labels: ['36h', '56h', '16h', '32h', '56h', '16h'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 20,
              fontSize: '0.875rem'
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              fontSize: '1.125rem',
              formatter: value => `${value}%`,
              color: 'var(--mui-palette-text-primary)'
            },
            total: {
              show: true,
              fontSize: '0.8125rem',
              label: 'Total',
              color: 'var(--mui-palette-text-disabled)',
              formatter: () => '231h'
            }
          }
        }
      }
    }
  }

  return (
    <div className='flex max-md:flex-col md:items-center gap-6 plb-6'>
      <div className='md:is-8/12'>
        <div className='flex items-baseline gap-1 mbe-2'>
          <Typography variant='h4'>Hi, John👋🏻</Typography>
        </div>
        <div className='mbe-4'>
          <Typography>Your progress this week is Awesome. let&apos;s keep it up</Typography>
        </div>
        <div className='flex flex-wrap max-md:flex-col justify-between gap-6'>
          {data.map((item, i) => (
            <div key={i} className='flex gap-4'>
              <CustomAvatar variant='rounded' skin='light' size={54} color={item.color}>
                 <i className={item.icon}  />
              </CustomAvatar>
              <div>
                <Typography className='font-medium'>{item.title}</Typography>
                <Typography variant='h4' color={`${item.color}.main`}>
                  {item.value}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider orientation={belowMdScreen ? 'horizontal' : 'vertical'} flexItem />
      <div className='flex justify-between md:is-4/12'>
        <div className='flex flex-col justify-between gap-6'>
          <div>
            <Typography variant='h5' className='mbe-1'>
              Time spendings
            </Typography>
            <Typography>Weekly report</Typography>
          </div>
          <div>
            <Typography variant='h4' className='mbe-2'>
              231<span className='text-textSecondary'>h</span> 14<span className='text-textSecondary'>m</span>
            </Typography>
            <Link href={`/${locale}/talk-right/add-mints`} passHref>
            <Button variant='contained'>
                Add more mints
            </Button>
            </Link>
          </div>
        </div>
        <AppReactApexCharts type='donut' height={189} width={150} options={options} series={[23, 10]} />
      </div>
    </div>
  )
}

export default WelcomeCard
