import React, { Component } from 'react';

class Navigation extends React.Component {
    state = {
        selected: "None"
    }

    render() {
        return (
            <div className="slds-border_right nav_container">
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
                            <span class="slds-tree__item-label slds-truncate" title="Tree Item">Home</span>
                            </span>
                        </div>
                        </li>
                    </ul>
                    <ul aria-labelledby="treeheading" class="slds-tree" role="tree">
                        <li aria-expanded="true" aria-label="Tree Branch" aria-level="1" role="treeitem">
                        <div class="slds-tree__item">
                            <button class="slds-button slds-button_icon slds-m-right_x-small" aria-hidden="true" tabindex="-1" title="Expand Tree Branch">
                            <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                                <use href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
                            </svg>
                            <span class="slds-assistive-text">Expand Tree Branch</span>
                            </button>
                            <span class="slds-has-flexi-truncate">
                            <span class="slds-tree__item-label slds-truncate" title="Tree Branch">Problem Sets</span>
                            </span>
                        </div>
                        <ul role="group">
                            <li aria-level="2" aria-selected="true" role="treeitem" tabindex="0">
                            <div class="slds-tree__item">
                                <button class="slds-button slds-button_icon slds-m-right_x-small slds-hidden" aria-hidden="true" tabindex="-1" title="Expand Tree Item">
                                <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                                    <use href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
                                </svg>
                                <span class="slds-assistive-text">Expand Tree Item</span>
                                </button>
                                <span class="slds-has-flexi-truncate">
                                <span class="slds-tree__item-label slds-truncate" title="Tree Item">Apex 101</span>
                                </span>
                            </div>
                            </li>
                        </ul>
                        </li>
                        <li aria-expanded="false" aria-label="Tree Branch" aria-level="1" role="treeitem">
                        <div class="slds-tree__item">
                            <button class="slds-button slds-button_icon slds-m-right_x-small" aria-hidden="true" tabindex="-1" title="Expand Tree Branch">
                            <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                                <use href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
                            </svg>
                            <span class="slds-assistive-text">Expand Tree Branch</span>
                            </button>
                            <span class="slds-has-flexi-truncate">
                            <span class="slds-tree__item-label slds-truncate" title="Tree Branch">Apex Tutorials</span>
                            </span>
                        </div>
                        <ul role="group">
                            <li aria-level="2" role="treeitem">
                            <div class="slds-tree__item">
                                <button class="slds-button slds-button_icon slds-m-right_x-small slds-hidden" aria-hidden="true" tabindex="-1" title="Expand Tree Item">
                                <svg class="slds-button__icon slds-button__icon_small" aria-hidden="true">
                                    <use href="/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>
                                </svg>
                                <span class="slds-assistive-text">Expand Tree Item</span>
                                </button>
                                <span class="slds-has-flexi-truncate">
                                <span class="slds-tree__item-label slds-truncate" title="Tree Item">Tree Item</span>
                                </span>
                            </div>
                            </li>
                        </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navigation;