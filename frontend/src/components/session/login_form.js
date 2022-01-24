import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/css/sessionform.scss';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.renderLineErrors = this.renderLineErrors.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/profile');
        }
        this.setState({ errors: nextProps.errors })
    }

    componentWillUnmount(){
        // this.props.clearErrors();
        this.props.inactiveModal()
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(user)
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }
    renderLineErrors(field) {
        debugger
        return (
            <div>{this.state.errors[field]}</div>
        );
    }

    render() {
        return (
            <div className='session-form-container'>
                <form className='session-form' onSubmit={this.handleSubmit}>
                    <div>
                        <h2>Welcome Back</h2>
                        
                        {this.renderLineErrors('email')}
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />

                        {this.renderLineErrors('password')}
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br />
                        <input type="submit" value="Login" />
                        {/* {this.renderErrors()} */}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);