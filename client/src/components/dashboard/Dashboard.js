import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile,deleteAccount} from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import {Link}  from  'react-router-dom'
import ProfileActions from './ProfileAction'

class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onDeleteClick(e){
        this.props.deleteAccount();
    }
    render() {
        const {user} =this.props.auth;
        const {profile,loading} =this.props.profile

        let dashboardContent;

        if(profile===null||loading){
            dashboardContent =<Spinner/>
        }else{

            //check if logged in user has profile data
            if(Object.keys(profile).length>0){
                dashboardContent=(<div>
                    <p className = "lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                    <ProfileActions/>
                    {/*TOdo Experience*/}
                    <div className="mb-2">
                        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
                    </div>
                </div>)
            }
            else{
                //user logged in and does not have profile
                dashboardContent=(
                    <div>
                        <p className = "lead text-muted">Welcome {user.name}</p>
                        <p>You have not yet set a profile</p>
                        <Link to="/Create-profile" className='btn btn-lg btn-info'>Create Profile</Link>
                    </div>
                )
            }
        }
        return (
            <div className='dashboard'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'> 
                            <h1 className='display-4'>Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes={
    getCurrentProfile:PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapsStatetoProps = state =>({
    profile:state.profile,
    auth :state.auth
})

export default connect(mapsStatetoProps,{getCurrentProfile,deleteAccount}) (Dashboard)