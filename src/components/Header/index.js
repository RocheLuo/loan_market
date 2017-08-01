import React,{Component} from 'react'
import {connect} from 'react-redux'
import './Header.css'
class Header extends Component {
    render(){
        return(
            <div className="header">
                {this.props.title}
                </div>
        )
    }
}

function mapState (state) {
    return {
        title:state.header.title
    }
}

export default connect(mapState)(Header)