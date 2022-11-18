import React from 'react';
import TeamMember from './TeamMember';

const Team = (props) => {
    let mehdiBio = () => {
        return <>
            <p>I'm passionnate about teaching people how to code, and this is why I started ApexSandbox.io!</p>
            <p>I've been writing code on different platforms for over a decade and I currently work on Salesforce at Meta. I'm also an <a href="https://www.pluralsight.com/authors/mehdi-maujood" target="_blank">author at Pluralsight</a>. I'm happy to <a href="https://www.linkedin.com/in/maujood/">connect on LinkedIn</a> if you would like to network.</p>
        </>;
    }

    let genericBio = () => {
        return <>
            <p>This person hasn't put a bio on here yet, but can confirm they're awesome.</p>
        </>;
    }

    return <article class="slds-m-around_x-large">
        <div class="slds-card left-border">
            <div class="slds-card__header slds-grid">
                <header class="slds-media slds-media_center slds-has-flexi-truncate">
                    <div class="slds-media__body">
                        <h2 class="slds-text-heading_large heading">Meet the Team</h2>
                    </div>
                </header>
            </div>
            <div class="slds-card__body slds-card__body_inner slds-wrap">
                <p class="slds-text-heading_small slds-p-top_medium">Meet the peeps that built this website and contributed all those fun problems to it.</p>

                <div class="slds-grid slds-wrap slds-m-top_large">
                    <TeamMember 
                        url="https://www.linkedin.com/in/maujood/"
                        avatarUrl="/assets/images/avatar_mehdi.jpg"
                        memberName="Mehdi Maujood"
                        bio={mehdiBio()}
                        />

                    <TeamMember 
                        url="https://www.linkedin.com/in/madiharaza88/"
                        avatarUrl="/assets/images/avatar_madi.jpg"
                        memberName="Madiha Raza"
                        bio={genericBio()}
                        />

                    <TeamMember 
                        url="https://www.linkedin.com/in/brooksdjohnson/"
                        avatarUrl="/assets/images/avatar_brooks.jpg"
                        memberName="Brooks Johnson"
                        bio={genericBio()}
                        />

                    <TeamMember 
                        url="https://www.linkedin.com/in/ankush-sarsewar/"
                        avatarUrl="/assets/images/avatar_ankush.jpg"
                        memberName="Ankush Sarsewar"
                        bio={genericBio()}
                        />

                    <TeamMember 
                        url="https://www.linkedin.com/in/noor-alam-shuvo/"
                        avatarUrl="/assets/images/avatar_noor_alam.jpg"
                        memberName="Noor Alam Shuvo"
                        bio={genericBio()}
                        />

                    <TeamMember 
                        url="https://www.linkedin.com/in/girish-shinde/"
                        avatarUrl="/assets/images/avatar_girish.jpg"
                        memberName="Girish Shinde"
                        bio={genericBio()}
                        />
                    
                    <TeamMember 
                        url="https://www.linkedin.com/in/sahil-manglani-7279aa1aa/"
                        avatarUrl="/assets/images/avatar_sahil.jpg"
                        memberName="Sahil Manglani"
                        bio={genericBio()}
                        />
                    
                    <TeamMember 
                        url="https://www.linkedin.com/in/pritha-gupta-838740106/"
                        avatarUrl="/assets/images/avatar_pritha.jpg"
                        memberName="Pritha Gupta"
                        bio={genericBio()}
                        />
                </div>
            </div>
        </div>
    </article>;
}

export default Team;