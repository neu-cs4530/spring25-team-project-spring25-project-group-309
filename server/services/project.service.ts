import { UpdateQuery } from 'mongoose';
import { Project, ProjectResponse } from '../types/types';
import ProjectModel from '../models/project.model';

/**
 * Creates and saves a project to the database.
 * @param project The project object to be saved.
 * @returns The saved project object or an error message.
 */
export const saveProject = async (project: Project): Promise<ProjectResponse> => {
  try {
    const result = await ProjectModel.create(project);
    return result;
  } catch (error) {
    return { error: 'Error when saving a project' };
  }
};

/**
 * Finds a project by its ID.
 * @param projectId The project ID to search for.
 * @returns The found project or an error message.
 */
export const getAllProjectsByUser = async (username: string): Promise<ProjectResponse[]> => {
  try {
    const projects = await ProjectModel.find({ assignedUsers: { $in: [username] } }).lean();

    if (!projects) {
      throw new Error('No project found');
    }
    return projects;
  } catch (error) {
    return [{ error: 'Error when getting a project' }];
  }
};

/**
 * Updates a project with new information.
 * @param projectId The ID of the project to update.
 * @param updates The new information to update the project with.
 * @returns The updated project or an error message.
 */
export const updateProject = async (
  projectId: string,
  updates: UpdateQuery<Project>,
): Promise<ProjectResponse> => {
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, updates, {
      new: true,
    }).lean();
    if (!updatedProject) {
      throw Error('Project not found');
    }
    return updatedProject;
  } catch (error) {
    return { error: 'Error when updating a project' };
  }
};
