import React, { useState, useEffect } from 'react';
import NavigationCategory from './NavigationCategory';

const Navigation = (props) => {
    let problemList = [];
    const [state, setState] = useState([]);
    useEffect(() => {
        fetch('/api/problemList')
        .then(response => response.json())
        .then(res => {
            //problemList = res;
            setState({
                problemListStr: JSON.stringify(res)
            })
        });
    }, []);

    if (state.problemListStr) {
        problemList = JSON.parse(state.problemListStr);
    }
    
    return (<div className="nav_container">
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
                            <a href="/" class="slds-tree__item-label slds-truncate" title="Home">Home</a>
                        </span>
                    </div>
                </li>
                {problemList.map((category, i) => <NavigationCategory category={category.category} key={i} problems={category.problems} />)}
            </ul>
        </nav>
    </div>);
}

export default Navigation;