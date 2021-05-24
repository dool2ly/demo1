import React from 'react'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AssignmentIcon from '@material-ui/icons/Assignment'


function ListItemLink(props) {
  const { icon, primary, to } = props
  const CustomLink = props => <Link to={to} {...props} />

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

export const mainItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>

    <ListItem button component={Link} to="/_code">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Code List" />
    </ListItem>

    <ListItem button component={Link} to="/_codeAdd">
      <ListItemIcon>
        <AddCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Code Add" />
    </ListItem>

    {/* warning 많음 <ListItemLink icon={<PeopleIcon />} primary="Code List" to="/list" /> */}
  </div>
)

export const secondItems = (
  <div>
    <ListSubheader inset>Sub title</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="second menu test" />
    </ListItem>
  </div>
)