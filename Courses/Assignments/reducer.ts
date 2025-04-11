import { createSlice } from "@reduxjs/toolkit";
// import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  // assignments: assignments,
  assignments: [],
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
    // setAssignments: (state, action) => {
    //     state.assignments = action.payload;
    // },
    setAssignments: (state, { payload: assignments }) => {
      state.assignments = assignments;
  },
    addAssignment: (state, { payload: assignment }) => {
        const newAssignment: any = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description,
        points: assignment.points,
        duedate: assignment.duedate,
        availabledate: assignment.availabledate,
        };
        state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
        state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment }) => {
        state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a) as any;
    },
  },
});
export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;