import React from 'react';

let uniqueNum = 1;

const LoginButton = (props) => {
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
    
    let additionalClasses = '';
    if (props.bigbutton) {
        additionalClasses = ' slds-p-around_small slds-text-heading_medium';
    }

    return <button className={'slds-button slds-button_brand' + additionalClasses} onClick={login}>
            <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
            <use href="/assets/icons/utility-sprite/svg/symbols.svg#salesforce1"></use>
            </svg>
            Log in with Salesforce
        </button>
}

export default LoginButton;