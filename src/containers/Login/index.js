import React,{Component} from 'react'
import {connect} from 'react-redux'
import {login} from "../../actions/auth"
import {getVCode} from '../../actions/'
import Header from '../../components/Header'
import {SetTitle} from '../../actions/'
import md5 from 'md5'
import "./login.css"

class Login extends Component {
    constructor(props,context){

        super(props,context)
        this.props.setTitle("登录／注册账号")

        this.login = this.login.bind(this);
        this.setLoginState = this.setLoginState.bind(this);
        this.changeFunction = this.changeFunction.bind(this);
        this.checkPhoneNumber = this.checkPhoneNumber.bind(this);
        this.changeFocusStyle = this.changeFocusStyle.bind(this);
        this.changeBlurStyle = this.changeBlurStyle.bind(this);
        this.getVCode = this.getVCode.bind(this);
        this.changeUserType = this.changeUserType.bind(this);
        this.changeImgVCode = this.changeImgVCode.bind(this);
        this.state = {
            userName:null,
            phoneNumber:null,
            VCode:null,
            imgVCode:null,
            hasLogin:false,
            getVCode:true,
            beforeLogin:false,
            VCodeInnerHTML:'获取验证',
            time:60,
            screen:"",
            userType:1,
            userTypeStyle:{},
            style:{},
            VCodeStyle:{
                background:'#02b3e4'
            }
        }
    }
    getVCode(e){
            if(this.state.getVCode && this.checkPhoneNumber(this.state.phoneNumber) && this.state.imgVCode !== null){
                this.setState({screen:''})
                this.props.getVCode([this.state.phoneNumber,this.state.imgVCode]);
                this.setState({getVCode:false})
                this.setState({VCodeInnerHTML:`${this.state.time}秒后重试`});
                this.setState({VCodeStyle:{background:'#999',fontSize:'.5rem'}})
                
                let timechange = setInterval(() =>{
                    this.setState({time:this.state.time - 1})
                    this.setState({VCodeInnerHTML:`${this.state.time}秒后重试`});
                    if(this.state.time <= 0){
                        clearInterval(timechange)
                        this.setState({VCodeInnerHTML:'获取验证'});
                        this.setState({VCodeStyle:{background:'#02b3e4'}})
                        this.setState({time:60})
                        this.setState({getVCode:true})
                    }
                },1000);
        }
    }
    changeUserType(e){
        if(this.state.userType == 1){
            this.setState({userType:0})
            e.target.innerHTML = '新用户入口'
            this.setState({userTypeStyle:{opacity:0,transition:'.3s',visibility:'hidden'}})
        }else if(this.state.userType == 0){
            this.setState({userType:1})
            e.target.innerHTML = '老用户入口'
            this.setState({userTypeStyle:{opacity:100,transition:'.3s',visibility:'visible'}})
        }
        
    }
    login(e){
        e.preventDefault();
        if(this.state.userType == 1){
            if(!this.state.userName){
                this.setState({screen:'请填写姓名'})
            }else{
                if(!this.checkPhoneNumber(this.state.phoneNumber)){
                    this.setState({screen:'电话号码格式错误'})
                }else{
                    if(this.state.imgVCode === null){
                        this.setState({screen:'请填写图形验证码'})                                            
                    }else{
                        if(this.state.VCode == null){
                            this.setState({screen:'请填写短信验证码'})
                            
                        }else{
                            this.setState({screen:''});
                            if(this.props.VCode){
                                if(
                                    this.state.VCode === this.props.VCode.data &&
                                    this.state.userName &&
                                    this.checkPhoneNumber(this.state.phoneNumber)
                                ){
                                    this.props.sendLoginInfo(this.state)
                                    this.setState({hasLogin:true})
                                }else{
                                    this.setState({screen:'验证码匹配错误'})
                                }
                            }else{
                                this.setState({screen:'请获取验证码之后在提交'})
                            }
                        }
                    }
                }
            }
        }else if(this.state.userType == 0){
            if(!this.checkPhoneNumber(this.state.phoneNumber)){
                this.setState({screen:'电话号码格式错误'})
            }else{
                if(this.state.imgVCode === null){
                    this.setState({screen:'请填写图形验证码'})                                            
                }else{
                    this.props.sendLoginInfo(this.state)                    
                }
            }
        }

    }
    disLogin(e){
        e.preventDefault();
    }
    changeFunction(e){
        e.target.innerHTML = "立即贷款"
    }
    checkPhoneNumber(number){

        const reg =  /^\d{11}$/;

        return reg.test(number);
    }
    changeImgVCode(e){
        this.setState({imgVCode:e.target.value})
        console.log(this.state.imgVCode)
    }

    setLoginState(e){

        switch (e.target.name){
            case "userName":
                return this.setState({userName:e.target.value})
            case "phoneNumber":
                if(!this.checkPhoneNumber(e.target.value)){
                    this.setState({style:{border:'1px solid #ff9999'}})
                }else{
                    this.setState({style:{border:'1px solid #dbe2e8'}})
                }
                return this.setState({phoneNumber:e.target.value})
            case "VCode":
                return this.setState({VCode:md5(e.target.value)})
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
                    <form onSubmit={this.login} >
                        <input
                            type="text"
                            onFocus={this.changeFocusStyle}
                            onBlur={this.changeBlurStyle}
                            onChange={this.setLoginState}
                            name="userName"
                            placeholder="真实姓名"
                            style = {this.state.userTypeStyle}
                            
                        />
                        <input
                            type="text"
                            onFocus={this.changeFocusStyle}
                            style={this.state.style}
                            onBlur={this.changeBlurStyle}
                            onChange={this.setLoginState}
                            placeholder="手机号码"
                            name="phoneNumber"
                        />
                        <div className="VCode-container">
                          <input onChange={this.changeImgVCode} type="text" placeholder="图形验证码"/>
                          <img  src="/api/imgvcode" alt=""/>                        
                        </div>
                        <div style = {this.state.userTypeStyle}
                        className="VCode-container">
                            <input
                                type="text"
                                onFocus={this.changeFocusStyle}
                                onBlur={this.changeBlurStyle}
                                onChange={this.setLoginState}
                                placeholder="短信验证码"
                                name="VCode"
                            />
                            <button
                                className="VCode-Button"
                                onClick={this.getVCode}
                                style = {this.state.VCodeStyle}
                            >
                                {
                                    this.state.VCodeInnerHTML
                                }
                            </button >
                        </div>

                        <span
                            style={{color:'#ff9999'}}
                        >
                            {
                                this.state.screen
                            }
                        </span>
                        <button  type="submit">立即注册</button>
                        <span onClick={this.changeUserType} style={{textAlign:'center',textDecoration:'underline'}}>老用户入口</span>                        
                    </form>
                </div>
            </div>

        )
    }
}

function mapState(state){
    return {
         VCode:state.login.VCode
    }
}

function mapDispatch (dispatch) {
    return {
        sendLoginInfo(loginInfo){
            dispatch(login(loginInfo))
        },
        setTitle: (title)=> {
            dispatch(SetTitle(title))
        },
        getVCode:(phoneNumber) => {
            dispatch(getVCode(phoneNumber))
        }
    }
}

export default connect(mapState,mapDispatch)(Login)