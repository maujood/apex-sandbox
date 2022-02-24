import React from 'react';

const NavigationHardcoded = (props) => {   
    return (
    <div className="nav_container">
        <nav class="slds-tree_container slds-p-top_small">
            <ul aria-labelledby="treeheading" class="slds-tree" role="tree">
                <li aria-level="1" role="treeitem">
                    <div class="slds-tree__item">
                        <button class="slds-button slds-button_icon slds-m-right_x-small slds-hidden" aria-hidden="true" tabindex="-1" title="Expand Tree Item">
                        <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                            <use href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
                        </svg>
                        <span class="slds-assistive-text">Expand Tree Item</span>
                        </button>
                        <span class="slds-has-flexi-truncate">
                            <a href="/"><span class="slds-tree__item-label slds-truncate" title="Tree Item">Home</span></a>
                        </span>
                    </div>
                </li>
                <li aria-level="1" role="treeitem">
                    <div class="slds-tree__item">
                        <button class="slds-button slds-button_icon slds-m-right_x-small slds-hidden" aria-hidden="true" tabindex="-1" title="Expand Tree Item">
                        <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                            <use href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
                        </svg>
                        <span class="slds-assistive-text">Expand Tree Item</span>
                        </button>
                        <span class="slds-has-flexi-truncate">
                            <a href="/problem/1"><span class="slds-tree__item-label slds-truncate" title="Tree Item">Array Sum</span></a>
                        </span>
                    </div>
                </li>
                <li aria-level="1" role="treeitem">
                    <div class="slds-tree__item">
                        <button class="slds-button slds-button_icon slds-m-right_x-small slds-hidden" aria-hidden="true" tabindex="-1" title="Expand Tree Item">
                        <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                            <use href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
                        </svg>
                        <span class="slds-assistive-text">Expand Tree Item</span>
                        </button>
                        <span class="slds-has-flexi-truncate">
                            <a href="/problem/2"><span class="slds-tree__item-label slds-truncate" title="Tree Item">Largest Element</span></a>
                        </span>
                    </div>
                </li>
                <li aria-level="1" role="treeitem">
                    <div class="slds-tree__item">
                        <button class="slds-button slds-button_icon slds-m-right_x-small slds-hidden" aria-hidden="true" tabindex="-1" title="Expand Tree Item">
                        <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                            <use href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
                        </svg>
                        <span class="slds-assistive-text">Expand Tree Item</span>
                        </button>
                        <span class="slds-has-flexi-truncate">
                            <a href="/problem/3"><span class="slds-tree__item-label slds-truncate" title="Tree Item">Largest of Three</span></a>
                        </span>
                    </div>
                </li>
            </ul>
        </nav>
    </div>);
}

export default NavigationHardcoded;