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
                                <img src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=8b9bd5f1902bd40756cadbaf1ae0f534/4b90f603738da977bbadcdf2b751f8198718e36d.jpg" alt="" width="80" height="80"/>
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