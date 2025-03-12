import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect } from 'react';
import { NextButton } from '../components/NextButton';
const facebookId = import.meta.env.VITE_FACEBOOK_ID
const FacebookLogin = ({ onSuccess }) => {
    // Initialize the Facebook SDK
    const initializeFacebookSDK = () => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookId,
                cookie: true,
                xfbml: true,
                version: 'v21.0',
            });
        };

        if (!document.getElementById('facebook-jssdk')) {
            const script = document.createElement('script');
            script.id = 'facebook-jssdk';
            script.src = 'https://connect.facebook.net/en_US/sdk.js';
            document.body.appendChild(script);
        }
    };

    useEffect(() => {
        initializeFacebookSDK();
    }, []);

    // Handle Facebook login
    const handleFacebookLogin = () => {
        window.FB.login(
            (response) => {
                if (response.authResponse) {
                    // console.log('Facebook login success:', response);
                    fetchUserProfile(response.authResponse.accessToken);
                } else {
                    console.error('User cancelled login or did not fully authorize.');
                }
            },
            { scope: 'email,public_profile' } // Specify the required permissions
        );
    };

    // Fetch user profile data
    const fetchUserProfile = (accessToken) => {
        window.FB.api('/me', { fields: 'name,email,picture' }, (profile) => {
            // console.log('User profile:', profile);
            // console.log("accessToken", accessToken)
            onSuccess(accessToken, profile); // Send data to parent component via props
        });
    };

    return (

        <>
            <NextButton
                color='light'
                onClick={handleFacebookLogin}
                startContent={<Icon className="text-default-500" icon="jam:facebook" style={{ color: '#316FF6' }} width={22} />}
                variant="bordered"
            >
                Sign in with Facebook
            </NextButton>
        </>
    );
};

export default FacebookLogin;
