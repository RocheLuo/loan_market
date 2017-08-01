import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import './BeforeInfo.css'

class BeforeInfo extends Component {
    render(){
        return (
            <div>
                <div className="container" id="container">
                    <div className="hongbao">
                        <div className="topcontent">
                            <div className="avatar">
                                <img src="https://avatars0.githubusercontent.com/u/12596108?v=4&u=417be38d1269217876d37182d3f7b5d7495ee109&s=400" alt="" width="80" height="80"/>
                            </div>
                            <h2>美利金融</h2>
                            <div className="description">恭喜发财 大吉大利</div>
                        </div>
                        <div className="chai" id="chai">
                            <Link to="/info">拆红包</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default BeforeInfo;