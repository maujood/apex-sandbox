import React, { useState } from 'react';
import ExecutionResult from './ExecutionResult';
import confetti from 'canvas-confetti';

const ExecutionResults = (props) => {   
    const [confettiFired, setConfettiFired] = useState(false);

    if (props.loading) {
        //reset confetti
        if (confettiFired) setConfettiFired(false);
        return <div role="status" class="slds-spinner slds-spinner_small">
            <span class="slds-assistive-text">Loading</span>
            <div class="slds-spinner__dot-a"></div>
            <div class="slds-spinner__dot-b"></div>
        </div>
    }
    else {
        let parsedResults = JSON.parse(props.executeResults);
        
        if (parsedResults.length > 0) {
            let allPassed = true;
            for (let i=0; i<parsedResults.length; i++) {
                if (!parsedResults[i].success || !parsedResults[i].compiled) {
                    allPassed = false;
                }
            }
            if (allPassed && !confettiFired) {
                setConfettiFired(true);
                confetti({
                    particleCount: 200,
                    spread: 360,
                    origin: { y: 0.5 }
                });
            }
        }

        return (<div>
            <div class="slds-card">
                <div class="slds-card__body slds-card__body_inner">
                    <ul class="slds-has-dividers_bottom-space">
                        {parsedResults.map((result, i) => <ExecutionResult result={result} testNumber={i+1} />)}
                    </ul>
                </div>
            </div>
        </div>)
    }
}

export default ExecutionResults;