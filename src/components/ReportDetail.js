import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Title from './Title'


const useStyles = makeStyles((theme) => ({
}))

function DetailTable(props) {
  let id = 0
  const data = props.data

  console.log(data)
  return (
    <React.Fragment>
      <TableHead>
        <TableRow>
          <TableCell colSpan={7}>
            {props.header}
          </TableCell>
        </TableRow>
        <TableRow key={props.key}>
          <TableCell>No.</TableCell>
          <TableCell>Supplier</TableCell>
          <TableCell>Service</TableCell>
          <TableCell>Service Name</TableCell>
          <TableCell>Q`ty</TableCell>
          <TableCell>Unit Price</TableCell>
          <TableCell>Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={`${props.keyName}-${id++}`}>
            <TableCell key='abc'>{id+1}</TableCell>
            <TableCell key='abc1'>{row.supplier}</TableCell>
            <TableCell key='abc2'>{row.service}</TableCell>
            <TableCell key='abc3'>{row.service_name}</TableCell>
            <TableCell key='abc4'>{row.qty}</TableCell>
            <TableCell key='abc5'>{row.unit_price}</TableCell>
            <TableCell key='abc6'>{row.unit_price * row.qty}</TableCell>
          </TableRow>
        ))}

      </TableBody>

    </React.Fragment>
  )
}

function DetailTotal({title, content}) {
  return (
    <TableRow>
      <TableCell colSpan={5}>{title}</TableCell>
      <TableCell colSpan={2} align='right'>{content}</TableCell>
    </TableRow>
  )
}

function ReportDetail(props) {
  const { csData, asData } = props
  const header1 = "1. Cloud Services / Appliance"
  const header2 = "2. Additional Services"

  let csSum = 0
  csData.map(item => csSum += item.unit_price * item.qty)
  console.log(csSum)

  let asSum = 0
  asData.map(item => asSum += item.unit_price * item.qty)
  console.log(asSum)
  
  return (
    <React.Fragment>
      <Title>청구상세내역</Title>
      <TableContainer>
        <Table size="small">
          <DetailTable header={header1} data={csData} keyName='1' />
          <DetailTable header={header2} data={asData} keyName='2' />
          <TableBody>
            <DetailTotal title="공급가액 (부가가치세 별도)" content={csSum + asSum}/>
            <DetailTotal title="부가가치세 (10%)" content={(csSum + asSum) * 0.1}/>
            <DetailTotal title="합 계 액" content={(csSum + asSum) * 0.1 + csSum + asSum}/>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

export default ReportDetail