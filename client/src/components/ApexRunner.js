import React, { Component } from 'react';

class ApexRunner extends React.Component {
    state = {
        execStatus: "Unchanged"
    }

    executeApex = () => {
        //run some apex yo!
        fetch('/api/executeApex')
        .then(res => {
            return res.json();
        })
        .then(result => {
            this.setState({ 
                execStatus: result.status
                //execStatus: 'Changed'
            });
        });
    }

    render() {
        return (
            <div>
                <textarea class="apexCode"></textarea>
                <button onClick={this.executeApex}>Run</button>
                <div>Result: {this.state.execStatus}</div>
            </div>
        );
    }
}

export default ApexRunner;