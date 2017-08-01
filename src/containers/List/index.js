import React,{Component} from 'react'
import {SetTitle,getList} from '../../actions/'
import Header from '../../components/Header'
import ListItem from '../../components/ListItem'
import {connect} from 'react-redux'
import Login from '../Login'
class List extends Component {
    constructor(props,context){
        super(props,context)


        switch(this.props.match.params.id){
            case "small":
                this.props.getList("small")
                return this.props.setTitle("小额贷款")
            case "middle":
                this.props.getList("middle")
                return this.props.setTitle("中额贷款")
            case "large":
                this.props.getList("large")
                return this.props.setTitle("大额贷款")
            default:
                return this.props.setTitle("无此服务")
        }


    }

    componentWillMount(){

        // console.log("-----------------------------------")
        // console.log(this.props.list)
        // console.log("-----------------------------------")

    }

    render(){
        if(!sessionStorage.jwtToken){
            this.props.setTitle("注册用户")
            return (
                <div>
                    <Login/>
                </div>

            )
        }
        const colorSelecter = ["#02b3e4","#02b3e4","#02b3e4","#02b3e4"];


        if(this.props.list !== undefined){
            return(<div>
                <Header/>
                {
                    this.props.list.map((item,index)=> {

                        return <ListItem key={index} color={colorSelecter[Math.floor(Math.random()*4)]} iconurl="https://avatars0.githubusercontent.com/u/12596108?v=4&u=417be38d1269217876d37182d3f7b5d7495ee109&s=400"  title={item.name} time={item.time} money={item.money} tag={item.tag}/>

                    })
                }
            </div>)
        }
        return (<div><Header/></div>)

    }

    componentDidMount(){

    }
}


function mapState(state){
    return {
        list:state.list.list
    }
}

function mapDispath(dispatch){

    return {
        setTitle: (title)=> {
            dispatch(SetTitle(title))
        },
        getList:(type) => {
            dispatch(getList(type))
        }
     }
}

export default connect(mapState,mapDispath)(List)