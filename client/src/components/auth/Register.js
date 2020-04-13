import React, { Component } from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {registeruser} from '../../actions/authActions'
import {withRouter} from 'react-router-dom'
import TextFieldgroup from '../common/TextFieldGroup'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){

      this.setState({errors:nextProps.errors})

    }
  }

  onChange(e){
      this.setState({
       [e.target.name]:e.target.value
      })
  }

  onSubmit(e){
    e.preventDefault();
    const newUser = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      password2:this.state.password2
    }

    this.props.registeruser(newUser,this.props.history)
  }

  render() {
    const { errors } = this.state
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your SocialApp account</p>
                <form onSubmit={this.onSubmit}>
                <TextFieldgroup
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
                    errors={errors.name}
                  />
                  <TextFieldgroup
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    errors={errors.email}
                    
                  />
                  <small className="form-text text-muted">
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email
                    </small>
                    <TextFieldgroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    errors={errors.password}
                    
                  />
                  <TextFieldgroup
                    placeholder="Confirm Password"
                    name="password2"
                    type="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    errors={errors.password2}
                    
                  />                  
                                   
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes={
  registeruser: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
  auth:state.auth,
  errors: state.errors
})
export default connect(mapStateToProps,{registeruser})(withRouter(Register));
