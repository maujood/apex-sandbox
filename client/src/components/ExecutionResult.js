import React, { useContext } from 'react';

const ExecutionResult = (props) => {   
    let result = props.result;
    if (result.compiled && result.success) {
        return (
        <li class="slds-item">
            <div class="slds-text-body_regular">
                <span class="slds-icon_container slds-icon-action-question-post-action slds-m-right_x-small">
                    <svg aria-hidden="true" class="slds-icon slds-icon_x-small">
                        <use href="/assets/icons/action-sprite/svg/symbols.svg#approval"></use>
                    </svg>
                </span>
                Test {props.testNumber} Passed
            </div>
            <pre>
                {result.testCode}
            </pre>
        </li>)
    }
    else if (!result.compiled) {
        return (
        <li class="slds-item">
            <div class="slds-text-body_regular">
                <span class="slds-icon_container slds-icon-action-close slds-m-right_x-small">
                    <svg aria-hidden="true" class="slds-icon slds-icon_x-small">
                        <use href="/assets/icons/action-sprite/svg/symbols.svg#close"></use>
                    </svg>
                </span>
                Test {props.testNumber} failed to compile. Error on line {result.line} column {result.column}: {result.compileProblem}
            </div>
            <pre>
                {result.testCode}
            </pre>
        </li>)
    }
    else {
        return (
        <li class="slds-item">
            <div class="slds-text-body_regular">
                <span class="slds-icon_container slds-icon-action-close slds-m-right_x-small">
                    <svg aria-hidden="true" class="slds-icon slds-icon_x-small">
                        <use href="/assets/icons/action-sprite/svg/symbols.svg#close"></use>
                    </svg>
                </span>
                Test {props.testNumber} failed: {result.exceptionMessage}
            </div>
            <pre>
                {result.testCode}
            </pre>
        </li>)
    }
}

export default ExecutionResult;