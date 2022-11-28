import React, { useContext } from 'react';
import UserContext from './UserContext';
import LoginButton from './LoginButton';
import HomeEasyProblems from './HomeEasyProblems';
import HomeRecentProblems from './HomeRecentProblems';
import HomeLatestProblems from './HomeLatestProblems';

const HomePage = (props) => {
    const user = useContext(UserContext);

    let homeProblemList = () => {
        return <>
            <p class="slds-text-heading_medium slds-p-top_medium">Practice makes experts. Take your Apex journey to the next level with a growing collection of Apex practice problems!</p>
            <p class="slds-text-heading_medium slds-p-top_medium">It's easy and free. Log in with a Salesforce Developer Edition (sign up on <a href="https://developer.salesforce.com/signup" target="_blank" rel="noreferrer">developer.salesforce.com/signup</a>) and start knocking out problems!</p>
            <div class="slds-p-vertical_x-large slds-align_absolute-center">
                <LoginButton bigbutton />
            </div>
        </>;
    }
    if (user.loggedIn) {
        homeProblemList = () => {
            return <div class="slds-grid slds-gutters slds-wrap">
                <div class="slds-col slds-small-size_1-of-1 slds-medium-size_1-of-2 slds-large-size_1-of-2">
                    <div class="slds-p-around_medium">
                        <div class="slds-text-title_caps">Get Started with Beginner Problems</div>
                            <HomeEasyProblems />
                    </div>
                </div>
                <div class="slds-col slds-small-size_1-of-1 slds-medium-size_1-of-2 slds-large-size_1-of-2">
                    <div class="slds-p-around_medium">
                        <div class="slds-text-title_caps">Try Out the Latest Problems</div>
                            <HomeLatestProblems />
                    </div>
                </div>
            </div>;
        }
    }

    return <article class="slds-m-around_x-large">
        <div class="slds-card left-border">
            <div class="slds-card__header slds-grid">
                <header class="slds-media slds-media_center slds-has-flexi-truncate">
                    <div class="slds-media__body">
                        <span class="slds-icon_container slds-icon_container_circle slds-icon-standard-account">
                            <svg class="slds-icon" aria-hidden="true">
                                <use href="/assets/icons/action-sprite/svg/symbols.svg#apex"></use>
                            </svg>
                        </span>
                        <h2 class="slds-text-heading_large heading">Apex Practice Problems</h2>
                    </div>
                </header>
            </div>
            <div class="slds-card__body slds-card__body_inner">
                {homeProblemList()}
                <p class="slds-text-heading_small slds-p-top_medium"><strong>Join the conversation</strong> on the <a href="https://trailhead.salesforce.com/trailblazer-community/groups/0F94S000000kJb2SAE" target="_blank" rel="noreferrer">ApexSandbox.io Trailblazer Community Group</a>. Get help, ask questions, and discuss solutions to problems.</p>
                <p class="slds-text-heading_small slds-p-top_medium"><strong>Showcase your solutions on GitHub!</strong> Check out the <a href="https://chrome.google.com/webstore/detail/apexsync/fnhpgladlghhekaggcolmidhinhckheh" target="_blank">ApexSync Chrome Extension</a> by <a href="https://www.linkedin.com/in/ankush-sarsewar/" target="_blank">Ankush Sarsewar</a> that lets you sync your ApexSandbox.io solutions to a GitHub repo in just one click!</p>
                <p class="slds-text-heading_small slds-p-top_medium"><strong>Have feedback? Wish to contribute? Just want to network?</strong> Reach out to the founders <a href="https://www.linkedin.com/in/maujood/">Mehdi Maujood</a> and <a href="https://www.linkedin.com/in/madiharaza88/">Madiha Raza</a>, or <a href="/the-team">the awesome people who contributed to the project</a>.</p>
                <p class="slds-text-heading_small slds-p-top_medium"><strong>Haven't started your Apex journey yet?</strong> Learners consistently tell me they found <a href="https://www.pluralsight.com/courses/apex-absolute-beginner-guide-coding-salesforce">Apex Academy on Pluralsight</a> and <a href="https://www.sfdc99.com/beginner-tutorials/">David Liu's Apex Tutorials</a> to be the best resources out there. I will also be putting together a coding series together in the future - follow me on <a href="https://twitter.com/mehdimaujood">Twitter</a> or <a href="https://www.linkedin.com/in/maujood/">LinkedIn</a> to hear about it!</p>
            </div>
        </div>
    </article>;
}

export default HomePage;