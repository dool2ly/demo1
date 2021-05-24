import React from 'react'

//code, codeKey, codeValue, kindCode, value1, value2, value3
function CodeListItem(props) {
  const {code, codeKey} = props.codeData
  console.log(code)

  return (
    <li>{code}</li>
  )
}
export default CodeListItem