import React,{Component} from 'react'
import {SetTitle,getList} from '../../actions/'
import Header from '../../components/Header'
import ListItem from '../../components/ListItem'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
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
            return <Redirect to='/login'/>

        }


        if(this.props.list !== undefined){
            return(<div>
                <Header/>
                {
                    this.props.list.filter(item =>{
                       return item.toggle === 1
                    }).length === 0
                        ?
                        <p style={{textAlign:"center",marginTop:'1.2rem',color:"#999"}}>此分类还没有项目</p>
                        :
                        this.props.list.filter(item =>{
                            return item.toggle === 1
                        })
                    .map((item,index)=> {

                        return <ListItem
                            key={index}
                            iconurl={"../uploads/"+item.icon}
                            title={item.name}
                            time={item.time}
                            money={item.money}
                            tag={item.tag}
                            href={item.href}
                            id={item.id}
                        />

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