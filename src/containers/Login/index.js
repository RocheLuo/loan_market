import React,{Component} from 'react'
import {connect} from 'react-redux'
import {login} from "../../actions/auth"
import {Link} from 'react-router-dom'
import Header from '../../components/Header'
import {SetTitle} from '../../actions/'
import "./login.css"

class Login extends Component {
    constructor(props,context){

        super(props,context)
        this.props.setTitle("登录／注册账号")

        this.login = this.login.bind(this)
        this.setLoginState = this.setLoginState.bind(this)
        this.changeFunction = this.changeFunction.bind(this)
        this.checkPhoneNumber = this.checkPhoneNumber.bind(this)
        this.changeFocusStyle = this.changeFocusStyle.bind(this)
        this.changeBlurStyle = this.changeBlurStyle.bind(this)
        this.state = {
            userName:null,
            phoneNumber:null,
            VCode:null,
            hasLogin:false,
            beforeLogin:false,
            style:{

            }
        }
    }

    login(e){
        e.preventDefault();
            if(this.state.beforeLogin){
                this.props.sendLoginInfo(this.state)
                this.setState({hasLogin:true})
            }
    }
    changeFunction(e){
        e.target.innerHTML = "立即贷款"
    }
    checkPhoneNumber(number){

        console.log(number)

        const reg =  /^\d{11}$/;

        return reg.test(number);
    }

    setLoginState(e){

        switch (e.target.name){
            case "userName":
                return this.setState({userName:e.target.value})
            case "phoneNumber":
                if(!this.checkPhoneNumber(e.target.value)){
                    this.setState({style:{border:'1px solid #ff9999'}})
                    this.setState({beforeLogin:false})
                }else{
                    this.setState({style:{border:'1px solid #dbe2e8'}})
                    this.setState({beforeLogin:true})
                }
                return this.setState({phoneNumber:e.target.value})
            case "VCode":
                return this.setState({VCode:e.target.value})
            default:
                return null;
        }

    }
    changeFocusStyle(){
        this.setState({style:{top:'0'}})
    }
    changeBlurStyle(e){

    }

    render(){

        return(
            <div>
                <Header/>
                <div className="login-container">
                    <form onSubmit={this.login}>
                        <input type="text" onFocus={this.changeFocusStyle}  onBlur={this.changeBlurStyle} onChange={this.setLoginState} name="userName" placeholder="真实姓名"/>
                        <input type="text" onFocus={this.changeFocusStyle}  style={this.state.style} onBlur={this.changeBlurStyle}  onChange={this.setLoginState} placeholder="手机号码" name="phoneNumber"/>
                        <span></span>
                        <div className="VCode-container">
                            <input type="text"  onFocus={this.changeFocusStyle} onBlur={this.changeBlurStyle} onChange={this.setLoginState} placeholder="验证码" name="VCode"/>
                            <button className="VCode-Button"><Link to="/">获取验证</Link></button>
                        </div>
                        {
                            <button type="submit">立即注册</button>
                        }
                    </form>
                </div>
            </div>

        )
    }
}



function mapDispatch (dispatch) {
    return {
        sendLoginInfo(loginInfo){
            dispatch(login(loginInfo))
        },
        setTitle: (title)=> {
            dispatch(SetTitle(title))
        }
    }
}

export default connect(null,mapDispatch)(Login)