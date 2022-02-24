import React, { useContext } from 'react';
import UserContext from './UserContext';
import LoginButton from './LoginButton';
import ExecutionResults from './ExecutionResults';

const Executor = (props) => {   
    const user = useContext(UserContext);
    const executeApex = () => {
        props.onExecute();
    }

    if (user.loggedIn) {
        return <article class="slds-card slds-card_boundary">
            <div class="slds-card__header slds-grid">
                <header class="slds-media slds-media_center slds-has-flexi-truncate">
                <div class="slds-media__figure">
                    <span class="slds-icon_container slds-icon-standard-task" title="execution">
                    <svg class="slds-icon slds-icon_small" aria-hidden="true">
                        <use href="/assets/icons/standard-sprite/svg/symbols.svg#task"></use>
                    </svg>
                    <span class="slds-assistive-text">Execution Results</span>
                    </span>
                </div>
                <div class="slds-media__body">
                    <h2 class="slds-card__header-title">
                        <span>Execution Results</span>
                    </h2>
                </div>
                <div class="slds-no-flex">
                    <button class="slds-button slds-button_brand" onClick={executeApex}>
                        <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                            <use href="/assets/icons/utility-sprite/svg/symbols.svg#play"></use>
                        </svg>
                        Run
                    </button>
                </div>
                </header>
            </div>
            <div class="slds-card__body slds-card__body_inner">
                <ExecutionResults loading={props.loading} executeResults={props.executeResults} />
            </div>
        </article>
    }
    return <div class="slds-notify slds-notify_alert slds-alert_offline" role="alert">
        <span class="slds-assistive-text">offline</span>
        <span class="slds-icon_container slds-icon-utility-offline slds-m-right_x-small" title="Description of icon when needed">
            <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
            <use href="/assets/icons/utility-sprite/svg/symbols.svg#offline"></use>
            </svg>
        </span>
        <h2 class="slds-m-right_small">Log in with a Developer Edition org to run this code: </h2>
        <LoginButton />
    </div>
}

export default Executor;