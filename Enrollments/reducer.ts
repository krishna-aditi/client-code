import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    enrollments: [],
    showEnrolledOnly: true
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
    setEnrollments: (state, action) => { 
        state.enrollments = action.payload;
    }, 
    setShowEnrolledOnly: (state, action) => {
        state.showEnrolledOnly = action.payload;
    },
    addEnrollment: (state, { payload: enrollment }) => {
        const newEnrollment: any = {
        _id: uuidv4(),
        user: enrollment.user,
        course: enrollment.course,
        };
        state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    // deleteEnrollment: (state, { payload: enrollment }) => {
    //     state.enrollments = state.enrollments.filter(
    //         (e: any) => e.user !== enrollment.user && e.course !== enrollment.course);
    // }
    deleteEnrollment: (state, { payload: enrollment }) => {
        // Fix the deletion logic - only filter out the exact match
        state.enrollments = state.enrollments.filter(
            (e: any) => !(e.user === enrollment.user && e.course === enrollment.course)
        );
    }
  },
});
export const { setEnrollments, setShowEnrolledOnly, addEnrollment, deleteEnrollment } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;