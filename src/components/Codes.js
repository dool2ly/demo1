import React from "react";
import { Route, Switch } from "react-router-dom";

import CodeList from './CodeList'
import CodeDetail from './CodeDetail'

function Codes({ match }) {
  return (
    <Switch>
      <Route exact path={match.path} component={CodeList} />
      <Route path={`${match.path}/:id`} component={CodeDetail} />
    </Switch>
  )
}

export default Codes