import React from "react";
import map from 'lodash/map';
import timezones from '../../data/timezones';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email:'',
      password:'',
      passwordConfirmation:'',
      timezone:'',
      errors: {},
      isLoading : false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid(){
    const { errors, isValid } = validateInput(this.state);
    if(!isValid){
      this.setState({errors});
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        errors:{},
        isLoading: true
      });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.context.router.history.push('/');
        },
        ( { data } ) => {
          console.log(data);
          this.setState( {
            errors:data,
            isLoading:false } );
          }
        );
    }
  }

  render(){
    const { errors } = this.state;
    const options = map(timezones,(val,key) =>
      <option value={val} key={val}>{key}</option>
    )

    return (
    <form onSubmit={this.onSubmit}>
      <h1>Join our community!!!</h1>

      <TextFieldGroup
      field = "username"
      value = {this.state.username}
      error = { errors.username}
      onChange= {this.onChange}
      label = "Username"
      />

      <TextFieldGroup
      field = "email"
      value = {this.state.email}
      error = { errors.email}
      onChange= {this.onChange}
      label = "Email"
      />

      <TextFieldGroup
      field = "password"
      value = {this.state.password}
      error = { errors.password}
      onChange= {this.onChange}
      label = "Password"
      type= "password"
      />

      <TextFieldGroup
      field = "passwordConfirmation"
      value = {this.state.passwordConfirmation}
      error = { errors.passwordConfirmation}
      onChange= {this.onChange}
      label = "Password Confirmation"
      type= "password"
      />

      <div className={ classnames("form-group", { 'has-error': errors.timezone})}>
        <label className="control-label">Timezone</label>
        <select
          value = {this.state.timezone}
          name = "timezone"
          onChange = {this.onChange}
          className = "form-control"
        >
          <option value="" disabled>Choose your Timezone</option>
          {options}
        </select>
        {errors.timezone && <span className="help-block">{errors.timezone}</span>}
      </div>

      <div className="form-group">
        <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
        Sign Up
        </button>
      </div>
    </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest : React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;
