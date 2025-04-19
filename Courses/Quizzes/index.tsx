import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { deleteQuiz, setQuizzes, togglePublishQuiz } from './reducer';

import * as client from "./client";
import { QuizQuestion } from "./QuizQuestions/questionTypes";
import { SubmissionState } from "./QuizPreview/QuizReview/QuizSubmissionType";
import { Quiz, QuizRootState } from './types';
import {createSelector} from "@reduxjs/toolkit";

// quizClient from client.ts
import * as quizClient from "../client";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
  showAllCourses: boolean;
}

interface RootState {
  modulesReducer: any;
  accountReducer: any;
  assignmentsReducer: any;
  enrollmentReducer: EnrollmentState;
  quizzesReducer: {
    quizzes: Quiz[];
  };
  questionsReducer: {
    questions: QuizQuestion[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  submissionsReducer: SubmissionState;
}

export default function QuizList() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state: QuizRootState) => state.accountReducer);
  
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    quizId: '',
    quizTitle: ''
  });

  const { submissions } = useSelector((state: RootState) => 
    state.submissionsReducer
  );

  // const fetchQuizzesForCourse = async () => {
  //   const quizzes = await quizClient.findModulesForCourse(cid!);
  //   dispatch(setQuizzes(quizzes));
  // };
  // useEffect(() => {
  //   fetchQuizzesForCourse();
  // }, [cid]);
 
  const selectFilteredQuizzes = createSelector(
      [(state) => state.quizzesReducer.quizzes,
        (_, courseId) => courseId,
        (_, __, searchTerm) => searchTerm],
      (quizzes, courseId, searchTerm) =>
          quizzes.filter(quiz =>
              quiz.course === courseId &&
              quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
  );

// Then in your component:
  const quizzes = useSelector(
      (state) => selectFilteredQuizzes(state, cid, searchTerm)
  );

  // const quizzes = useSelector((state: QuizRootState) =>
  //   state.quizzesReducer.quizzes.filter(quiz => {
  //     const baseFilter = quiz.course === cid &&
  //       quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
  //     return baseFilter;
  //   })
  // );

  // const quizzes = useSelector((state: QuizRootState) =>
  //     selectFilteredQuizzes(state, cid, searchTerm)
  // );

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const fetchedQuizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(fetchedQuizzes));
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, [cid, dispatch]);

  const handleDeleteClick = (quizId: string, title: string) => {
    setDeleteDialog({
      isOpen: true,
      quizId,
      quizTitle: title
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await client.deleteQuiz(deleteDialog.quizId);
      dispatch(deleteQuiz(deleteDialog.quizId));
      setDeleteDialog({
        isOpen: false,
        quizId: '',
        quizTitle: ''
      });
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const [forceUpdate, setForceUpdate] = useState(false);

  const handlePublishToggle = async (quizId) => {
    try {
      await client.publishQuiz(quizId);
      dispatch(togglePublishQuiz(quizId));
      setForceUpdate(prev => !prev); // Force component re-render
    } catch (error) {
      console.error("Error toggling quiz publish status:", error);
    }
  };

  const formatDate = (date: Date | string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',  // Added year
      month: 'short',
      day: 'numeric', 
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
   };

  const getAvailabilityStatus = (quiz: Quiz): string => {
    const now = new Date();
    const availableFrom = new Date(quiz.availableFromDate);
    const availableUntil = new Date(quiz.availableUntilDate);
  
    if (!quiz.availableFromDate || !quiz.availableUntilDate) return 'No dates set';
  
    if (now > availableUntil) {
      return "Closed";
    } else if (now >= availableFrom && now <= availableUntil) {
      return "Available";
    } else {
      return `Not available until ${formatDate(quiz.availableFromDate)}`;
    }
  };

  const getStudentScore = (quizId: string) => {
    if (currentUser.role !== 'STUDENT') return undefined;
    
    const submission = submissions.find(s => s.quizId === quizId);
    return submission ? submission.score : undefined;
  };

  return (
    <div className="container-fluid" style={{ width: '100%', margin: '0 auto' }}>
      {/* Header */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div className="input-group" style={{ width: '250px' }}>
          <input 
            type="text"
            className="form-control"
            placeholder="Search for Quiz"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
        </div>
        
        {currentUser.role !== 'STUDENT' && (
          <div className="d-flex gap-2">
            <Link 
              to={`/Kambaz/Courses/${cid}/Quizzes/new`}
              className="btn btn-danger"
            >
              + Quiz
            </Link>
          </div>
        )}
      </div>
  
      {/* Quizzes Section */}
      <div className="border rounded bg-light w-100">
        <div className="p-3 border-bottom">
          <h5 className="m-0">▾ Assignment Quizzes</h5>
        </div>
        
        <div className="list-group list-group-flush">
          {quizzes.map((quiz) => (
            <div 
              key={quiz._id} 
              className="list-group-item py-3"
              style={{ borderLeft: '4px solid #00af32' }}
            >
              <div className="d-flex gap-3">
                <div className="p-1">
                  <RiQuestionAnswerLine className="text-success fs-4" />
                </div>
                
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Link 
                      to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/details`}
                      className="text-decoration-none text-dark fs-5 fw-semibold"
                    >
                      {quiz.title}
                    </Link>
                    <div className="d-flex align-items-center" style={{gap: '15px'}}>
                      <span className="fs-5"
                            key={`status-${quiz._id}-${quiz.published}-${forceUpdate}`}>
  {!quiz.published 
      ? '🚫'
      : '✅'}
</span>
                      {currentUser.role !== 'STUDENT' && (
                          <div className="dropdown">
                            <button
                                className="btn btn-light btn-sm"
                                data-bs-toggle="dropdown"
                            >
                              <BsThreeDotsVertical/>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <Link
                                    to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                                    className="dropdown-item"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleDeleteClick(quiz._id, quiz.title)}
                                >
                                  Delete
                                </button>
                              </li>
                              <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handlePublishToggle(quiz._id)}
                                >
                                  {quiz.published ? 'Unpublish' : 'Publish'}
                                </button>
                              </li>
                            </ul>
                          </div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex text-secondary flex-wrap" style={{gap: '15px'}}>
                    <span>{getAvailabilityStatus(quiz)}</span>
                    <span>|</span>
                    <span>Due {formatDate(quiz.dueDate)}</span>
                    <span>|</span>
                    {currentUser.role === 'STUDENT' ? (
                      <span>
                        Score: {getStudentScore(quiz._id) !== undefined 
                          ? `${getStudentScore(quiz._id)}/${quiz.points}` 
                          : 'Not submitted'}
                      </span>
                    ) : (
                      <span>{quiz.points} pts</span>
                    )}
                    <span>|</span>
                    <span>{quiz.numberOfQuestions} Questions</span>
                  </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  
      {/* Delete Confirmation Modal */}
      {deleteDialog.isOpen && currentUser.role !== 'STUDENT' && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Quiz</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setDeleteDialog({
                    isOpen: false,
                    quizId: '',
                    quizTitle: ''
                  })}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete the quiz "{deleteDialog.quizTitle}"?
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setDeleteDialog({
                    isOpen: false,
                    quizId: '',
                    quizTitle: ''
                  })}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}