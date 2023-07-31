import React, { createContext, useContext, useReducer } from "react";


const TimeTrackerStateContext = createContext();
const TimeTrackerDispatchContext = createContext();

const timeTrackerReducer = (state, action) => {
    console.log(action); 
    switch (action.type) {
        case "CREATE_PROJECT":
          return { ...state, projects: [...state.projects, action.payload], selectedProject: action.payload };
        case "SELECT_PROJECT":
          return { ...state, selectedProject: action.payload };
        case "CREATE_TASK":
          if (!state.selectedProject) return state;
          return {
            ...state,
            projects: state.projects.map((project) =>
              project === state.selectedProject
                ? { ...project, tasks: [...project.tasks, action.payload] }
                : project
            ),
          };
        default:
          return state;
      }
    };
const TimeTrackerProvider = ({ children }) => {
  const initialState = {
    projects: [],
    selectedProject: null,
  };

  const [state, dispatch] = useReducer(timeTrackerReducer, initialState);

  return (
    <TimeTrackerStateContext.Provider value={state}>
      <TimeTrackerDispatchContext.Provider value={dispatch}>
        {children}
      </TimeTrackerDispatchContext.Provider>
    </TimeTrackerStateContext.Provider>
  );
};

const useTimeTrackerState = () => {
  const context = useContext(TimeTrackerStateContext);
  if (!context) {
    throw new Error("useTimeTrackerState must be used within a TimeTrackerProvider");
  }
  return context;
};

const useTimeTrackerDispatch = () => {
  const context = useContext(TimeTrackerDispatchContext);
  if (!context) {
    throw new Error("useTimeTrackerDispatch must be used within a TimeTrackerProvider");
  }
  return context;
};

export { TimeTrackerProvider, useTimeTrackerState, useTimeTrackerDispatch };
