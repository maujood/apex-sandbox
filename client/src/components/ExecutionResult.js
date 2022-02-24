import React, { useContext } from 'react';

const ExecutionResult = (props) => {   
    let result = props.result;
    if (result.compiled && result.success) {
        return (<div>
            Test {props.key} Passed
        </div>)
    }
    else if (!result.compiled) {
        return (<div>
            Test {props.key} failed to compile: result.compileProblem
        </div>)
    }
    else {
        return (<div>
            Test {props.key} failed: {result.exceptionMessage}
        </div>)
    }
}

export default ExecutionResult;