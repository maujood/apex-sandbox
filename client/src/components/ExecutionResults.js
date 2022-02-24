import React, { useContext } from 'react';
import ExecutionResult from './ExecutionResult';

const ExecutionResults = (props) => {   
    const config = {
        angle: "135",
        spread: "102",
        startVelocity: "38",
        elementCount: 70,
        dragFriction: 0.12,
        duration: "3730",
        stagger: "18",
        width: "10px",
        height: "10px",
        perspective: "515px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };

    if (props.loading) {
        return <div role="status" class="slds-spinner slds-spinner_small">
            <span class="slds-assistive-text">Loading</span>
            <div class="slds-spinner__dot-a"></div>
            <div class="slds-spinner__dot-b"></div>
        </div>
    }
    else {
        let parsedResults = JSON.parse(props.executeResults);
        
        return (<div>
            <div class="slds-card">
                <div class="slds-card__body slds-card__body_inner">
                    {parsedResults.map((result, i) => <ExecutionResult result={result} key={i} />)}
                </div>
            </div>
        </div>)
    }
}

export default ExecutionResults;