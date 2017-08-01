import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import {SetTitle} from '../../actions/'
import Header from '../../components/Header'
import './home.css'
import './club-2492011_1280.jpg'
class Home extends Component {
    componentWillMount(){
        this.props.setTitle("借贷中心")
    }

    render(){

        if(!sessionStorage.jwtToken){
           return <Redirect to='/login'/>
        }else{
            this.props.setTitle("借贷中心")
            return(
                <div>
                    <Header/>
                    <div className="banner">
                    </div>
                    <div className="link-container">
                        <Link to="/list/small">500-5000极速小额贷款入口</Link>
                        <Link to="/list/middle">8000-30000中额贷款入口</Link>
                        <Link to="/list/large">最高500000大额贷款入口</Link>
                    </div>
                    <div className="footer">
                        <Link to="/beforeinfo">
                        点击领取现金红包
                        </Link>
                    </div>
                </div>
            )
        }
    }
}

function mapDispath(dispatch){

    return {
        setTitle: (title)=> {
            dispatch(SetTitle(title))
        }
    }
}

export default connect(null,mapDispath)(Home)