import React, { useEffect, useState } from "react";
import axios from 'axios'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
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
    // background: "red",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttonSave: {
    background: "#b71c1c",
    color: "white",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}))

function CodeDetail({ match }) {
  const classes = useStyles()
  const id = match.params.id
  const [codeData, setCodeData] = useState({})
  const [updateData, setUpdateData] = useState({})
  const [edit, setEdit] = useState(false)
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    axios.get(`/code/${id}`)
    .then(res => {
      setCodeData(res.data)
      setUpdateData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSubmit(false)
  }

  const handleEditButton = () => {
    if (edit) {
      // Save & view mode
      axios.put(`/code/${id}`, updateData)
      .then(res => {
        console.log(res.data)
        setSubmit(true)
      })
      .catch(err => {
        console.log(err)
      })

      setEdit(false)

    } else {
      // To edit mode
      setEdit(true)
    }
  }

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value})
  }

  // function handleChange(e) {
  //   const inputName = e.target.name
  //   const newValue = e.target.value
    
  //   setUpdateData((prvState) => {
  //     const revVal = {
  //       ...prvState,
  //       [inputName]: newValue
  //     }
  //     // console.log(revVal)
  //     return(revVal)
  //   })
  // }

  return (
    <>
      <main className={classes.layout}>
        <Snackbar open={submit} autoHideDuration={1800} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            요청 완료 !!!!!!!!!!!!!!!!!!
          </Alert>
        </Snackbar>
        <Paper className={classes.paper}>   
          <Typography align="center" variant="h4" gutterBottom>
            {codeData.code}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth name="code" label="Code" defaultValue={codeData.code} disabled={!edit} variant="outlined" onChange={handleChange} />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth name="codeKey" label="Code Key" defaultValue={codeData.codeKey} disabled={!edit} variant="outlined" onChange={handleChange} />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth name="codeValue" label="Code Value" defaultValue={codeData.codeValue} disabled={!edit} variant="outlined" onChange={handleChange} />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth label="Use" defaultValue={codeData.isUse} disabled={!edit} variant="outlined" />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth name="kindCode" label="Kind Code" defaultValue={codeData.kindCode} disabled={!edit} variant="outlined" onChange={handleChange} />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth label="Date" defaultValue={codeData.regDate} disabled={!edit} variant="outlined" />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth name="remark" label="Remark" defaultValue={codeData.remark} disabled={!edit} variant="outlined" onChange={handleChange} />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth name="sort" label="Sort" defaultValue={codeData.sort} disabled={!edit} variant="outlined" onChange={handleChange} />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth name="value1" label="Value 1" defaultValue={codeData.value1} disabled={!edit} variant="outlined" onChange={handleChange} />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth name="value2" label="Value 2" defaultValue={codeData.value2} disabled={!edit} variant="outlined" onChange={handleChange} />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {codeData.code && <TextField fullWidth name="value3" label="Value 3" defaultValue={codeData.value3} disabled={!edit} variant="outlined" onChange={handleChange} />}
            </Grid>
          </Grid>
          <React.Fragment>
            <div className={classes.buttons}>
              <Button className={classes.button} component={Link} to='/_code'>
                Back
              </Button>
              <Button
                className={clsx(classes.button, edit && classes.buttonSave)}
                variant="contained"
                onClick={handleEditButton}
              >
                {edit ? "Save":"Edit"}
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
      
    </>
  );
}

export default CodeDetail