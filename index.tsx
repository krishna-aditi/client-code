import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import KambazNavigation from "./Navigation";
// import * as db from "./Database";
import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useSelector } from "react-redux";

export default function Kambaz() {
    // const [courses, setCourses] = useState<any[]>([db.courses]);
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // Enrolling state
    const [enrolling, setEnrolling] = useState<boolean>(false);

    // Find enrolled courses for current user 
    // const findCoursesForUser = async () => {
    //   try {
    //     if (currentUser) {
    //       const courses = await userClient.findCoursesForUser(currentUser._id);
    //       setCourses(courses);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    
    const findCoursesForUser = async () => {
      try {
        if (currentUser) {
          const fetchedCourses = await userClient.findCoursesForUser(currentUser._id);
          
          // Create a new array with enrolled set to true
          // Using explicit type annotation to fix the error
          const enrolledCourses = fetchedCourses.map((course: any) => ({
            ...course,
            enrolled: true
          }));
          
          // Now set the courses state with the new array
          setCourses(enrolledCourses);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
      if (!currentUser) return;
      
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
      
      setCourses(
        courses.map((course) => {
          if (course._id === courseId) {
            return { ...course, enrolled: enrolled };
          } else {
            return course;
          }
        })
      );
    };

    const fetchCourses = async () => {
      try {
        if (currentUser) {
          const allCourses = await courseClient.fetchAllCourses();
          const enrolledCourses = await userClient.findCoursesForUser(
            currentUser._id
          );
          
          // Add defensive checks
          const validEnrolledCourses = enrolledCourses.filter((c: any) => c && c._id);
          
          const courses = allCourses.map((course: any) => {
            if (course && validEnrolledCourses.some((c: any) => c._id === course._id)) {
              return { ...course, enrolled: true };
            } else {
              return course;
            }
          });
          setCourses(courses);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // const fetchCourses = async () => {
    //   try {
    //     // const courses = await userClient.findMyCourses();
    //     const courses = await courseClient.fetchAllCourses();
    //     setCourses(courses);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // Fetch courses from server
    // useEffect(() => {
    //   fetchCourses();
    // }, [currentUser]);
    useEffect(() => {
      if (currentUser) {
        if (enrolling) {
          fetchCourses();
        } else {
          findCoursesForUser();
        }
      }
    }, [currentUser, enrolling]);

    const [course, setCourse] = useState<any>({
      _id: "1234", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });

    // Add course
    const addNewCourse = async () => {
      // const newCourse = await userClient.createCourse(course);
      const newCourse = await courseClient.createCourse(course);
      setCourses([...courses, { ...course,  newCourse}]);
    };
    
    // Delete course
    const deleteCourse = async (courseId: string) => {
      try {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course && course._id !== courseId));
        console.log(status);
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    };

    // Update course
    const updateCourse = async () => {
      await courseClient.updateCourse(course);
      setCourses(courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      );
    };
  
    return (
      <Session>
        <div id="wd-kambaz">
            <KambazNavigation />
            <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Account" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="/Dashboard" element={ <ProtectedRoute><Dashboard courses={courses}
                        course={course}
                        setCourse={setCourse}
                        addNewCourse={addNewCourse}
                        deleteCourse={deleteCourse}
                        updateCourse={updateCourse}
                        enrolling={enrolling} 
                        setEnrolling={setEnrolling}
                        updateEnrollment={updateEnrollment}/>
                        </ProtectedRoute>} />
                    <Route path="/Courses/:cid/*" element={ <ProtectedRoute><Courses courses={courses}/> </ProtectedRoute> } />
                    <Route path="/Calendar" element={<h1>Calendar</h1>} />
                    <Route path="/Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
      </Session>
  );
}
  