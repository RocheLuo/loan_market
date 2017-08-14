import React,{Component} from 'react'
import {connect} from 'react-redux'
import {countInfo} from "../../actions/index"
import './ListItem.css'

class ListItem extends Component {

    constructor (){
        super(...arguments)
        this.countInfo = this.countInfo.bind(this);
    }
    countInfo(e){
        e.preventDefault();
        this.props.countInfo(this.props.id,this.props.phoneNumber)
        window.location.href = this.props.href
    }

    render(){
        const {iconurl,title,time,money,tag,color,href} = this.props

        const style = {
            "backgroundColor":color
        };
        return(
            <div>
                <a href = {href} className="list-container">
                    <div className="list-container-top" style={style}>
                        <div className="icon"><img alt={title} src={iconurl}/></div>
                        <div className="right-container">
                            <div className="title-container">
                                <div>{title}</div>
                                <div>{time}</div>
                            </div>
                            <div className="buttom-container">
                                <div className="tag-container">
                                    <div className="tag-item-container">
                                        {tag.map((item,index) => {
                                            return <div key={index}>{item}</div>
                                        })}
                                    </div>
                                </div>
                                <div className="money">{money}</div>

                            </div>
                        </div>
                    </div>
                </a>

                {/*<div className="list-container-bottom">*/}
                    {/*<a href={href} onClick={this.countInfo}>点击详情</a>*/}
                {/*</div>*/}
            </div>

        )
    }
}

function mapState(state){
    return {
        phoneNumber:state.auth.user.user.phone
    }
}


function mapDispatch (dispatch) {
    return {

        countInfo(id,phoneNumber){
            dispatch(countInfo(id,phoneNumber))
        }
    }
}

export default connect(mapState,mapDispatch)(ListItem)