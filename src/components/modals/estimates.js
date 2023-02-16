import stringAvatar from '@/utils/stringAvatar'
import { Avatar, Box, Button, Grid, Modal, Typography } from '@mui/material'
import { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const arr = [
  'Dustin Hoffman',
  'Recardo morales',
  'Mustafa Bobo',
  'Fatima Bellagio',
  'Bescuno France',
  'Dustin Hoffman',
  'Recardo morales',
  'Fatima Bellagio',
  'Bescuno France',
  'Dustin Hoffman',
  'Recardo morales',
  'Fatima Bellagio',
  'Bescuno France',
]

const EstimatesModal = ({estimatesList, isOpenEstimatesList, handleClose }) => {
  return (
    <Modal hideBackdrop open={isOpenEstimatesList} onClose={handleClose}>
      <Box sx={{ ...style }}>
        <h2>Эстимейты</h2>
        <Grid container spacing={2} sx={{ overflowY: 'scroll' }} height={'90%'}>
          {estimatesList.map((item) => {
            const userName = item.User.firstName + ' ' + item.User.lastName
            return(
            <Grid key={item.id} item>
              <Box
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={140}
              >
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignItems={'center'}
                >
                  <Avatar {...stringAvatar(userName)} />
                  <Typography ml={1} lineHeight={1}>
                    {userName}
                  </Typography>
                </Box>
                <Typography fontWeight={'bold'} whiteSpace={'nowrap'}>
                  {item.estimate}ч.
                </Typography>
              </Box>
            </Grid>
          )})}
        </Grid>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'end'}>
          <Button onClick={handleClose}>Закрыть</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EstimatesModal
