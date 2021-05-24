import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { BrowserRouter, Switch } from 'react-router-dom'
import clsx from 'clsx'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'

import logo from './images/CMLOGO_WHITE.png'
import { mainItems, secondItems } from './components/MenuItems'
import Home from './components/Home'
import Codes from './components/Codes'
import CodeAdd from './components/CodeAdd'
import ChartTest from './components/ChartTest'

const drawerWidth = 240

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#202020'
    }
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  logo: {
    maxWidth: 180,
    marginRight: '10px'
  }
}));

function App() {
  const classes = useStyles()
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <img src={logo} alt="logo" className={classes.logo} />
              {/* <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                CloudMate
              </Typography> */}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
              <List>{mainItems}</List>
            <Divider />
              <List>{secondItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/_code" component={Codes} />
              <Route path="/_codeAdd" component={CodeAdd} />
              <Route path="/test" component={ChartTest} />
            </Switch>
          </main>

        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App