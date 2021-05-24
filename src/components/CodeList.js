import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'

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
    // [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    //   width: 600,
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    // },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //   marginTop: theme.spacing(6),
    //   marginBottom: theme.spacing(6),
    //   padding: theme.spacing(3),
    // },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const columns = [
  // {field: 'seq', headerName: 'seq', width: 150},
  {field: 'sort', headerName: 'Sort', type: 'number', width: 90},
  // {field: 'code', headerName: 'Code', width: 100},
  {
    field: 'code',
    headerName: 'Code',
    renderCell: (params) => (
      <Button component={Link} to={`/_code/${params.getValue('seq')}`}>
        {/* {params.getValue('seq')} */}
        {params.value}
      </Button>
    )
  },
  {field: 'codeKey', headerName: 'Code Key', width: 120},
  {field: 'codeValue', headerName: 'Code Value', width: 150},
  {field: 'kindCode', headerName: 'Kind Code', width: 120},
  {field: 'isUse', headerName: 'Use', type: 'boolean', width: 90},
  {field: 'value1', headerName: 'Value 1', width: 150},
  {field: 'value2', headerName: 'Value 2', width: 150},
  {field: 'value3', headerName: 'Value 3', width: 150},
]

const dummyData = [
  {id: 0, sort: 0, code: 'testCode', codeKey: 'testCodeKey', codeValue: 'testCodeValue', kindCode: 'testKindCode', isUsed: 'testUsed', value1:'value1', value2:'value2', value3:'value3'},
  {id: 1, sort: 1, code: 'testCode', codeKey: 'testCodeKey', codeValue: 'testCodeValue', kindCode: 'testKindCode', isUsed: 'testUsed', value1:'value1', value2:'value2', value3:'value3'}
]

function CodeList() {
  const classes = useStyles()
  const [load, setLoad] = useState(false)
  const [codeList, setCodeList] = useState([])
  const [selectionModel, setSelectionModel] = useState([])
  const [submit, setSubmit] = useState(false)
  const [err, setErr] = useState(false)
  
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSubmit(false)
    setErr(false)
  }

  const loadData = () => {
    console.log('load')
    axios.get('/code')
    .then((res) => {
      let id = 0
      const fixData = res.data.map((item) => {
        id++
        return {...item.CodeTable, id}
      })
      
      setCodeList(fixData)
      setLoad(true)
    })
    .catch((err) => {
      console.log(err)
      setLoad(false)
    })
  }

  // DidMount
  useEffect(() => {
    loadData()
    // console.log('load')
    // axios.get('/code')
    // .then((res) => {
    //   let id = 0
    //   const fixData = res.data.map((item) => {
    //     id++
    //     return {...item.CodeTable, id}
    //   })
      
    //   setCodeList(fixData)
    //   setLoad(true)
    // })
    // .catch((err) => {
    //   console.log(err)
    //   setLoad(false)
    // })
  }, [])

  const handleDelete = () => {
    if (selectionModel.length === 0) {
      console.log('ret')
      return
    }
    const idx = selectionModel[0]-1
    const seq = codeList[idx].seq
    const headers = {
      'accept': 'application/json'
    }

    console.log(`delete ${seq}`)
    
    axios.delete(`/code/${seq}`,{},{headers: headers})
    .then(res => {
      console.log(res.data)
      loadData()
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
          <div style={{ height: 400, width: '100%' }}>
            {load &&
              <DataGrid
                rows={codeList}
                columns={columns}
                pageSize={5}
                onSelectionModelChange={(newSelection) => {
                  setSelectionModel(newSelection.selectionModel)
                }}
                selectionModel={selectionModel}
              />
            }
          </div>
          <React.Fragment>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                component={Link}
                to={'/_codeAdd'}
              >
                Add
              </Button>
              <Button className={classes.button} variant="contained" color="secondary" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  )
}

export default CodeList