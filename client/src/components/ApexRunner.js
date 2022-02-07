import React, { useRef } from 'react';
import Editor from "@monaco-editor/react";

class ApexRunner extends React.Component {
    state = {
        execStatus: "",
        execMessage: "",
        code: ""
    }

    editorRef;

    editorOptions = {

    }

    editorDidMount = (editor, monaco) => {
        //editor is mounted AFTER the main component. Save the reference for future use
        this.editorRef = editor; 

        //does the editor mount first? or the call to /api/problem finishes first?
        //if the call is already finished, this.state.code has the code we set it here.
        //if not, when /api/proble returns, we will set the value.
        this.editorRef.setValue(this.state.code);
    }

    componentDidMount = () => {
        //once the component is mounted, we will fetch problem details so they can be 
        //displayed.
        this.getProblem();
    }

    getProblem = () => {
        console.log('ready to fetch.');
        fetch('/api/problem')
        .then(res => {
            return res.json();
        })
        .then(result => {
            this.setState({ 
                code: result.Method
            });

            //if the editor has been mounted, we set the state on the editor.
            if (this.editorRef) {
                this.editorRef.setValue(result.Method);
            }
        });
    }

    executeApex = () => {
        //run some apex yo!
        fetch('/api/executeApex', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({code: this.state.code})
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            this.setState({ 
                execStatus: result.status,
                execMessage: result.message
            });
        });
    }

    codeChanged = (value, event) => {
        this.setState({
            code: value
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Editor
                        height="50vh"
                        defaultLanguage="apex"
                        theme="vs-light"
                        defaultValue={this.state.code}
                        options={this.editorOptions}
                        onMount={this.editorDidMount}
                    />
                </div>
                <button onClick={this.executeApex}>Run</button>
                <div>Result: {this.state.execStatus}</div>
                <div>Message: {this.state.execMessage}</div>
            </div>
        );
    }
}

export default ApexRunner;