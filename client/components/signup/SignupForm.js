import React from "react";
import map from 'lodash/map';
import timezones from '../../data/timezones';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';

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
        () => {},
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
      <div className={ classnames("form-group", { 'has-error': errors.username})}>
        <label className="control-label">Username</label>
        <input
          value = {this.state.username}
          onChange = {this.onChange}
          type="text"
          name="username"
          className="form-control"
        />
        {errors.username && <span className="help-block">{errors.username}</span>}
      </div>

      <div className={ classnames("form-group", { 'has-error': errors.email})}>
        <label className="control-label">Email</label>
        <input
          value = {this.state.email}
          onChange = {this.onChange}
          type="text"
          name="email"
          className="form-control"
        />
        {errors.email && <span className="help-block">{errors.email}</span>}
      </div>

      <div className={ classnames("form-group", { 'has-error': errors.password})}>
        <label className="control-label">Password</label>
        <input
          value = {this.state.password}
          onChange = {this.onChange}
          type="password"
          name="password"
          className="form-control"
        />
        {errors.password && <span className="help-block">{errors.password}</span>}
      </div>

      <div className={ classnames("form-group", { 'has-error': errors.passwordConfirmation})}>
        <label className="control-label">Password Confirmation</label>
        <input
          value = {this.state.passwordConfirmation}
          onChange = {this.onChange}
          type="password"
          name="passwordConfirmation"
          className="form-control"
        />
        {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
      </div>

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

export default SignupForm;
