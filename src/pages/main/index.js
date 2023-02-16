import NavBar from '@/components/navbar'
import SideMenu from '@/components/side-menu'
import Tasks from '@/components/tasks'
import { useUserContext } from '@/hooks/useUserContext'
import { Box, CssBaseline } from '@mui/material'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

const Main = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen)
  }
  const router = useRouter()

  const { user } = useUserContext()

  useEffect(() => {
    if (!user.id) {
      router.push('/')
    }
  }, [user])
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <NavBar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <SideMenu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Tasks />
    </Box>
  )
}

export default Main
