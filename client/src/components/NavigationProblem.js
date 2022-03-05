import React, { useState, useEffect } from 'react';

const NavigationProblem = (props) => {

    let renderSuccessIcon = () => {
        if (props.problem.success) {
            return <span class="slds-icon_container slds-p-left_x-small" title="Problem succesfully completed">
                <svg class="slds-icon slds-icon_xx-small slds-icon-text-success">
                    <use href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
                </svg>
            </span>;
        }
        return;
    }

    return (<li aria-level="2" aria-selected={props.selected} role="treeitem" tabindex="-1">
        <div class="slds-tree__item">
            <button class="slds-button slds-button_icon slds-m-right_x-small slds-hidden" aria-hidden="true" tabindex="-1" title="Expand Tree Item">
                <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                    <use href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
                </svg>
                <span class="slds-assistive-text">Expand Tree Item</span>
            </button>
            <span class="slds-has-flexi-truncate">
                <a href={'/problem/' + props.problem.id} class="slds-tree__item-label slds-truncate" title={props.problem.title}>
                    {props.problem.title}
                    {renderSuccessIcon()}
                </a>
            </span>
        </div>
    </li>);
}

export default NavigationProblem;