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
        <p>Discuss this problem on the <a href="https://trailhead.salesforce.com/trailblazer-community/groups/0F94S000000kJb2SAE" target="_blank" rel="noreferrer">ApexSandbox.io Trailblazer Community Group</a></p>
    </div>);
}

export default ProblemDisplay;