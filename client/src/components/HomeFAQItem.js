import React from 'react';

const HomeFAQItem = (props) => {   
    //This component is no longer used and should be deleted.
    return <div class="demo-only slds-size_1-of-3">
                <div class="slds-media slds-media_center">
                    <div class="slds-media__figure">
                    <span class="slds-avatar slds-avatar_medium">
                        <span class="slds-icon_container slds-icon-text-success" title="question">
                            <svg class="slds-icon slds-icon_medium" aria-hidden="true">
                                <use href="/assets/icons/utility-sprite/svg/symbols.svg#help"></use>
                            </svg>
                            <span class="slds-assistive-text"></span>
                        </span>
                    </span>
                    </div>
                    <div class="slds-media__body">
                        <p class="slds-text-body_regular"><strong>{props.question}</strong></p>
                        <p class="slds-text-body_regular">{props.answer}</p>
                    </div>
                </div>
            </div>;
}

export default HomeFAQItem;