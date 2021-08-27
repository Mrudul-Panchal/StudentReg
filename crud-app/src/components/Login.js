import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import axios from "axios";


const Login = () => {

    const googleAuth = async ({profileObj}) => {
        axios({
            method: "post",
            url: "/auth/google/signin",
            data: {
                googleId: profileObj.googleId,
                email: profileObj.email,
                first_Name: profileObj.givenName,
                last_name: profileObj.family_name,
            },
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };

    const history = useHistory();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const loginUser = async (e) => {
    e.preventDefault();

    const res= await fetch('/signin', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            email,
            password
        })
    });

    const data = res.json();

    if (res.status === 400 || !data){
        window.alert("Invalid Credentials");
    }else{
        window.alert("Login successfull");
        history.push("/");
    }

}


    return (
        <section className='Signup'>
            <div className="container mt-5">
            <div className="signup-content">
            <div className="signup-form">
            <h2 className='form-title'>Sign-up</h2>
            <form method="POST" className="register-form" id="register-form">



                            <div className="form-group">
                                <label htmlFor="email">
                                        <i class="zmdi zmdi-email"></i>
                                </label>
                                <input type="email" email="" id="email" autocomplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                   placeholder="Your E-mail"
                                />
                            </div>



                            <div className="form-group">
                                <label htmlFor="password">
                                        <i class="zmdi zmdi-lock"></i>
                                </label>
                                <input type="password" name="password" id="password" autocomplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                   placeholder="Your password"
                                />
                            </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="submit" id="submit" className="form-submit"
                                    value='Login'
                                    onClick={loginUser} />
                            </div>

                            <div className="Login-image">
                            <figure>
                                   
                                    <NavLink to="/Signup" className="Login-image-link"> 
                                    <img src="./images/index.jpeg" alt="registeration pic" />
                                    </NavLink>
                            </figure>
                               
            </div>

            </form>
            <GoogleLogin
            clientId="109864172924-olf4l8gk32v89jhv6jpbccu94khfdg43.apps.googleusercontent.com"
            onSuccess={googleAuth}
            onFailure={googleAuth}
            cookiePolicy={"single_host_origin"} 
        />
            </div>
              
            </div>
            </div>
            </section>
        )
}


    

export default Login;


