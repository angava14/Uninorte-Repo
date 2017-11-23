import React, { Component } from 'react';
import Common from "../shared/common";


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {email:'',password:''};
        this.login = this.login.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    login(e) {
        e.preventDefault();
        Common.login(this.state.email, this.state.password, response => {
            
            this.props.history.push('/');
        }, erro => {
            console.error(erro)
        })
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10">
                        <div className="card">
                            <div className="text-center card-title pt-3">
                                <h1>Login</h1>
                            </div>
                            <div className="card-body">
                                <form className="d-flex flex-column">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input name="email" onChange={this.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input name="password" onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" />
                                    </div>
                                    <div className="text-center">

                                        <button onClick={this.login} type="submit" className="btn btn-primary mr-3">Login</button>
                                        <button onClick={()=>{this.props.history.push('/signup')}} type="button" className="btn btn-primary text-center">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        );
    }
}

export default Login;