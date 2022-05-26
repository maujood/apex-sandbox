import React, {useState, useRef} from 'react';
import { useParams } from "react-router-dom";

function ProblemUpsert(props) {
    const { urlProblemId } = useParams();
    const fetched = useRef(false);
    if (urlProblemId && !fetched.current) {
        fetched.current = true;
        console.log('fetching again');
        fetch('/api/problem/view/' + parseInt(urlProblemId))
        .then(res => {
            return res.json();
        })
        .then(problemInfo => {
            setProblemId(urlProblemId);
            setTitle(problemInfo.title);
            setProblemStatement(problemInfo.problem_statement);
            setInitialCode(problemInfo.method);
            setHints(JSON.stringify(problemInfo.hints));
            setTestCases(JSON.stringify(problemInfo.test_cases));
            setCategory(problemInfo.category_id);
        });
    }

    const [problemId, setProblemId] = useState(null);
    const [saveInProgress, setSaveInProgress] = useState(false);
    const [title, setTitle] = useState('');
    const titleChanged = (event) => {
        setTitle(event.target.value);
    }

    const [problemStatement, setProblemStatement] = useState('');
    const problemStatementChanged = (event) => {
        setProblemStatement(event.target.value);
    }

    const [initialCode, setInitialCode] = useState('');
    const initialCodeChanged = (event) => {
        setInitialCode(event.target.value);
    }

    const [hints, setHints] = useState('');
    const hintsChanged = (event) => {
        setHints(event.target.value);
    }

    const [testCases, setTestCases] = useState('');
    const testCasesChanged = (event) => {
        setTestCases(event.target.value);
    }

    const [category, setCategory] = useState('1');
    const categoryChanged = (event) => {
        setCategory(event.target.value);
    }

    const submitProblem = (event) => {
        const problemJson = {
            title: title,
            problem_statement: problemStatement,
            method: initialCode,
            hints: hints,
            test_cases: testCases,
            category_id: category
        }
        let saveUrl = '/api/problem/create';

        if (problemId != null) {
            problemJson.id = problemId;
            saveUrl = '/api/problem/edit';
        }

        console.log(problemJson);

        setSaveInProgress(true);
        fetch(saveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(problemJson)
        })
        .then(res => {
            if (res.status === 401) {
                alert('It looks like you do not have permissions to submit problems. You may have been logged out.')
                if (props.onlogout) {
                    props.onlogout();
                }
                return {};
            }
            else if (res.status === 500) {
                alert('There was an error submitting this. Check the console for possible information.')
                console.log(res.json());
                return {};
            }
            return res.json();
        })
        .then(result => {
            if (result.problem_id) {
                setProblemId(result.problem_id);
                alert('Success!');
            }
            setSaveInProgress(false);
        })
        .catch(err => {
            setSaveInProgress(false);
        });
    }

    const disableSubmit = () => {
        return saveInProgress ||
            title === '' ||
            problemStatement === '' ||
            initialCode === '' ||
            hints === '' ||
            testCases === '';
    }

    return <article class="slds-card slds-m-around_x-large">
    <div class="slds-card">
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
                        <span>Contribute an Apex Practice Problem</span>
                    </h2>
                </div>
            </header>
        </div>

        <div class="slds-card__body slds-card__body_inner">
            Problem ID: {problemId}
            <div class="slds-form-element">
                <label class="slds-form-element__label" for="problem-title">
                    <abbr class="slds-required" title="required">* </abbr>Title</label>
                <div class="slds-form-element__control">
                    <input type="text" value={title} onChange={titleChanged} id="problem-title" placeholder="e.g. Number Difference" required="" class="slds-input" />
                </div>
            </div>
            <div class="slds-form-element">
                <label class="slds-form-element__label" for="problem-statement">
                    <abbr class="slds-required" title="required">* </abbr>Problem Statement</label>
                <div class="slds-form-element__control">
                <textarea id="problem-statement" value={problemStatement} onChange={problemStatementChanged} placeholder="&lt;p&gt;Implement the method &lt;code&gt;blahBlah&lt;/code&gt; that does blah blah.&lt;/p&gt;" class="slds-textarea"></textarea>
                </div>
            </div>
            
            <div class="slds-form-element">
                <label class="slds-form-element__label" for="initial-code">
                    <abbr class="slds-required" title="required">* </abbr>Initial Code</label>
                <div class="slds-form-element__control">
                <textarea id="initial-code" value={initialCode} onChange={initialCodeChanged} placeholder="public Integer diff(Integer a, Integer b) {
                    //code here
}" class="slds-textarea" rows="4"></textarea>
                </div>
            </div>

            <div class="slds-form-element">
                <label class="slds-form-element__label" for="problem-hints">
                    <abbr class="slds-required" title="required">* </abbr>Hints</label>
                <div class="slds-form-element__control">
                <textarea id="problem-hints" value={hints} onChange={hintsChanged} placeholder="[
                    &quot;This is the first hint. Notice that it's in a JSON-style array with double quotes.&quot;,
                    &quot;This is the second hint. Use the &lt;code&gt;blahBlah&lt;/code&gt; method. Docs: &lt;a href='https://developer.salesforce.com/docs'&gt;Notice the single quotes in the href&lt;/a&gt;&quot;
                    ]" class="slds-textarea" rows="4"></textarea>
                </div>
            </div>
            <div class="slds-form-element">
                <label class="slds-form-element__label" for="test-cases">
                    <abbr class="slds-required" title="required">* </abbr>Test Cases</label>
                <div class="slds-form-element__control">
                <textarea id="test-cases" value={testCases} onChange={testCasesChanged} placeholder="[
                    &quot;Each test case goes in as a list item in this array&quot;,
                    &quot;In order to continue living a happy life, type the test cases out in VS Code with Apex language selection and paste them here.&quot;
                    ]" class="slds-textarea" rows="15"></textarea>
                </div>
            </div>
            <div class="slds-form-element">
                <label class="slds-form-element__label" for="problem-category">
                    <abbr class="slds-required" title="required">* </abbr>Problem Category</label>
                <div class="slds-form-element__control">
                    <div class="slds-select_container">
                        <select id="problem-category" value={category} onChange={categoryChanged} class="slds-select">
                            <option value="1">Apex 101</option>
                            <option value="2">SObjects</option>
                            <option value="3">Lists</option>
                            <option value="4">Sets</option>
                            <option value="5">Maps</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <button class="slds-button slds-button_brand slds-m-top_medium" disabled={disableSubmit()} onClick={submitProblem}>Submit</button>
        </div>
    </div>
</article>;
  }

export default ProblemUpsert;