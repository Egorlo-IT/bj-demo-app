import {
  SetStateAction,
  useContext,
  useEffect,
  useState,
  MouseEvent,
} from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Pagination from '@mui/material/Pagination';

import { AppContext } from '../../context/Context';
import { Action, Colors, CustomStyles } from '../../utils/Utils';
import fetchCreateTask from '../../fetch/fetchCreateTask';
import fetchTasksAll from '../../fetch/fetchTasksAll';
import { Card, Col, Container, Row } from 'react-bootstrap';
import fetchEditTask from '../../fetch/fetchEditTask';
import fetchAcceptTask from '../../fetch/fetchAcceptTask';
import usePagination from '../../hooks/usePagination';

import './Tasks.scss';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Minimum 2 letters')
    .max(20, 'Maximum 20 letters')
    .required('Field required'),
  email: Yup.string().email('Email is not valid').required('Field required'),
  description: Yup.string()
    .min(20, 'Minimum 20 letters')
    .max(500, 'Maximum 500 letters')
    .required('Field required'),
});

interface DataTasksList {
  name: string;
  email: string;
  description: string;
  role: string;
}

const Tasks = () => {
  Modal.setAppElement('*');
  const context = useContext(AppContext);

  const ITEMS_PER_PAGE = 3;

  const [isEditMode, setIsEditMode] = useState(false);
  const [cardIDToEdit, setCardIDToEdit] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listTask, setListTasks] = useState([] as any);
  const [dataTasksListFilter, setDataTasksListFilter] = useState<
    DataTasksList[]
  >([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [customStyles] = useState(CustomStyles);

  const { currentPage, getCurrentData, setCurrentPage, pageCount } =
    usePagination(dataTasksListFilter, ITEMS_PER_PAGE);
  const onPageChange = (event: unknown, value: SetStateAction<number>) =>
    setCurrentPage(value);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (
    Action: { mess: string; color: string },
    error?: string
  ) => {
    customStyles.content.backgroundColor = Action.color;
    setMessage(Action.mess + (error !== '' ? error : ''));
    setIsOpen(true);
  };

  const taskAccept = async (e: MouseEvent, id: string) => {
    e.preventDefault();
    await fetchAcceptTask(id);
    await fetchTasksAll().then((result) => {
      if (result?.tasks) {
        setListTasks(result.tasks);
        setDataTasksListFilter(result.tasks);
      }
      document.querySelectorAll('.btn-card').forEach((item) => {
        item.classList.remove('active');
      });
    });
  };

  const taskEdit = (id: string) => {
    setIsEditMode(true);
    setCardIDToEdit(id);
  };

  const taskSave = (id: string) => {
    setIsEditMode(false);
    setCardIDToEdit('');
  };

  const getSortTask = async (e: MouseEvent, name: string) => {
    document.querySelectorAll('.btn-card').forEach((item) => {
      item.classList.remove('active');
    });
    const target = e.target as Element;
    target.classList.toggle('active');
    let dataSort;
    switch (name) {
      case 'Name': {
        if (target.classList.contains('active')) {
          dataSort = [...dataTasksListFilter].sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
          setDataTasksListFilter(dataSort);
        } else {
          dataSort = [...dataTasksListFilter].sort((a, b) =>
            a.name > b.name ? -1 : 1
          );
          setDataTasksListFilter(dataSort);
        }

        return;
      }
      case 'Email': {
        if (target.classList.contains('active')) {
          dataSort = [...dataTasksListFilter].sort((a, b) =>
            a.email > b.email ? 1 : -1
          );
          setDataTasksListFilter(dataSort);
        } else {
          dataSort = [...dataTasksListFilter].sort((a, b) =>
            a.email > b.email ? -1 : 1
          );
          setDataTasksListFilter(dataSort);
        }
        return;
      }

      case 'Description': {
        if (target.classList.contains('active')) {
          dataSort = [...dataTasksListFilter].sort((a, b) =>
            a.description > b.description ? 1 : -1
          );
          setDataTasksListFilter(dataSort);
        } else {
          dataSort = [...dataTasksListFilter].sort((a, b) =>
            a.description > b.description ? -1 : 1
          );
          setDataTasksListFilter(dataSort);
        }
        return;
      }

      default:
        return;
    }
  };

  useEffect(() => {
    fetchTasksAll().then((result) => {
      if (result?.tasks) {
        setListTasks(result.tasks);
        setDataTasksListFilter(result.tasks);
      }
    });
    document.querySelectorAll('.btn-card').forEach((item) => {
      item.classList.remove('active');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tasks">
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h5
          className="m-0 p-4"
          style={{
            cursor: 'none',
            color: Colors.BLACK,
            fontWeight: '300',
          }}
        >
          {message}
        </h5>
        <i
          className="fa-solid fa-xmark me-2 text-end mt-2 fixed-top"
          onClick={closeModal}
          role="button"
        ></i>
      </Modal>
      <h1>Tasks</h1>
      <hr />
      <div className="group-sort-task mb-4">
        <div className="me-2 fw-bold">Sorting: </div>

        <button
          onClick={(e) => getSortTask(e, 'Name')}
          className="btn btn-card btn-lg me-1"
        >
          Name
        </button>
        <button
          onClick={(e) => getSortTask(e, 'Email')}
          className="btn btn-card btn-lg me-1"
        >
          Email
        </button>
        <button
          onClick={(e) => getSortTask(e, 'Description')}
          className="btn btn-card btn-lg"
        >
          Description
        </button>
      </div>
      <Container>
        <Row>
          {dataTasksListFilter.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getCurrentData().map((item: any) => (
              <Col
                xs={12}
                md={4}
                lg={3}
                key={item.id}
                className="mb-3 me-3 item"
              >
                {item.status === 'underway' ? (
                  <div className="execution">In execution</div>
                ) : (
                  <div className="fulfilled">Fulfilled</div>
                )}
                {item.edited === 'yes' && (
                  <div className="edited">Edited by admin</div>
                )}

                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    description: '',
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={async (values) => {
                    setIsEditMode(false);
                    setCardIDToEdit('');
                    await fetchEditTask(values, cardIDToEdit);
                    await fetchTasksAll().then((result) => {
                      if (result?.tasks) {
                        setListTasks(result.tasks);
                        setDataTasksListFilter(result.tasks);
                      }
                    });
                    document.querySelectorAll('.btn-card').forEach((item) => {
                      item.classList.remove('active');
                    });
                  }}
                >
                  {({ errors, touched }) => (
                    <Card>
                      <Card.Body>
                        <Form className="form">
                          {isEditMode && cardIDToEdit === item.id ? (
                            <>
                              <Field className="field" name="name" />

                              {errors.name && touched.name ? (
                                <div className="error">{errors.name}</div>
                              ) : null}
                              <Field
                                className="field"
                                name="email"
                                type="email"
                              />
                              {errors.email && touched.email ? (
                                <div className="error">{errors.email}</div>
                              ) : null}
                              <Field
                                className="field"
                                as="textarea"
                                rows={5}
                                name="description"
                              />
                              {errors.description && touched.description ? (
                                <div className="error">
                                  {errors.description}
                                </div>
                              ) : null}
                            </>
                          ) : (
                            <>
                              <Card.Title>{item.name}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                {item.email}
                              </Card.Subtitle>
                              <Card.Text>{item.description}</Card.Text>
                            </>
                          )}

                          {context.authenticated &&
                            context.user.role === 'admin' && (
                              <div className="group">
                                {isEditMode && cardIDToEdit === item.id ? (
                                  <>
                                    <button
                                      type="submit"
                                      className="btn btn-card btn-lg mt-2"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={(e) => taskSave(item.id)}
                                      className="btn btn-card btn-lg mt-2"
                                    >
                                      Close
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={(e) => taskEdit(item.id)}
                                    className="btn btn-card btn-lg mt-2"
                                  >
                                    Edit
                                  </button>
                                )}
                                <button
                                  onClick={(e) => taskAccept(e, item.id)}
                                  className="btn btn-card btn-lg mt-2"
                                >
                                  Accept
                                </button>
                              </div>
                            )}
                        </Form>
                      </Card.Body>
                    </Card>
                  )}
                </Formik>
              </Col>
            ))
          ) : (
            <div>No tasks</div>
          )}
        </Row>

        {dataTasksListFilter.length >= ITEMS_PER_PAGE && (
          <Pagination
            count={pageCount}
            onChange={onPageChange}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            className="mt-3 pagination"
          />
        )}
      </Container>

      <hr />
      <h3>Create a task</h3>
      <Formik
        initialValues={{
          name: '',
          email: '',
          description: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          fetchCreateTask(values).then((result) => {
            if (result) {
              openModal(Action.SUCCESS, 'Вы успешно добавили задачу');
              fetchTasksAll().then((result) => {
                if (result?.tasks) {
                  setListTasks(result.tasks);
                  setDataTasksListFilter(result.tasks);
                }
              });
              document.querySelectorAll('.btn-card').forEach((item) => {
                item.classList.remove('active');
              });
            }
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <Field className="field" name="name" />
            {errors.name && touched.name ? (
              <div className="error">{errors.name}</div>
            ) : null}
            <Field className="field" name="email" type="email" />
            {errors.email && touched.email ? (
              <div className="error">{errors.email}</div>
            ) : null}
            <Field
              className="field"
              as="textarea"
              rows={5}
              name="description"
            />
            {errors.description && touched.description ? (
              <div className="error">{errors.description}</div>
            ) : null}
            <button className="btn btn-lg btn-blue mt-2" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Tasks;
