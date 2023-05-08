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

    // Filter the problem list based on table filters
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
          className="slds-icon_container slds-icon-utility-check slds-current-color"
          title="Success"
        >
          <svg className="slds-icon slds-icon_xx-small" aria-hidden="true">
            <use href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
          </svg>
          <span className="slds-assistive-text">Success</span>
        </span>
      );
    } else {
      return;
    }
  };

  return (
    <>
      <article className="slds-m-around_x-large">
        <div className="slds-card left-border">
          {
            // Header
          }
          <div className="slds-card__header slds-grid slds-m-bottom_x-large">
            <header className="slds-media slds-media_center slds-has-flexi-truncate">
              <div className="slds-media__body">
                <span className="slds-icon_container slds-icon_container_circle slds-icon-standard-account">
                  <svg className="slds-icon" aria-hidden="true">
                    <use href="/assets/icons/action-sprite/svg/symbols.svg#apex"></use>
                  </svg>
                </span>
                <h2 className="slds-text-heading_large heading">Problem List</h2>
              </div>
            </header>
          </div>
          {
            // Body
          }
          <div className="slds-card__body slds-card__body_inner slds-wrap">
            {
              // Filters
            }
            <div className="slds-m-vertical_small">
              <div className="slds-grid slds-gutters slds-grid_align-end">
                {
                  // Category Filter
                }
                <div className="slds-col slds-size_1-of-5">
                  <div className="slds-form-element">
                    <label className="slds-form-element__label" htmlFor="category_input">
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
                    <label className="slds-form-element__label" htmlFor="problemsToShow_input">
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
              className="slds-table slds-table_cell-buffer slds-table_bordered"
              aria-label="Table of Problems"
            >
              <thead>
                <tr className="slds-line-height_reset">
                  <th className="" scope="col">
                    <div className="slds-truncate" title="Title">
                      Title
                    </div>
                  </th>
                  <th className="" scope="col">
                    <div className="slds-truncate" title="Category">
                      Category
                    </div>
                  </th>
                  <th className="" scope="col">
                    <div className="slds-truncate" title="Completed">
                      Completed
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem) => (
                  <tr key={problem.id}>
                    <td><a href={"/problem/" + problem.id}>{problem.title}</a></td>
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
