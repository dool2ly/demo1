import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Title from './Title'

const useStyles = makeStyles((theme) => ({
  th: {
    fontWeight: 'bold',
    align: 'center',
    width: 180
  }
}))

function ReportTotal(props) {
  const classes = useStyles()
  const { additionalService, cloudService, gong, total, vat } = props.total

  return (
    <React.Fragment>
      <Title>청구정보 요약</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>청구항목</TableCell>
            <TableCell>금액</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow key='total_total'>
            <TableCell className={classes.th} align='center'>청구금액</TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>

          <TableRow key="total_cloud">
            <TableCell className={classes.th} align='center'>CSP서비스 (1번항목)</TableCell>
            <TableCell align="right">{cloudService}</TableCell>
          </TableRow>

          <TableRow key="total_additional">
            <TableCell className={classes.th} align='center'>부가서비스 (2번항목)</TableCell>
            <TableCell align="right">{additionalService}</TableCell>
          </TableRow>

          <TableRow key="total_gong">
            <TableCell className={classes.th} align='center'>공급가액</TableCell>
            <TableCell align="right">{gong}</TableCell>
          </TableRow>

          <TableRow key="total_vat">
            <TableCell className={classes.th} align='center'>부가가치세</TableCell>
            <TableCell align="right">{vat}</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default ReportTotal