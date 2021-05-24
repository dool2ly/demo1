import  React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}))

function CodeAdd() {
  const classes = useStyles()
  const [codeData, setCodeData] = useState({isUse: true})
  const [submit, setSubmit] = useState(false)
  const [err, setErr] = useState(false)

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSubmit(false)
    setErr(false)
  }

  function handleChange(e) {
    // console.log(e.target.name)
    // console.log(e.target.value)
    // console.log(e.target.checked)
    const name = e.target.name
    let value = ''
    
    if (name === 'isUse') {
      value = e.target.checked
    } else {
      value = e.target.value
    }
    // console.log(name)
    // console.log(value)
    setCodeData({...codeData, [name]: value})
  }

  

  function handleSubmit(e) {
    const headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }

    console.log(codeData)

    axios.post('/code/', codeData, {headers: headers})
    .then(res => {
      console.log(res.data)
      setSubmit(true)
    })
    .catch(err => {
      console.log(err)
      setErr(true)
    })
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Snackbar open={submit} autoHideDuration={1800} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            요청 완료 !!!!!!!
          </Alert>
        </Snackbar>
        <Snackbar open={err} autoHideDuration={1800} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            에러발생!
          </Alert>
        </Snackbar>
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Add code
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="code" label="Code" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="codeKey" label="Code Key" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="codeValue" label="Code Value" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="kindCode" label="Kind Code" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="remark" label="Remark" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="sort" type="number" label="Sort" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="value1" label="Value 1" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="value2" label="Value 2" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="value3" label="Value 3" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={codeData.isUse} onChange={handleChange} name="isUse" />}
                label="Use"
              />
            </Grid>
          </Grid>
          <React.Fragment>
            <div className={classes.buttons}>
              <Button className={classes.button} component={Link} to='/_code'>
                Back
              </Button>
              <Button className={classes.button} variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  )
}

export default CodeAdd