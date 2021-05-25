import React, { useEffect, useState } from 'react'
import axios from 'axios'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import ReportInfo from './ReportInfo'
import ReportTotal from './ReportTotal'
import ReportDetail from './ReportDetail'

const customerId = 0

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    // background: 'grey'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 280,
  },
}))

function Report() {
  const classes = useStyles()
  const [comInfo, setComInfo] = useState()
  const [cloudServices, setCloudServices] = useState()
  const [additionalServices, setAdditionalServices] = useState()
  const [total, setTotal] = useState({
    total: 0,
    cloudService: 0,
    additionalService: 0,
    gong: 0,
    vat: 0
  })
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    axios.get('/data/0/info.json')
    .then((res) => {
      // console.log(res.data)
      setComInfo(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

    axios.get('/data/0/usage.json')
    .then((res) => {
      const cs = res.data.cloud_services
      let csTotal = 0
      cs.map(item => csTotal += item.qty * item.unit_price)
      setCloudServices(cs)

      const as = res.data.additional_services
      let asTotal = 0
      as.map(item => asTotal += item.qty * item.unit_price)
      setAdditionalServices(as)

      setTotal({
        cloudService: csTotal,
        additionalService: asTotal,
        gong: csTotal + asTotal,
        vat: (csTotal + asTotal) * 0.1,
        total:(csTotal + asTotal) * 0.1 + csTotal + asTotal
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <React.Fragment>
      <Container className={classes.container} maxWidth="md">
        <Grid container spacing={3}>

          {/* Customer Information */}
          <Grid item xs={12} lg={4}>
            <Paper className={fixedHeightPaper}>
              {comInfo && <ReportInfo comInfo={comInfo} />}
            </Paper>
          </Grid>

          {/* Total */}
          <Grid item xs={12}lg={8}>
            <Paper className={fixedHeightPaper}>
              {total.total && <ReportTotal total={total} />}
            </Paper>
          </Grid>

          {/* Detail */}
          <Grid item xs={12}lg={12}>
            <Paper className={classes.paper}>
              {total.total && <ReportDetail csData={cloudServices} asData={additionalServices} />}
            </Paper>
          </Grid>

          <Grid item xs={12}lg={4}>
            <Paper className={classes.paper}>
              3
            </Paper>
          </Grid>

          <Grid item xs={12}lg={4}>
            <Paper className={classes.paper}>
              4
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Report