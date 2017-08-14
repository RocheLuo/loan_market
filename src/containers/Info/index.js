import React,{Component} from 'react'
import Header from '../../components/Header'
import {SetTitle,getAdUrl} from '../../actions/'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'

import './Info.css'
class Info extends Component {
    constructor(props,context){
        super(props,context)
        this.props.setTitle("同步资料")
        this.props.getAdurl()

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
                   <a href={this.props.AdUrl.url}>确认无误-提交</a>
               </div>
           </div>
        )
    }
}

function mapState(state){
    return {
        AdUrl:state.info
    }
}

function mapDispath(dispatch){

    return {
        setTitle: (title)=> {
            dispatch(SetTitle(title))
        },
        addInfo:(info) => {
            dispatch();
        },
        getAdurl:() => {
            dispatch(getAdUrl())
        }
    }
}



export default connect(mapState,mapDispath)(Info)