import React from 'react';
import LoginButton from './LoginButton';
import HomeFAQItem from './HomeFAQItem';

const HomePage = (props) => {   
    return <article class="slds-card slds-m-around_x-large">
        <div class="slds-card">
            <div class="slds-card__header slds-grid">
                <header class="slds-media slds-media_center slds-has-flexi-truncate">
                    <div class="slds-media__figure">
                        <span class="slds-icon_container slds-icon-standard-account" title="apex">
                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                <use href="/assets/icons/standard-sprite/svg/symbols.svg#apex"></use>
                            </svg>
                            <span class="slds-assistive-text">{}</span>
                        </span>
                    </div>
                    <div class="slds-media__body">
                        <h2 class="slds-card__header-title">
                            <span>Apex Practice Problems</span>
                        </h2>
                    </div>
                </header>
            </div>
            <div class="slds-card__body slds-card__body_inner">
                <div className="slds-grid slds-wrap"></div>
                <p class="slds-text-heading_medium slds-p-top_medium">Practice makes experts.</p>
                <p class="slds-text-heading_medium slds-p-top_medium">It's easy. Log in with a Salesforce Developer Edition (sign up on <a href="https://developer.salesforce.com/signup" target="_blank" rel="noreferrer">developer.salesforce.com/signup</a>) and start knocking out problems!</p>
                <div class="slds-p-vertical_x-large slds-align_absolute-center">
                    <LoginButton bigbutton />
                </div>

                <p class="slds-text-heading_medium slds-p-top_medium">Never written code before? Check back soon for lessons to get you started!</p>
            </div>
        </div>
    </article>;
}

export default HomePage;