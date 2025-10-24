import React from 'react';
import TeamMember from './TeamMember';

const Team = (props) => {
    let mehdiBio = () => {
        return <>
            <p>I'm passionnate about teaching people how to code, and this is why I started ApexSandbox.io!</p>
            <p>I've been writing code on different platforms for over a decade and I currently work on Salesforce at Meta. I'm also an <a href="https://www.pluralsight.com/authors/mehdi-maujood" target="_blank">author at Pluralsight</a>. I'm happy to <a href="https://www.linkedin.com/in/maujood/">connect on LinkedIn</a> if you would like to network.</p>
        </>;
    }

    let girishBio = () => {
        return <>
            <p>I am a Software Engineer who loves to solve complex problems using code.</p>
            <p>Although I have spent the past few years coding on the Salesforce platform, I have been consistently exploring other technologies to find what problems they solve. I get excited about finding solutions to common problems.</p>
        </>;
    }

    let sahilBio = () => {
        return <>
            <p>I'm a Salesforce developer who loves solving problems using code. I started creating Apex practice problems on ApexSandbox.io so every Apex developer could improve their problem solving skills. I have also experience of creating awesome apps on top of Angular and I am currently at Concret.io.</p>
            <p>I would be happy to <a href="https://www.linkedin.com/in/sahil-manglani-7279aa1aa/" target="_blank">connect on Linkedin</a> if you would like to network.</p>
        </>;
    }

    let harsBio = () => {
        return <>
            <p>I love solving problems at scale.</p>
            <p>I'm a 9 to 5 Software Developer and Cloud Advocate, Tech Blogger, Traveler and a Tech Reviewer from 5 to 9.</p>  
        </>
    }

    let ankushBio = () => {
        return <>
            <p>I'm a driven and detail-oriented software engineer with professional experience in Salesforce, and I enjoy writing code.</p>
        </>
    }

    let noorBio = () => {
        return <>
            <p>A software engineer with 10+ years of professional experience gained in tech stacks like C++, C#.NET, and Salesforce. I am passionate about solving problems, and performance optimization in Software Development. I have a fascination with system design.</p>
            <p>I will be glad to connect with you on https://www.linkedin.com/in/noor-alam-shuvo/</p>
        </>
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
                        <span class="slds-icon_container slds-icon_container_circle slds-icon-standard-account">
                            <svg class="slds-icon" aria-hidden="true">
                                <use href="/assets/icons/action-sprite/svg/symbols.svg#new_group"></use>
                            </svg>
                        </span>
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
                        bio={ankushBio()}
                        />

                    <TeamMember 
                        url="https://www.linkedin.com/in/noor-alam-shuvo/"
                        avatarUrl="/assets/images/avatar_noor_alam.jpg"
                        memberName="Noor Alam Shuvo"
                        bio={noorBio()}
                        />

                    <TeamMember 
                        url="https://www.linkedin.com/in/girish-shinde/"
                        avatarUrl="/assets/images/avatar_girish.jpg"
                        memberName="Girish Shinde"
                        bio={girishBio()}
                        />
                    
                    <TeamMember 
                        url="https://www.linkedin.com/in/iamhardik/"
                        avatarUrl="/assets/images/avatar_hars.jpg"
                        memberName="Hardik Chudasama"
                        bio={harsBio()}
                        />
                    
                    <TeamMember 
                        url="https://www.linkedin.com/in/sahil-manglani-7279aa1aa/"
                        avatarUrl="/assets/images/avatar_sahil.jpg"
                        memberName="Sahil Manglani"
                        bio={sahilBio()}
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