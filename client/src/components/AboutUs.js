import React from 'react';

const AboutUs = (props) => {   
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
                            <span>About this Project</span>
                        </h2>
                    </div>
                </header>
            </div>
            <div class="slds-card__body slds-card__body_inner">
                <div className="slds-grid slds-wrap"></div>
                <p class="slds-text-heading_medium slds-p-top_medium">Aboutus goes here</p>
            </div>
        </div>
    </article>;
}

export default AboutUs;