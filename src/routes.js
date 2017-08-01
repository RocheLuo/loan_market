import React from 'react'
import { Route } from 'react-router'
import Home from './containers/Home'
import Info from './containers/Info'
import List from './containers/List'
import Login from './containers/Login'
import Info01 from './containers/Info01'
import BeforeInfo from './containers/BeforeInfo'

let content;

    content = (
        <div className="ant-layout-base">
                <Route exact path="/" component={Home}/>
                <Route path="/info" component={Info}/>
                <Route path="/list/:id" component={List}/>
                <Route path="/info01" component={Info01}/>
                <Route path="/beforeinfo" component={BeforeInfo}/>
                <Route path="/login" component={Login}/>
        </div>
    );

export default content
