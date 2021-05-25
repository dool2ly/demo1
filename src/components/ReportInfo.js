import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Title from './Title'

const useStyles = makeStyles((theme) => ({
  th: {
    fontWeight: 'bold',
    align: 'center'
  }
}))

function ReportInfo(props) {
  const classes = useStyles()
  const { name, damdang, phone, email, payment } = props.comInfo

  return (
    <React.Fragment>
      <Title>계약고객정보</Title>
      <Table size="small">
        <TableBody>
          <TableRow key='info_name'>
            <TableCell className={classes.th} align='center'>기업명</TableCell>
            <TableCell>{name}</TableCell>
          </TableRow>

          <TableRow key='info_damdang'>
            <TableCell className={classes.th} align='center'>담당자</TableCell>
            <TableCell>{damdang}</TableCell>
          </TableRow>

          <TableRow key='info_phone'>
            <TableCell className={classes.th} align='center'>연락처</TableCell>
            <TableCell>{phone}</TableCell>
          </TableRow>

          <TableRow key='info_email'>
            <TableCell className={classes.th} align='center'>이메일</TableCell>
            <TableCell>{email}</TableCell>
        </TableRow>

        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default ReportInfo