import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProblemList = (props) => {
  let navigate = useNavigate();
  let problemList = [];
  let filteredProblems = [];

  const [state, setState] = useState([]);

  const [categorySelected, setCategory] = React.useState(0);

  const handleCategoryChanged = (e) => {
    setCategory(Number(e.target.value));
  };

  useEffect(() => {
    fetch("/api/problemListAll")
      .then((response) => response.json())
      .then((res) => {
        setState({
          problemListStr: JSON.stringify(res),
        });
      });
  }, []);

  if (state.problemListStr) {
    problemList = JSON.parse(state.problemListStr);
    filteredProblems = problemList;
  }

  let solvedProblem = (successCount) => {
    if (successCount && successCount > 0) {
      return (
        <span
          class="slds-icon_container slds-icon-utility-check slds-current-color"
          title="Description of icon when needed"
        >
          <svg class="slds-icon slds-icon_xx-small" aria-hidden="true">
            <use href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
          </svg>
          <span class="slds-assistive-text">Description of icon when needed</span>
        </span>
      );
    } else {
      return;
    }
  };

  return (
    <>
      <article class="slds-m-around_x-large">
        <div class="slds-card left-border">
          <div class="slds-card__header slds-grid">
            <header class="slds-media slds-media_center slds-has-flexi-truncate">
              <div class="slds-media__body">
                <span class="slds-icon_container slds-icon_container_circle slds-icon-standard-account">
                  <svg class="slds-icon" aria-hidden="true">
                    <use href="/assets/icons/action-sprite/svg/symbols.svg#apex"></use>
                  </svg>
                </span>
                <h2 class="slds-text-heading_large heading">Problem List</h2>
              </div>
            </header>
          </div>
          <div class="slds-card__body slds-card__body_inner slds-wrap">
            <table
              class="slds-table slds-table_cell-buffer slds-table_bordered"
              aria-label="Example default base table of Opportunities"
            >
              <thead>
                <tr class="slds-line-height_reset">
                  <th class="" scope="col">
                    <div class="slds-truncate" title="Title">
                      Title
                    </div>
                  </th>
                  <th class="" scope="col">
                    <div class="slds-truncate" title="Category">
                      Category
                    </div>
                  </th>
                  <th class="" scope="col">
                    <div class="slds-truncate" title="Completed">
                      Completed
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem) => (
                  <tr key={problem.id} onClick={() => navigate("/Problem/" + problem.id)}>
                    <td>{problem.title}</td>
                    <td>{problem.category}</td>
                    <td>{solvedProblem(problem.success)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </>
  );
};

export default ProblemList;
