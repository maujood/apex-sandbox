import React from 'react';
import LoginButton from './LoginButton';

const HomePage = (props) => {   
    return <article class="slds-card slds-m-around_x-large">
        <div class="slds-card">
            <div class="slds-card__header slds-grid">
                <header class="slds-media slds-media_center slds-has-flexi-truncate">
                    <div class="slds-media__figure">
                        <span class="slds-icon_container slds-icon-standard-account">
                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                <use href="/assets/icons/standard-sprite/svg/symbols.svg#apex"></use>
                            </svg>
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
                <p class="slds-text-heading_medium slds-p-top_medium">Practice makes experts. Take your Apex journey to the next level with a growing collection of Apex practice problems!</p>
                <p class="slds-text-heading_medium slds-p-top_medium">It's easy and free. Log in with a Salesforce Developer Edition (sign up on <a href="https://developer.salesforce.com/signup" target="_blank" rel="noreferrer">developer.salesforce.com/signup</a>) and start knocking out problems!</p>
                <div class="slds-p-vertical_x-large slds-align_absolute-center">
                    <LoginButton bigbutton />
                </div>
                <p class="slds-text-heading_medium slds-p-top_medium">Haven't started your Apex journey yet? Learners consistently tell me they found <a href="https://www.pluralsight.com/courses/apex-absolute-beginner-guide-coding-salesforce">Apex Academy on Pluralsight</a> and <a href="https://www.sfdc99.com/beginner-tutorials/">David Liu's Apex Tutorials</a> to be the best resources out there. I will also be putting together an Apex series together in the future - follow me on <a href="https://twitter.com/mehdimaujood">Twitter</a> or <a href="https://www.linkedin.com/in/maujood/">LinkedIn</a> to hear about it!</p>
                <p class="slds-text-heading_medium slds-p-top_medium">Have feedback? Wish to contribute? Just want to network? The team will be excited to hear from you: <a href="https://www.linkedin.com/in/maujood/">Mehdi Maujood</a> or <a href="https://www.linkedin.com/in/madiharaza88/">Madiha Raza</a>.</p>
            
            </div>
        </div>
    </article>;
}

export default HomePage;