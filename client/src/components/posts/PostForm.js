import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaGroup from "../common/TextAreaGroup";
import { addPost } from "../../actions/postAction";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
    };

    this.onChange=this.onChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
  }
  render() {
    return (
      <div>
        <div className="post-form mb-3">
          <div className="card card-info">
            <div className="card-header bg-info text-white">Say Somthing...</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <TextAreaGroup 
                    className="form-control form-control-lg"
                    placeholder="Create a post"
                    name='text'
                    value={this.state.text}
                    onChange={this.onChange}
                    errors={this.state.errors}
                  ></TextAreaGroup >
                </div>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;
