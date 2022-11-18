import React from 'react';

const TeamMember = (props) => {
    return <div class="slds-col slds-size_1-of-1 slds-large-size_1-of-2">
                <article class="slds-card slds-card_boundary slds-m-around_medium personcard">
                    <div class="slds-card__header">
                        <div class="slds-media__body">
                            <a href={props.url} target="_blank">
                                <span class="slds-avatar slds-avatar_circle slds-avatar_large">
                                    <img alt="MM" src={props.avatarUrl} title={props.memberName} />
                                </span>
                                <h3 class="slds-text-heading_medium slds-p-left_small avatar_title">{props.memberName}</h3>
                            </a>
                        </div>
                    </div>
                    <div class="slds-card__body slds-card__body_inner">
                        {props.bio}
                    </div>
                </article>
            </div>;
}

export default TeamMember;