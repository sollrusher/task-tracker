import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import stringAvatar from '@/utils/stringAvatar'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import useUser from '@/hooks/useUser'
import { useUserContext } from '@/hooks/useUserContext'

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 200,
    width: `calc(100% - ${200}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

function NavBar({ isDrawerOpen, toggleDrawer }) {
  const [anchorElUser, setAnchorElUser] = useState(null)

  const { user, clearUser } = useUserContext()


  const currentUserName = user.firstName + ' ' + user.lastName

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const userLogout = () => {
    handleCloseUserMenu()
    clearUser()
  }

  return (
    <AppBar position="absolute" open={isDrawerOpen}>
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(isDrawerOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Avatar {...stringAvatar('Workspace Name')} />
        <Typography
          variant="h6"
          noWrap
          component="p"
          sx={{
            ml: 2,
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Workspace name
        </Typography>

        <Box sx={{ flexGrow: 0, display: 'flex' , alignItems:'center'}}>
        <Typography fontWeight={'bold'} mr={2}>{currentUserName}</Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar {...stringAvatar(currentUserName)} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
             <MenuItem onClick={userLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
