import { ObjectId } from 'mongodb';
import {
  DatabaseAnswer,
  DatabaseComment,
  DatabaseProject,
  DatabaseQuestion,
  DatabaseSprint,
  DatabaseTag,
  DatabaseTask,
  PopulatedDatabaseQuestion,
  Project,
  SafeDatabaseUser,
  User,
  PopulatedDatabaseProject,
} from '../types/types';
import { T1_DESC, T2_DESC, T3_DESC } from '../data/posts_strings';

export const tag1: DatabaseTag = {
  _id: new ObjectId('507f191e810c19729de860ea'),
  name: 'react',
  description: T1_DESC,
};

export const tag2: DatabaseTag = {
  _id: new ObjectId('65e9a5c2b26199dbcc3e6dc8'),
  name: 'javascript',
  description: T2_DESC,
};

export const tag3: DatabaseTag = {
  _id: new ObjectId('65e9b4b1766fca9451cba653'),
  name: 'android',
  description: T3_DESC,
};

export const com1: DatabaseComment = {
  _id: new ObjectId('65e9b58910afe6e94fc6e6de'),
  text: 'com1',
  commentBy: 'com_by1',
  commentDateTime: new Date('2023-11-18T09:25:00'),
};

export const ans1: DatabaseAnswer = {
  _id: new ObjectId('65e9b58910afe6e94fc6e6dc'),
  text: 'ans1',
  ansBy: 'ansBy1',
  ansDateTime: new Date('2023-11-18T09:24:00'),
  comments: [],
};

export const ans2: DatabaseAnswer = {
  _id: new ObjectId('65e9b58910afe6e94fc6e6dd'),
  text: 'ans2',
  ansBy: 'ansBy2',
  ansDateTime: new Date('2023-11-20T09:24:00'),
  comments: [],
};

export const ans3: DatabaseAnswer = {
  _id: new ObjectId('65e9b58910afe6e94fc6e6de'),
  text: 'ans3',
  ansBy: 'ansBy3',
  ansDateTime: new Date('2023-11-19T09:24:00'),
  comments: [],
};

export const ans4: DatabaseAnswer = {
  _id: new ObjectId('65e9b58910afe6e94fc6e6df'),
  text: 'ans4',
  ansBy: 'ansBy4',
  ansDateTime: new Date('2023-11-19T09:24:00'),
  comments: [],
};

export const QUESTIONS: DatabaseQuestion[] = [
  {
    _id: new ObjectId('65e9b58910afe6e94fc6e6dc'),
    title: 'Quick question about storage on android',
    text: 'I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains',
    tags: [tag3._id, tag2._id],
    answers: [ans1._id, ans2._id],
    askedBy: 'q_by1',
    askDateTime: new Date('2023-11-16T09:24:00'),
    views: ['question1_user', 'question2_user'],
    upVotes: [],
    downVotes: [],
    comments: [],
  },
  {
    _id: new ObjectId('65e9b5a995b6c7045a30d823'),
    title: 'Object storage for a web application',
    text: 'I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.',
    tags: [tag1._id, tag2._id],
    answers: [ans1._id, ans2._id, ans3._id],
    askedBy: 'q_by2',
    askDateTime: new Date('2023-11-17T09:24:00'),
    views: ['question2_user'],
    upVotes: [],
    downVotes: [],
    comments: [],
  },
  {
    _id: new ObjectId('65e9b9b44c052f0a08ecade0'),
    title: 'Is there a language to write programmes by pictures?',
    text: 'Does something like that exist?',
    tags: [],
    answers: [],
    askedBy: 'q_by3',
    askDateTime: new Date('2023-11-19T09:24:00'),
    views: ['question1_user', 'question2_user', 'question3_user', 'question4_user'],
    upVotes: [],
    downVotes: [],
    comments: [],
  },
  {
    _id: new ObjectId('65e9b716ff0e892116b2de09'),
    title: 'Unanswered Question #2',
    text: 'Does something like that exist?',
    tags: [],
    answers: [],
    askedBy: 'q_by4',
    askDateTime: new Date('2023-11-20T09:24:00'),
    views: [],
    upVotes: [],
    downVotes: [],
    comments: [],
  },
];

