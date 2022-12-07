import React, { useContext } from 'react';
import UserContext from './UserContext';
import ProblemHint from './ProblemHint';

const ProblemDisplay = (props) => {
    const user = useContext(UserContext);
    let problem = JSON.parse(props.problem);
    let hints = [];
    if (problem.hints) hints = problem.hints;

    let problemInfo = () => {
        if (problem.info_identifier === 'data_model' && user.loggedIn) {
            let packageUrl = user.instanceUrl + '/packaging/installPackage.apexp?p0=04t5f000000Gx6CAAS';
            return <div class="slds-scoped-notification slds-media slds-media_center slds-scoped-notification_light slds-m-bottom_small" role="status">
                <div class="slds-media__figure">
                <span class="slds-icon_container slds-icon-utility-info" title="information">
                    <svg class="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
                        <use href="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
                    </svg>
                    <span class="slds-assistive-text">information</span>
                </span>
                </div>
                <div class="slds-media__body">
                <p>
                    This problem requires installation of a packaged data model.
                </p>
                <ul>
                    <li><a href={packageUrl} target="_blank" rel="noreferrer">Install Package</a></li>
                    <li><a href="https://gist.github.com/maujood/9bca1e95a9fe39b1cb881a116873d83e" target="_blank" rel="noreferrer">Understand the data model</a></li>
                </ul>
                </div>
            </div>;
        }
        return <></>;
    }

    return (<div>
        {problemInfo()}
        <div dangerouslySetInnerHTML={{__html: problem.problem_statement}}></div>
        {hints.map((text, i) => {
            return <ProblemHint text={text} key={i} index={i+1} />
        })}
        <p>Discuss this problem on the <a href="https://trailhead.salesforce.com/trailblazer-community/groups/0F94S000000kJb2SAE" target="_blank" rel="noreferrer">ApexSandbox.io Trailblazer Community Group</a></p>
    </div>);
}

export default ProblemDisplay;