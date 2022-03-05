import React, { useState, useEffect } from 'react';
import ProblemHint from './ProblemHint';

const ProblemDisplay = (props) => {
    let problem = JSON.parse(props.problem);
    let hints = [];
    if (problem.hints) hints = problem.hints;

    return (<div>
        <div dangerouslySetInnerHTML={{__html: problem.problem_statement}}></div>
        {hints.map((text, i) => {
            return <ProblemHint text={text} key={i} index={i+1} />
        })}
    </div>);
}

export default ProblemDisplay;