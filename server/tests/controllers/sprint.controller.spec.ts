import supertest from 'supertest';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { app } from '../../app';
import * as util from '../../services/sprint.service';
import { databaseSprint } from '../mockData.models';
import { DatabaseSprint, PopulatedDatabaseSprint, SprintResponse } from '../../types/types';
import * as databaseUtil from '../../utils/database.util';

const createSprintSpy = jest.spyOn(util, 'saveSprint');
const getSprintSpy = jest.spyOn(util, 'getSprintbyId');
const populateDocumentSpy = jest.spyOn(databaseUtil, 'populateDocument');
const deleteSprintByIdSpy = jest.spyOn(util, 'deleteSprintById');
const updateSprintSpy = jest.spyOn(util, 'updateSprint');

const mockSprintResponse = {
  _id: databaseSprint._id.toString(),
  name: databaseSprint.name,
  project: databaseSprint.project.toString(),
  startDate: databaseSprint.startDate.toISOString(),
  endDate: databaseSprint.endDate.toISOString(),
  status: databaseSprint.status,
  tasks: databaseSprint.tasks.map(task => task.toString()),
};

const sprintNoTasksRequest = {
  name: 'Test',
  project: new ObjectId('47e9b58310afe6e94fc2e9dc').toString(),
  startDate: new Date('2023-11-18T09:24:00').toISOString(),
  endDate: new Date('2023-11-18T09:24:00').toISOString(),
  status: 'active',
};

const sprintNoTasksResponse = {
  _id: new ObjectId('65e9b58910afe6e94fc6e6dc'),
  name: 'Test',
  project: new ObjectId('47e9b58310afe6e94fc2e9dc'),
  startDate: new Date('2023-11-18T09:24:00'),
  endDate: new Date('2023-11-18T09:24:00'),
  status: 'active',
  tasks: [],
};

const mockFoundSprint: DatabaseSprint = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Test',
  project: new mongoose.Types.ObjectId(),
  startDate: new Date('2023-11-18T09:24:00Z'),
  endDate: new Date('2023-11-18T09:24:00Z'),
  status: 'active',
  tasks: [new mongoose.Types.ObjectId()],
};

const mockFoundSprintResponse = {
  _id: mockFoundSprint._id.toString(),
  name: 'Test',
  project: mockFoundSprint.project.toString(),
  startDate: new Date('2023-11-18T09:24:00Z').toISOString(),
  endDate: new Date('2023-11-18T09:24:00Z').toISOString(),
  status: 'active',
  tasks: [mockFoundSprint.tasks[0].toString()],
};

