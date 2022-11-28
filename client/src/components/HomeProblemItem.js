import React from 'react';

const HomeProblemItem = (props) => {   
    let problemLink = '/problem/' + props.id;
    return <li>
        <a href={problemLink}>{props.title}</a>
    </li>
}

export default HomeProblemItem;