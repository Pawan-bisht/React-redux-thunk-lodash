import React, { Component } from 'react';
import { fetchUser } from '../actions';
import  { connect } from 'react-redux';
class UserHeader extends Component {
    // componentDidMount()
    // {
    //     this.props.fetchUser(this.props.userId);
    // }
    render()
    {
       const { user } = this.props; 
        // const user = this.props.users.find(user =>{
        //         return user.id === this.props.userId;
        // })

        if(!user)
            return null;
        else
            return ( <div className = "header"> { user.name } </div> );    
    }
}

const mapStateToProps = (state, ownProps) => {
    return { user : state.users.find(user => user.id === ownProps.userId) };
}

export default connect(mapStateToProps)(UserHeader);