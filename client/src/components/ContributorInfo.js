import React from 'react';
import { useParams } from "react-router-dom";

function ContributorInfo(props) {
    if (props.authorName != null && props.authorName !== '' && props.authorUrl != null && props.authorUrl !== '') {
      return <div>
        Contributed by: <a href={props.authorUrl} target="_blank" rel="noreferrer">{props.authorName}</a>
      </div>;
    }
    else if (props.authorName != null && props.authorName !== '') {
      return <div>
        Contributed by: {props.authorName}
      </div>
    }
    return null;
  }

export default ContributorInfo;