import React from 'react';
import { useParams } from "react-router-dom";
import ApexRunner from './ApexRunner';

function Problem() {
    const { problemId } = useParams();
    
    return (
        <ApexRunner problemId={problemId} />
    );
  }

export default Problem;