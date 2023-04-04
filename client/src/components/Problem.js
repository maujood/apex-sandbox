import React from 'react';
import { useParams } from "react-router-dom";
import ApexRunner from './ApexRunner';

function Problem(props) {
    const { problemId } = useParams();
    
    return (
        <ApexRunner problemId={problemId} onlogout={props.onlogout} onpointschanged={props.onpointschanged} />
    );
  }

export default Problem;