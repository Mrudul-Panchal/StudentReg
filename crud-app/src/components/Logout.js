import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

const clientId = '109864172924-olf4l8gk32v89jhv6jpbccu94khfdg43.apps.googleusercontent.com'

function Logout() {
    const onSuccess = () => {
        alert('logged out');
    };

    return(
        <div>
            <GoogleLogout 
            clientId='109864172924-olf4l8gk32v89jhv6jpbccu94khfdg43.apps.googleusercontent.com'
            buttonText='Logout'
            onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
}

const Logout = () => {

    const history = useHistory();

    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            history.push('/login', { replace: true });
            if (res.status =! 200 ) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        });
    });

    return (
        <div>
            <h1>Logout Page</h1>
        </div>
    )
}

export default Logout