const mockPopulatedSprint: PopulatedDatabaseSprint = {
  _id: mockFoundSprint._id,
  name: 'Test',
  project: mockFoundSprint.project,
  startDate: new Date('2023-11-18T09:24:00Z'),
  endDate: new Date('2023-11-18T09:24:00Z'),
  status: 'active',
  tasks: [
    {
      _id: new mongoose.Types.ObjectId(),
      assignedUser: 'test',
      description: 'test_desc',
      name: 'username',
      sprint: mockFoundSprint._id,
      status: 'active',
      dependentTasks: [new mongoose.Types.ObjectId()],
      prereqTasks: [new mongoose.Types.ObjectId()],
      project: new mongoose.Types.ObjectId(),
      priority: 'high',
      taskPoints: 5,
      relevantQuestions: [new mongoose.Types.ObjectId()],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

describe('Test sprintController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /createSprint', () => {
    it('should return 400 if the CreateSprintRequest is invalid', async () => {
      const response1 = await supertest(app).post('/sprint/createSprint').send({ name: 'Test' });
      expect(response1.status).toBe(400);
    });

    it('should return 500 if there is an error', async () => {
      createSprintSpy.mockResolvedValueOnce({ error: 'Error creating sprint' });

      const response = await supertest(app).post('/sprint/createSprint').send(databaseSprint);
      expect(response.status).toBe(500);
    });

    it('should return the created sprint', async () => {
      createSprintSpy.mockResolvedValue(databaseSprint);
      const response = await supertest(app).post('/sprint/createSprint').send(databaseSprint);
      expect(response.body).toEqual(mockSprintResponse);
      expect(response.status).toBe(201);
      expect(response.body.project.toString()).toBe(mockSprintResponse.project);
    });

    it('should return empty array if tasks are not provided', async () => {
      createSprintSpy.mockResolvedValue(sprintNoTasksResponse);
      const response = await supertest(app).post('/sprint/createSprint').send(sprintNoTasksRequest);
      expect(response.body.tasks).toEqual([]);
      expect(response.status).toBe(201);
    });
  });

  describe('GET /getSprint', () => {
    it('should return 400 if the request is invalid', async () => {
      const response1 = await supertest(app).get('/sprint/getSprint').send({ test: 'Test' });
      expect(response1.status).toBe(400);
    });

    it('should return 500 if there is an error', async () => {
      getSprintSpy.mockResolvedValueOnce({ error: 'Error getting sprint' });
      const response = await supertest(app).get('/sprint/getSprint').send({ sprintId: 'test' });
      expect(response.status).toBe(500);
    });
    it('should return the sprint', async () => {
      // 1) Prepare a valid sprint param
      const sprintId = new mongoose.Types.ObjectId().toString();

      // 2) Mock a fully enriched sprint

      // 3) Mock the service calls
      getSprintSpy.mockResolvedValue(mockFoundSprint);
      populateDocumentSpy.mockResolvedValue(mockPopulatedSprint);

      // 4) Invoke the endpoint
      const response = await supertest(app).get('/sprint/getSprint').send({ sprintId });

      // 5) Assertions
      expect(response.status).toBe(200);
      expect(getSprintSpy).toHaveBeenCalledWith(sprintId);
      expect(populateDocumentSpy).toHaveBeenCalledWith(mockFoundSprint._id.toString(), 'sprint');

      // Convert ObjectIds and Dates for comparison
      expect(response.body).toMatchObject(JSON.parse(JSON.stringify(mockPopulatedSprint)));
    });
  });

  describe('DELETE /deleteUser', () => {
    it('should return the deleted sprint given correct arguments', async () => {
      deleteSprintByIdSpy.mockResolvedValue(mockFoundSprint);

      const sprintId = mockFoundSprint._id.toString();

      const response = await supertest(app).delete(`/sprint/deleteSprint`).send({ sprintId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFoundSprintResponse);
      expect(deleteSprintByIdSpy).toHaveBeenCalledWith(mockFoundSprint._id.toString());
    });

    it('should return 500 if database error while searching username', async () => {
      deleteSprintByIdSpy.mockResolvedValueOnce({ error: 'Error deleting sprint' });

      const response = await supertest(app)
        .delete(`/sprint/deleteSprint`)
        .send({ sprintId: 'test' });

      expect(response.status).toBe(500);
    });
  });

  describe('PUT /startSprint', () => {
    it('should return 400 if the request is invalid', async () => {
      const response = await supertest(app).put('/sprint/startSprint').send({});
      expect(response.status).toBe(400);
      expect(response.text).toBe('Invalid request');
    });

    it('should return 500 if there is an error', async () => {
      updateSprintSpy.mockResolvedValueOnce({ error: 'Test error' });

      const response = await supertest(app).put('/sprint/startSprint').send({ sprintId: 'test' });
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error when updating sprint status: Test error');
    });

    it('should return 500 if updateSprint returns an error object', async () => {
      updateSprintSpy.mockResolvedValue({ error: 'Something failed' });

      const response = await supertest(app)
        .put('/sprint/startSprint')
        .send({ sprintId: 'fake-id' });

      expect(response.status).toBe(500);
      expect(response.text).toBe('Error when updating sprint status: Something failed');
    });

    it('should return 200 if the sprint is started successfully', async () => {
      const sprintId = databaseSprint._id.toString();
      const startedSprint: SprintResponse = {
        ...databaseSprint,
        status: 'In Progress',
      };

      const startedSprintResponse = {
        _id: startedSprint._id.toString(),
        name: startedSprint.name,
        project: startedSprint.project.toString(),
        startDate: startedSprint.startDate.toISOString(),
        endDate: startedSprint.endDate.toISOString(),
        status: 'In Progress',
        tasks: startedSprint.tasks.map(task => task.toString()),
      };

      updateSprintSpy.mockResolvedValue(startedSprint);

      const response = await supertest(app).put('/sprint/startSprint').send({ sprintId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(startedSprintResponse);
    });
  });

  describe('PUT endSprint', () => {
    it('should return 400 if the request is invalid', async () => {
      const response = await supertest(app).put('/sprint/endSprint').send({});
      expect(response.status).toBe(400);
      expect(response.text).toBe('Invalid request');
    });

    it('should return 500 if there is an error', async () => {
      updateSprintSpy.mockResolvedValueOnce({ error: 'Test error' });

      const response = await supertest(app).put('/sprint/endSprint').send({ sprintId: 'test' });
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error when updating sprint status: Test error');
    });

    it('should return 500 if updateSprint returns an error object', async () => {
      updateSprintSpy.mockResolvedValue({ error: 'Something failed' });

      const response = await supertest(app).put('/sprint/endSprint').send({ sprintId: 'fake-id' });

      expect(response.status).toBe(500);
      expect(response.text).toBe('Error when updating sprint status: Something failed');
    });

    it('should return 200 if the sprint is ended successfully', async () => {
      const sprintId = databaseSprint._id.toString();
      const endedSprint: SprintResponse = {
        ...databaseSprint,
        status: 'Completed',
      };

      const endedSprintResponse = {
        _id: endedSprint._id.toString(),
        name: endedSprint.name,
        project: endedSprint.project.toString(),
        startDate: endedSprint.startDate.toISOString(),
        endDate: endedSprint.endDate.toISOString(),
        status: 'Completed',
        tasks: endedSprint.tasks.map(task => task.toString()),
      };

      updateSprintSpy.mockResolvedValue(endedSprint);

      const response = await supertest(app).put('/sprint/endSprint').send({ sprintId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(endedSprintResponse);
    });
  });
  describe('PUT /updateSprint', () => {
    it('should return 400 if the request is invalid', async () => {
      const response = await supertest(app).put('/sprint/updateSprint').send({});
      expect(response.status).toBe(400);
      expect(response.text).toBe('Invalid request');
    });

    it('should return 500 if there is an error', async () => {
      updateSprintSpy.mockResolvedValueOnce({ error: 'Test error' });

      const response = await supertest(app).put('/sprint/updateSprint').send({ sprintId: 'test' });
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error when updating a sprint: Test error');
    });

    it('should return 200 if the sprint is updated successfully', async () => {
      const sprintId = databaseSprint._id.toString();
      const updatedSprint: SprintResponse = {
        ...databaseSprint,
        name: 'Updated Sprint',
        status: 'In Progress',
      };

      const updatedSprintResponse = {
        _id: updatedSprint._id.toString(),
        name: updatedSprint.name,
        project: updatedSprint.project.toString(),
        startDate: updatedSprint.startDate.toISOString(),
        endDate: updatedSprint.endDate.toISOString(),
        status: 'In Progress',
        tasks: updatedSprint.tasks.map(task => task.toString()),
      };

      updateSprintSpy.mockResolvedValue(updatedSprint);

      const response = await supertest(app)
        .put('/sprint/updateSprint')
        .send({ sprintId, name: 'Updated Sprint' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedSprintResponse);
    });
  });
});