export const POPULATED_QUESTIONS: PopulatedDatabaseQuestion[] = [
  {
    _id: new ObjectId('65e9b58910afe6e94fc6e6dc'),
    title: 'Quick question about storage on android',
    text: 'I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains',
    tags: [tag3, tag2],
    answers: [
      { ...ans1, comments: [] },
      { ...ans2, comments: [] },
    ],
    askedBy: 'q_by1',
    askDateTime: new Date('2023-11-16T09:24:00'),
    views: ['question1_user', 'question2_user'],
    upVotes: [],
    downVotes: [],
    comments: [],
  },
  {
    _id: new ObjectId('65e9b5a995b6c7045a30d823'),
    title: 'Object storage for a web application',
    text: 'I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.',
    tags: [tag1, tag2],
    answers: [
      { ...ans1, comments: [] },
      { ...ans2, comments: [] },
      { ...ans3, comments: [] },
    ],
    askedBy: 'q_by2',
    askDateTime: new Date('2023-11-17T09:24:00'),
    views: ['question2_user'],
    upVotes: [],
    downVotes: [],
    comments: [],
  },
  {
    _id: new ObjectId('65e9b9b44c052f0a08ecade0'),
    title: 'Is there a language to write programmes by pictures?',
    text: 'Does something like that exist?',
    tags: [],
    answers: [],
    askedBy: 'q_by3',
    askDateTime: new Date('2023-11-19T09:24:00'),
    views: ['question1_user', 'question2_user', 'question3_user', 'question4_user'],
    upVotes: [],
    downVotes: [],
    comments: [],
  },
  {
    _id: new ObjectId('65e9b716ff0e892116b2de09'),
    title: 'Unanswered Question #2',
    text: 'Does something like that exist?',
    tags: [],
    answers: [],
    askedBy: 'q_by4',
    askDateTime: new Date('2023-11-20T09:24:00'),
    views: [],
    upVotes: [],
    downVotes: [],
    comments: [],
  },
];

export const user: User = {
  username: 'user1',
  password: 'password',
  dateJoined: new Date('2024-12-03'),
};

export const safeUser: SafeDatabaseUser = {
  _id: new ObjectId(),
  username: 'user1',
  dateJoined: new Date('2024-12-03'),
};

export const project: Project = {
  assignedUsers: ['user1', 'user2'],
  description: 'A project to test the project model.',
  name: 'Test Project',
  sprints: [new ObjectId('65e9b58910afe6e94fc6e6dc')],
  backlogTasks: [],
};

export const databaseProject: DatabaseProject = {
  _id: new ObjectId('65e9b58910afe6e94fc6e6dc'),
  ...project,
};

export const databaseSprint: DatabaseSprint = {
  _id: databaseProject.sprints[0],
  name: 'Test',
  project: databaseProject._id,
  startDate: new Date('2023-11-18T09:24:00'),
  endDate: new Date('2023-11-18T09:24:00'),
  status: 'active',
  tasks: [new ObjectId('15e9b58310afe6e94fc6e6dc'), new ObjectId('25e9b58910afe7e94fc6e6dc')],
};

export const databaseTask: DatabaseTask = {
  _id: databaseSprint.tasks[0],
  assignedUser: 'user123',
  description: 'Complete the sprint task.',
  name: 'Task 1',
  sprint: databaseSprint._id,
  status: 'Done',
  dependentTasks: [],
  prereqTasks: [],
  project: new ObjectId('15e9b58310afe6e94fc6e6dc'),
  priority: 'low',
  taskPoints: 5,
  relevantQuestions: [],
  createdAt: new Date('2023-11-18T09:24:00'),
  updatedAt: new Date('2023-11-18T09:24:00'),
};

