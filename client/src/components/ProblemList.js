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

  const [problemsToShow, setProblemsToShow] = React.useState("All");
  const handleProblemsToShowChanged = (e) => {
    setProblemsToShow(e.target.value);
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
    console.log("Problem List", problemList);
    filteredProblems = problemList;
    if (categorySelected !== 0) {
      filteredProblems = problemList.filter((problem) => problem.category_id === categorySelected);
    }
    if (problemsToShow !== "All") {
      if (problemsToShow === "Solved") {
        filteredProblems = filteredProblems.filter((problem) => +problem.success !== 0);
      } else {
        filteredProblems = filteredProblems.filter((problem) => +problem.success === 0);
      }
    }
  }

  let solvedProblem = (successCount) => {
    if (successCount && successCount > 0) {
      return (
        <span
          class="slds-icon_container slds-icon-utility-check slds-current-color"
          title="Success"
        >
          <svg class="slds-icon slds-icon_xx-small" aria-hidden="true">
            <use href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
          </svg>
          <span class="slds-assistive-text">Success</span>
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
          <div class="slds-card__header slds-grid slds-m-bottom_x-large">
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
            {
              // Filters
            }
            <div class="slds-m-vertical_small">
              <div className="slds-grid slds-gutters slds-grid_align-end">
                {
                  // Category Filter
                }
                <div className="slds-col slds-size_1-of-5">
                  <div className="slds-form-element">
                    <label className="slds-form-element__label" for="select-01">
                      Category
                    </label>
                    <div className="slds-form-element__control">
                      <div className="slds-select_container">
                        <select
                          className="slds-select"
                          id="category_input"
                          value={categorySelected}
                          onChange={handleCategoryChanged}
                        >
                          <option value="0">All</option>
                          <option value="1">Apex 101</option>
                          <option value="7">Apex Language Features</option>
                          <option value="3">SObjects</option>
                          <option value="2">Lists</option>
                          <option value="4">Sets</option>
                          <option value="5">Maps</option>
                          <option value="6">Data Structures & Algorithms</option>
                          <option value="8">Database 101</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {
                  // Solved Filter
                }

                <div className="slds-col slds-size_1-of-5">
                  <div className="slds-form-element">
                    <label className="slds-form-element__label" for="select-01">
                      Completed
                    </label>
                    <div className="slds-form-element__control">
                      <div className="slds-select_container">
                        <select
                          className="slds-select"
                          id="problemsToShow_input"
                          value={problemsToShow}
                          onChange={handleProblemsToShowChanged}
                        >
                          <option value="All">All</option>
                          <option value="Unsolved">Unsolved</option>
                          <option value="Solved">Solved</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*
                Table
              */}
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
