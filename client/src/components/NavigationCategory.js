import React, { useState, useEffect } from 'react';
import NavigationProblem from './NavigationProblem';

const NavigationCategory = (props) => {
    let currentCategorySelected = false;
    props.problems.forEach((problem) => { 
        if (window.location.pathname === '/problem/' + problem.id) {
            currentCategorySelected = true;
            problem.selected = true;
        }
        else {
            problem.selected = false;
        }
    });

    const [expanded, setExpanded] = useState(currentCategorySelected);

    let toggleTree = () => {
        setExpanded(!expanded);
    }

    let treeToggleTitle = () => {
        let text = 'Expand';
        if (expanded) text = 'Collapse';
        return `${text} ${props.category} problems`;
    }

    return (<li aria-expanded={expanded} aria-label={`${props.category} problems`} aria-level="1" role="treeitem">
        <div class="slds-tree__item">
            <button class="slds-button slds-button_icon slds-m-right_x-small" aria-hidden="true" tabindex="0" title={`Expand ${props.category} problems`} onClick={toggleTree}>
                <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                    <use href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
                </svg>
                <span class="slds-assistive-text">{`Expand ${props.category} problems`}</span>
            </button>
            <span class="slds-has-flexi-truncate">
                <span class="slds-tree__item-label slds-truncate" title={props.category}>{props.category}</span>
            </span>
        </div>
        <ul role="group">
            {props.problems.map((problem, i) => {
                return <NavigationProblem key={i} problem={problem} selected={problem.selected} />
            })}
        </ul>
    </li>);
}

export default NavigationCategory;