import React,{Component} from 'react'
import Header from '../../components/Header'
import {SetTitle,sendInfo01} from '../../actions/'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Login from '../Login'

import "./info01.css"
class Info extends Component {
    constructor(props,context){
        super(props,context)
        this.props.setTitle("个人信息")
        this.changeFocusStyle = this.changeFocusStyle.bind(this)
        this.changeBlurStyle = this.changeBlurStyle.bind(this)
        this.info_continue = this.info_continue.bind(this)
        this.changeMessage = this.changeMessage.bind(this)
        this.state = {
            person:null,
            home_address:null,
            work_address:null,
            phoneNumber:this.props.user.phone
        }
    }
    sendMessage(e){

        e.preventDefault();

        this.props.sendInfo01(this.state);
    }

    changeMessage(e){
        switch (e.target.name){
            case "person":
                return this.setState({person:e.target.value})
            case "home_address":
                return this.setState({home_address:e.target.value})
            case "work_address":
                return this.setState({work_address:e.target.value})
            default:
                return null;
        }
    }

    info_continue(){
        this.props.sendcontinue(this.state);
    }

    changeFocusStyle(){
        this.setState({style:{top:0}})
    }

    changeBlurStyle(){
        this.setState({style:{top:0}})
    }


    render(){
        console.log(this.props.user)
        if(!sessionStorage.getItem('jwtToken')){
            return (
                <div>
                    <Login/>
                </div>
            )
        }

        return(
            <div>
                <Header/>
                <div className="info01-container" style={this.state.style}>
                    <form onSubmit={this.sendMessage}>
                        <input type="text"  onFocus={this.changeFocusStyle}  onBlur={this.changeBlurStyle} onChange={this.changeMessage} name="person" placeholder="联系人"/>
                        <input type="text"  onFocus={this.changeFocusStyle}  onBlur={this.changeBlurStyle} onChange={this.changeMessage} name="home_address" placeholder="居住地址"/>
                        <input type="text"  onFocus={this.changeFocusStyle}  onBlur={this.changeBlurStyle} onChange={this.changeMessage} name="work_address" placeholder="工作单位"/>
                        <Link to="/info"   onClick = {this.info_continue} className="continue-button">确认无误-继续</Link>
                    </form>
                </div>
            </div>
        )
    }
}


function mapState(state){
    return {
        user:state.auth.user.user
    }
}

function mapDispath(dispatch){

    return {
        setTitle: (title)=> {
            dispatch(SetTitle(title))
        },
        sendcontinue:(info) => {
            dispatch(sendInfo01(info))
        }

    }
}

export default connect(mapState,mapDispath)(Info)