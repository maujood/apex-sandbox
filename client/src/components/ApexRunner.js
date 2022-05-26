import React from 'react';
import Editor from "@monaco-editor/react";
import Executor from './Executor';
import ProblemDisplay from './ProblemDisplay';
import ContributorInfo from './ContributorInfo';

class ApexRunner extends React.Component {
    state = {
        execResults: '[]',
        code: '',
        problemTitle: '',
        problemDescription: '',
        problem: '{}',
        authorName: '',
        authorUrl: '',
        executeInProgress: false
    }

    firstLine;
    editorRef;
    monacoRef;

    editorOptions = {
        minimap: {
            enabled: false
        }
    }

    editorDidMount = (editor, monaco) => {
        //editor is mounted AFTER the main component. Save the reference for future use
        this.editorRef = editor; 
        this.monacoRef = monaco;

        //does the editor mount first? or the call to /api/problem finishes first?
        //if the call is already finished, this.state.code has the code we set it here.
        //if not, when /api/proble returns, we will set the value.
        if (this.state.code.length > 0) {
            this.editorRef.setValue(this.state.code);
        }
    }

    componentDidMount = () => {
        //once the component is mounted, we need to retrieve problem details from
        //localStorage, or fetch them from the server.
        this.getProblem();
    }

    getProblem = () => {
        fetch('/api/problem/view/' + parseInt(this.props.problemId))
        .then(res => {
            return res.json();
        })
        .then(result => {
            let localSolution = window.localStorage.getItem('problem/' + this.props.problemId);
            let localCode = localSolution ? JSON.parse(localSolution).code : null;
            let resultStr = JSON.stringify(result);
            this.setState({
                code: localCode ? localCode : result.method,
                problemTitle: result.title,
                problemDescription: result.problem_statement,
                authorName: result.name,
                authorUrl: result.url,
                problem: resultStr
            });

            //store the first line of the method in a variable to ensure.
            //will later be used for validation
            this.firstLine = result.method.split('\n')[0];

            //if the editor has been mounted, we set the state on the editor.
            if (this.editorRef) {
                this.editorRef.setValue(this.state.code);
            }
        });
    }

    executeApex = () => {
        this.setState({
            executeInProgress: true
        });
        fetch('/api/executeApex', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({code: this.state.code, problemId: this.props.problemId})
        })
        .then(res => {
            //if user is logged out, make sure to return an empty array
            //as the execute results.
            if (res.status === 401) {
                console.log('Logged out. Do something.');
                //if logged out, we need to reset user info.
                if (this.props.onlogout) {
                    this.props.onlogout();
                }
                return [];
            }
            else if (res.status === 500) {
                console.log('Some other issue. Do something else.');
                return [];
            }
            return res.json();
        })
        .then(result => {
            this.setState({ 
                execResults: JSON.stringify(result),
                executeInProgress: false
            });
        })
        .catch(err => {
            this.setState({
                executeInProgress: false
            });
        });
    }

    codeChanged = (value, event) => {
        //The code change is not valid since the method signature (first line) has changed
        //OR the problem has not yet been loaded
        if (this.state.problemTitle === '' || (this.firstLine !== undefined && this.firstLine !== null && !value.startsWith(this.firstLine))) {
            //The code change is not valid since the method signature (first line) has changed.
            this.editorRef.getModel().undo();
        }
        else {
            this.setState({
                code: value
            });
            let localStore = JSON.stringify({code: value, timestamp: new Date().getTime().toString()});
            window.localStorage.setItem('problem/' + this.props.problemId, localStore);
        }
    }

    render() {
        return (
            <article class="slds-card slds-m-around_x-large">
                <div class="slds-card__header slds-grid">
                    <header class="slds-media slds-media_center slds-has-flexi-truncate">
                        <div class="slds-media__figure">
                            <span class="slds-icon_container slds-icon-standard-account" title="apex">
                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                <use href="/assets/icons/standard-sprite/svg/symbols.svg#apex"></use>
                            </svg>
                            <span class="slds-assistive-text">{}</span>
                            </span>
                        </div>
                        <div class="slds-media__body">
                            <h2 class="slds-card__header-title">
                                <span>#{this.props.problemId} - {this.state.problemTitle}</span>
                            </h2>
                        </div>
                        <div class="slds-no-flex">
                            <ContributorInfo authorName={this.state.authorName} authorUrl={this.state.authorUrl} />
                        </div>
                    </header>
                </div>
                <div class="slds-card__body slds-card__body_inner">
                    <div className="slds-grid slds-wrap">
                        <div class="slds-col slds-large-size_1-of-3 slds-medium-size_1-of-1 slds-small-size_1-of-1 slds-p-around_medium">
                            <ProblemDisplay problem={this.state.problem} />
                        </div>
                        <div class="slds-col slds-large-size_2-of-3 slds-medium-size_1-of-1 slds-small-size_1-of-1 slds-p-around_medium">
                            <div className="slds-grid slds-wrap">
                                <div class="slds-col slds-size_1-of-1">
                                    <Editor
                                        height="70vh"
                                        defaultLanguage="apex"
                                        theme="vs-dark"
                                        options={this.editorOptions}
                                        onMount={this.editorDidMount}
                                        onChange={this.codeChanged}
                                    />
                                </div>
                                <div class="slds-col slds-size_1-of-1 slds-m-top_medium">
                                    <Executor 
                                        onExecute={this.executeApex}
                                        loading={this.state.executeInProgress}
                                        executeResults={this.state.execResults}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default ApexRunner;