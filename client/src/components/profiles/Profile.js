import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import {getProfiles} from '../../actions/profileActions'

class Profiles extends Component {
    componentDidMount(){
        this.props.getProfiles();
        
    }
    render() {
        const{profiles,loading}=this.props.profile;
        let profileItems;
        if(profiles===null||loading){
            profileItems=<Spinner/>;
            console.log(this.props.profile);
        }
        else{
            if(profiles.length > 0){
                profileItems=<h1>User Profiles</h1>;
                console.log(profiles);
            }
            else{
                profileItems=<h4>No Profiles Found...</h4>;
            }
            
        }
        return (
            <div className='profiles'>
                <div className="row">
                    <div className='col-md-12'>
                        <h1 className='display-4 text-center'> Profile</h1>
                        <p className = 'lead text-center'>Browse and connect with other users</p>
                        {profileItems}
                    </div>
                </div>
                
            </div>
        )
    }
}

Profiles.propTypes={
    getProfiles: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)
