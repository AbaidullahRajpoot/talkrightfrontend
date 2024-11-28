// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'


const CardVerticalRatings = () => {
  return (
    <Card>
      <CardContent>
        <div className='flex flex-col items-center flex-wrap gap-x-2 gap-y-1 mbe-2'>
          <Typography className="mbe-2" variant='h4' >
            Rating Overview
          </Typography>
          <Typography variant='h2' className="mbe-2">
            4.3
          </Typography>
          <Rating name='read-only' value={4} readOnly />
        </div>
        <div className='flex justify-center flex-wrap gap-x-2 gap-y-1 mbe-2 my-10'>
          <div className='flex flex-row  items-center'>
            <Typography variant='h6' className="mbe-2">
              5 star
            </Typography>
            <LinearProgress
              value={95}
              variant='determinate'
              color={'warning'}
              className='min-bs-2 is-40 ml-6'
            />
          </div>
          <div className='flex flex-row  items-center'>
            <Typography variant='h6' className="mbe-2">
              4 star
            </Typography>
            <LinearProgress
              value={85}
              variant='determinate'
              color={'warning'}
              className='min-bs-2 is-40 ml-6'
            />
          </div>
          <div className='flex flex-row  items-center'>
            <Typography variant='h6' className="mbe-2">
              3 star
            </Typography>
            <LinearProgress
              value={60}
              variant='determinate'
              color={'warning'}
              className='min-bs-2 is-40 ml-6'
            />
          </div>
          <div className='flex flex-row  items-center'>
            <Typography variant='h6' className="mbe-2">
              2 star
            </Typography>
            <LinearProgress
              value={40}
              variant='determinate'
              color={'warning'}
              className='min-bs-2 is-40 ml-6'
            />
          </div>
          <div className='flex flex-row  items-center'>
            <Typography variant='h6' className="mbe-2">
              1 star
            </Typography>
            <LinearProgress
              value={20}
              variant='determinate'
              color={'warning'}
              className='min-bs-2 is-40 ml-6'
            />
          </div>
        </div>




        {/* <Typography variant='h5' className='mbe-2'>
          The Best Answers
        </Typography>
        <div className='flex flex-wrap gap-x-2 gap-y-1 mbe-2'>
          <Rating name='read-only' value={4} readOnly />
          <Typography>4 Star | 98 reviews</Typography>
        </div>
        <Typography color='text.secondary' className='mbe-4'>
          If you are looking for a new way to promote your business that won&#39;t cost you more money, maybe printing
          is one of the options you won&#39;t resist.
        </Typography>
        <Typography color='text.secondary'>
          Printing is a widely use process in making printed materials that are used for advertising. It become fast,
          easy and simple.
        </Typography> */}
      </CardContent>
      {/* <CardActions className='card-actions-dense'>
        <Button>Location</Button>
        <Button>Review</Button>
      </CardActions> */}
    </Card>
  )
}

export default CardVerticalRatings
