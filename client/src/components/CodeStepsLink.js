import React from 'react';

const CodeStepsLink = (props) => {   
    return <div class="slds-scoped-notification slds-media slds-media_center slds-scoped-notification_light" role="status">
        <a href="https://www.codesteps.dev" target="_blank">
            <div>
                <svg width="200" viewBox="0 0 450 48" aria-hidden="true">
                    <use href="/assets/images/CodeStepsDevWeb.svg"></use>
                </svg>
                <span class="slds-assistive-text">CodeSteps.dev</span>
            </div>
        </a>
        <div class="slds-media__body slds-border_left slds-p-left_large">
            <p class="slds-text-heading_medium">Zero Coding Experience?</p>
            <p class="slds-text-heading_small"><a href="https://www.codesteps.dev" target="_blank">Check out CodeSteps.dev, free interactive programming lessons for complete beginners</a> that I've been putting together. CodeSteps.dev focuses on JavaScript, the language used by Lightning Web Components.</p>
        </div>
    </div>
}

export default CodeStepsLink;