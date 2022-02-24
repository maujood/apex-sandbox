import React from 'react'

const LoginButton = () => {
    function login () {
        fetch('/api/loginurl/' + encodeURIComponent(window.location.pathname))
        .then(res => {
            return res.json();
        })
        .then(
            result => {
                window.location.href = result.url;
            }
        );
    }

    return <button className="slds-button slds-button_brand" onClick={login}>
        <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
        <use href="/assets/icons/utility-sprite/svg/symbols.svg#salesforce1"></use>
        </svg>
        Log in with Salesforce
    </button>
}

export default LoginButton;