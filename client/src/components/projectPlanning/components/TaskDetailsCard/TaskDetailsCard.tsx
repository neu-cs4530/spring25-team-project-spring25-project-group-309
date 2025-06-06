/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, ListGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { PopulatedDatabaseProject } from '@fake-stack-overflow/shared';
import { NavLink } from 'react-router-dom';
import useQuestionPage from '../../../../hooks/useQuestionPage';
import { DatabaseClientTask } from '../../../../types/clientTypes/task';

export default function TaskDetailsCard({
  handleShowDeleteTaskModal,
  handleShowTaskUpdateModal,
  setTaskForModal,
  isEditing,
  setIsEditing,
}: {
  handleShowDeleteTaskModal?: () => void;
  handleShowTaskUpdateModal?: () => void;
  setTaskForModal?: (task: DatabaseClientTask) => void;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
}) {
  const { selectedTask }: { selectedTask: DatabaseClientTask } = useSelector(
    (state: any) => state.selectTaskReducer,
  );
  const { project }: { project: PopulatedDatabaseProject } = useSelector(
    (state: any) => state.projectReducer,
  );
  const { qlist } = useQuestionPage();

  if (!selectedTask) return null;

  return (
    <Card key={selectedTask._id.toString()}>
      <Card.Body>
        <Card.Title className='fs-4'>
          {selectedTask.name}
          <span className='float-end'>
            {handleShowTaskUpdateModal && (
              <FaPencil className='text-primary me-3' onClick={handleShowTaskUpdateModal} />
            )}

            {!isEditing && setIsEditing && (
              <FaPencil className='text-primary me-3' onClick={() => setIsEditing(true)} />
            )}

            {setTaskForModal && handleShowDeleteTaskModal && (
              <FaTrash
                className='text-danger me-1'
                onClick={() => {
                  setTaskForModal({ ...selectedTask });
                  handleShowDeleteTaskModal();
                }}
              />
            )}
          </span>
        </Card.Title>

        <Card.Subtitle className='mb-2 text-muted'>
          {project.sprints.find(s => s._id.toString() === selectedTask.sprint?.toString())?.name ||
            'Backlog'}
        </Card.Subtitle>

        <Card.Subtitle className='mb-2 text-muted'>Priority: {selectedTask.priority}</Card.Subtitle>
        <Card.Subtitle className='mb-2 text-muted'>
          Assigned To: {selectedTask.assignedUser}
        </Card.Subtitle>
        <Card.Subtitle className='mb-2 text-muted'>Status: {selectedTask.status}</Card.Subtitle>
        <Card.Subtitle className='mb-2 text-muted'>
          Task Points: {selectedTask.taskPoints}
        </Card.Subtitle>

        <Card.Text>{selectedTask.description}</Card.Text>
      </Card.Body>

      {selectedTask.relevantQuestions?.length > 0 && (
        <Card.Footer>
          <span>Relevant Questions:</span>
          <ListGroup variant='flush' className='mt-2'>
            {selectedTask.relevantQuestions.map((question: any) => (
              <ListGroup.Item key={question._id} className='bg-transparent p-1'>
                <NavLink to={`/question/${question._id}`}>
                  {qlist.find((q: any) => q._id === question._id)?.title || 'Question not found'}
                </NavLink>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Footer>
      )}

      {selectedTask.dependentTasks?.length > 0 && (
        <Card.Footer>
          <span>Task Dependencies:</span>
          <ListGroup variant='flush' className='mt-2'>
            {selectedTask.dependentTasks.map((dependentTask: any) => (
              <ListGroup.Item key={dependentTask._id} className='bg-transparent p-1'>
                {[...project.sprints.flatMap(sprint => sprint.tasks), ...project.backlogTasks].find(
                  (task: any) =>
                    task._id.toString() ===
                    (dependentTask._id?.toString() || dependentTask.toString()),
                )?.name || 'Task not found'}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Footer>
      )}

      {selectedTask.prereqTasks?.length > 0 && (
        <Card.Footer>
          <span>Task Prerequisites:</span>
          <ListGroup variant='flush' className='mt-2'>
            {selectedTask.prereqTasks.map((preReqTask: any) => (
              <ListGroup.Item key={preReqTask._id} className='bg-transparent p-1'>
                {[...project.sprints.flatMap(sprint => sprint.tasks), ...project.backlogTasks].find(
                  (task: any) =>
                    task._id.toString() === (preReqTask._id?.toString() || preReqTask.toString()),
                )?.name || 'Task not found'}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Footer>
      )}
    </Card>
  );
}
