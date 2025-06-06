import { createSlice } from '@reduxjs/toolkit';
import {
  PopulatedDatabaseProject,
  PopulatedDatabaseSprint,
  PopulatedDatabaseTask,
} from '@fake-stack-overflow/shared';

interface ProjectState {
  project: PopulatedDatabaseProject | null;
}

const initialState: ProjectState = {
  project: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.project = action.payload;
    },

    addNewSprintToProject: (
      state,
      { payload: newSprint }: { payload: PopulatedDatabaseSprint },
    ) => {
      if (state.project) {
        state.project.sprints = [...state.project.sprints, newSprint];
      }
    },

    addNewTaskToSprint: (
      state,
      {
        payload: { sprintId, newTask },
      }: { payload: { sprintId: string; newTask: PopulatedDatabaseTask } },
    ) => {
      if (state.project) {
        const sprintIndex = state.project.sprints.findIndex(
          sprint => sprint._id.toString() === sprintId,
        );
        if (sprintIndex !== -1) {
          state.project.sprints[sprintIndex].tasks = [
            ...(state.project.sprints[sprintIndex].tasks || []),
            newTask,
          ];
        }
      }
    },

    addNewTaskToBacklog: (
      state,
      { payload: { newTask } }: { payload: { newTask: PopulatedDatabaseTask } },
    ) => {
      if (state.project) {
        state.project.backlogTasks = [...state.project.backlogTasks, newTask];
      }
    },

    removeSprintFromProject: (
      state,
      { payload: { sprintId } }: { payload: { sprintId: string } },
    ) => {
      if (state.project) {
        state.project.sprints = state.project.sprints.filter(
          sprint => sprint._id.toString() !== sprintId,
        );

        state.project = { ...state.project, sprints: [...state.project.sprints] };
      }
    },

    removeTaskFromProject: (state, { payload: { taskId } }: { payload: { taskId: string } }) => {
      if (state.project) {
        state.project.sprints.forEach(sprint => {
          sprint.tasks = sprint.tasks.filter(
            (task: PopulatedDatabaseTask) => task._id.toString() !== taskId,
          );
        });
        state.project.backlogTasks = state.project.backlogTasks.filter(
          task => task._id.toString() !== taskId,
        );
      }
    },

    updateTaskInProject: (
      state,
      {
        payload: { taskId, updatedTask },
      }: { payload: { taskId: string; updatedTask: PopulatedDatabaseTask } },
    ) => {
      if (state.project) {
        const updatedSprints = state.project.sprints.map((sprint: PopulatedDatabaseSprint) => {
          sprint.tasks = sprint.tasks.map((task: PopulatedDatabaseTask) => {
            if (
              task._id.toString() === updatedTask._id.toString() &&
              sprint._id.toString() === updatedTask.sprint?.toString()
            ) {
              return { ...updatedTask };
            }
            return task;
          });

          return sprint;
        });

        const updatedBacklogTasks = state.project.backlogTasks.map(
          (task: PopulatedDatabaseTask) => {
            if (task._id.toString() === updatedTask._id.toString()) {
              return { ...updatedTask };
            }
            return task;
          },
        );

        state.project = {
          ...state.project,
          sprints: updatedSprints,
          backlogTasks: updatedBacklogTasks,
        };
      }
    },

    updateSprintInProject: (
      state,
      {
        payload: { sprintId, updatedSprint },
      }: { payload: { sprintId: string; updatedSprint: PopulatedDatabaseSprint } },
    ) => {
      if (state.project) {
        const sprintIndex = state.project.sprints.findIndex(
          sprint => sprint._id.toString() === sprintId,
        );
        if (sprintIndex !== -1) {
          state.project.sprints = state.project.sprints.map((sprint: PopulatedDatabaseSprint) =>
            sprint._id.toString() === sprintId ? updatedSprint : sprint,
          );
        }
      }
    },

    startSprintReducer: (state, { payload: { sprintId } }: { payload: { sprintId: string } }) => {
      if (state.project) {
        state.project = {
          ...state.project,
          sprints: state.project.sprints.map((sprint: PopulatedDatabaseSprint) =>
            sprint._id.toString() === sprintId ? { ...sprint, status: 'In Progress' } : sprint,
          ),
        };
      }
    },

    filterTasksByUser: (state, { payload: { user } }: { payload: { user: string } }) => {
      if (state.project) {
        const filteredBacklogTasks = state.project.backlogTasks.filter(
          (task: PopulatedDatabaseTask) => task.assignedUser === user,
        );

        state.project = {
          ...state.project,
          backlogTasks: filteredBacklogTasks,
          sprints: state.project.sprints.map((sprint: PopulatedDatabaseSprint) => ({
            ...sprint,
            tasks: sprint.tasks.filter((task: PopulatedDatabaseTask) => task.assignedUser === user),
          })),
        };
      }
    },

    filterTasksBySprint: (state, { payload: { sprintId } }: { payload: { sprintId: string } }) => {
      if (state.project) {
        const filteredSprints = state.project.sprints.filter(
          (sprint: PopulatedDatabaseSprint) => sprint._id.toString() === sprintId,
        );

        const filteredBacklogTasks = state.project.backlogTasks.filter(
          (task: PopulatedDatabaseTask) => task.sprint?.toString() === sprintId,
        );

        state.project = {
          ...state.project,
          backlogTasks: filteredBacklogTasks,
          sprints: filteredSprints,
        };
      }
    },
  },
});

export const {
  setProject,
  addNewSprintToProject,
  addNewTaskToSprint,
  addNewTaskToBacklog,
  removeSprintFromProject,
  removeTaskFromProject,
  updateTaskInProject,
  updateSprintInProject,
  startSprintReducer,
  filterTasksByUser,
  filterTasksBySprint,
} = projectSlice.actions;
export default projectSlice.reducer;
