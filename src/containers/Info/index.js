import React,{Component} from 'react'
import Header from '../../components/Header'
import {SetTitle} from '../../actions/'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'

import './Info.css'
class Info extends Component {
    constructor(props,context){
        super(props,context)
        this.props.setTitle("同步资料")
    }


    render(){
        if(!sessionStorage.getItem('jwtToken')){
            return <Redirect to='/login'/>
        }
        return(
           <div>
                <Header/>
               <div className="info-container">
                   <p className="description">完善个人信息，更多产品量身推荐，成功率更高！</p>
                   <Link to="/info01">个人信息</Link>
                   <Link to="/">确认无误-提交</Link>
               </div>
           </div>
        )
    }
}


function mapDispath(dispatch){

    return {
        setTitle: (title)=> {
            dispatch(SetTitle(title))
        },
        addInfo:(info) => {
            dispatch();
        }
    }
}



export default connect(null,mapDispath)(Info)