import React, { useState, useEffect } from 'react';
import HomeProblemItem from './HomeProblemItem';

const HomeRecentProblems = (props) => {
    let problemList = [];
    const [state, setState] = useState([]);
    useEffect(() => {
        fetch('/api/easyPeasyProblems')
        .then(response => response.json())
        .then(res => {
            //problemList = res;
            setState({
                problemListStr: JSON.stringify(res)
            });
            //problemList = res;
        });
    }, []);

    if (state.problemListStr) {
        problemList = JSON.parse(state.problemListStr);
    }
    
    return <>
        <ul class="slds-list slds-p-around_medium">
            {problemList.map((problem, i) => <HomeProblemItem id={problem.id} title={problem.title} />)}
        </ul>
    </>;
}

export default HomeRecentProblems;