import React,{Component} from 'react'
import './ListItem.css'

class ListItem extends Component {
    render(){
        const {iconurl,title,time,money,tag,color,href} = this.props

        const style = {
            "backgroundColor":color
        };
        return(
            <div className="list-container">
                <div className="list-container-top" style={style}>
                    <div className="icon"><img alt={title} src={iconurl}/></div>
                    <div className="title-container">
                        <div>{title}</div>
                        <div className="money">{money}</div>
                    </div>
                </div>
                <div className="list-container-bottom">
                    <div className="tag-container">
                        <div className="tag-item-container">
                            {tag.map((item,index) => {
                                return <div key={index}>{item}</div>
                            })}
                        </div>

                        <div className="tag-length"><div>{tag.length}</div></div>
                    </div>
                    <div className="time-container">
                        <div>{time}</div>
                        <a href={href}>点击详情</a>
                    </div>
                </div>

            </div>
        )
    }
}


export default ListItem