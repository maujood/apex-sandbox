import React, { useState, useEffect } from 'react';

const NavigationProblem = (props) => {

    let renderSuccessIcon = () => {
        if (props.problem.success) {
            return <span class="slds-icon_container slds-p-left_x-small" title="Succesfully completed">
                <svg class="slds-icon slds-icon_xx-small slds-icon-text-success">
                    <use href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
                </svg>
            </span>;
        }
        return;
    }

    return (<li aria-level="2" aria-selected={props.selected} role="treeitem" tabindex="0">
        <div class="slds-tree__item">
            <span class="slds-has-flexi-truncate  slds-m-left_medium">
                <a href={'/problem/' + props.problem.id} class="slds-tree__item-label slds-truncate" title={props.problem.title}>
                    {props.problem.title}
                    {renderSuccessIcon()}
                </a>
            </span>
        </div>
    </li>);
}

export default NavigationProblem;