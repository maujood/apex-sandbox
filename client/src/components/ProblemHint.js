import React, { useState, useEffect } from 'react';

const ProblemHint = (props) => {

    const [expanded, setExpanded] = useState(false);

    let toggleTree = () => {
        setExpanded(!expanded);
    }

    let sectionClass = () => {
        if (expanded) return 'slds-section slds-is-open';
        return 'slds-section';
    }

    return (<div class={sectionClass()}>
        <h3 class="slds-section__title">
        <button aria-controls={'hint' + props.index} aria-expanded={expanded} class="slds-button slds-section__title-action" onClick={toggleTree}>
            <svg class="slds-section__title-action-icon slds-button__icon slds-button__icon_left" aria-hidden="true">
            <use href="/assets/icons/utility-sprite/svg/symbols.svg#switch"></use>
            </svg>
            <span class="slds-truncate" title="Section Title">Hint {props.index}</span>
        </button>
        </h3>
        <div aria-hidden="true" class="slds-section__content" id={'hint' + props.index}>
        <p>
            <div dangerouslySetInnerHTML={{__html: props.text}}></div>
        </p>
        </div>
    </div>);
}

export default ProblemHint;