export const databaseTaskWithPrereq: DatabaseTask = {
  _id: databaseSprint.tasks[1],
  assignedUser: 'user123',
  description: 'Complete the sprint task.',
  name: 'Task 2',
  sprint: databaseSprint._id,
  status: 'Done',
  dependentTasks: [],
  prereqTasks: [new ObjectId('35e9b58310afe6e94fc6e6dc')],
  project: databaseProject._id,
  priority: 'low',
  taskPoints: 5,
  relevantQuestions: [],
  createdAt: new Date('2023-11-18T09:24:00'),
  updatedAt: new Date('2023-11-18T09:24:00'),
};

export const databaseTaskWithDependency: DatabaseTask = {
  _id: new ObjectId('35e9b58310afe6e94fc6e6dc'),
  assignedUser: 'owner',
  description: 'Main task',
  name: 'Main Task',
  sprint: new ObjectId('47e9b58310afe6e94fc2e9dc'),
  status: 'in progress',
  dependentTasks: [databaseTaskWithPrereq._id],
  prereqTasks: [],
  project: new ObjectId('15e9b58310afe6e94fc6e6dc'),
  priority: 'low',
  taskPoints: 8,
  relevantQuestions: [],
  createdAt: new Date('2023-11-18T09:24:00'),
  updatedAt: new Date('2023-11-18T09:24:00'),
};

export const databaseTaskWithAllFields: DatabaseTask = {
  _id: new ObjectId('45e9b58310afe6e94fc6e6dc'),
  assignedUser: 'owner',
  description: 'Main task',
  name: 'Main Task',
  sprint: new ObjectId('47e9b58310afe6e94fc2e9dc'),
  status: 'active',
  dependentTasks: [new ObjectId('65e9b58910afe6e94fc6e6dd')],
  prereqTasks: [new ObjectId('65e9b58910afe6e94fc6e6de')],
  project: new ObjectId('15e9b58310afe6e94fc6e6dc'),
  priority: 'high',
  taskPoints: 8,
  relevantQuestions: [new ObjectId('65e9b58910afe6e94fc6e6df')],
  createdAt: new Date('2023-11-18T09:24:00'),
  updatedAt: new Date('2023-11-18T09:24:00'),
};

export const databaseProjectwithAllFields: PopulatedDatabaseProject = {
  ...databaseProject,
  sprints: [
    {
      _id: databaseSprint._id,
      name: databaseSprint.name,
      project: databaseSprint.project,
      startDate: databaseSprint.startDate,
      endDate: databaseSprint.endDate,
      status: databaseSprint.status,
      tasks: [
        {
          _id: databaseTask._id,
          assignedUser: databaseTask.assignedUser,
          description: databaseTask.description,
          name: databaseTask.name,
          sprint: databaseSprint._id,
          status: databaseTask.status,
          dependentTasks: [],
          prereqTasks: [
            {
              _id: databaseTaskWithPrereq._id,
              assignedUser: databaseTaskWithPrereq.assignedUser,
              description: databaseTaskWithPrereq.description,
              name: databaseTaskWithPrereq.name,
              sprint: databaseSprint._id,
              status: databaseTaskWithPrereq.status,
              dependentTasks: [],
              prereqTasks: [new ObjectId('35e9b58310afe6e94fc6e6dc')],
              project: databaseSprint.project,
              priority: databaseTaskWithPrereq.priority,
              taskPoints: databaseTaskWithPrereq.taskPoints,
              relevantQuestions: [],
              createdAt: databaseTaskWithPrereq.createdAt,
              updatedAt: databaseTaskWithPrereq.updatedAt,
            },
          ],
          project: databaseSprint.project,
          priority: databaseTask.priority,
          taskPoints: databaseTask.taskPoints,
          relevantQuestions: [
            {
              _id: new ObjectId('65e9b58910afe6e94fc6e6df'),
              title: 'Quick question about storage on android',
              text: 'test_text',
              tags: [tag3._id],
              answers: [ans1._id],
              askedBy: 'q_by1',
              askDateTime: new Date('2023-11-16T09:24:00'),
              views: ['question1_user', 'question2_user'],
              upVotes: [],
              downVotes: [],
              comments: [],
            },
          ],
          createdAt: databaseTask.createdAt,
          updatedAt: databaseTask.updatedAt,
        },
      ],
    },
  ],
  backlogTasks: [],
};
