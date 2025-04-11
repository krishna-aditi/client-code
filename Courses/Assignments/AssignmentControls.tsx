import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import FacultyProtectedRoute from "../../Account/FacultyProtectedRoute";

export default function AssignmentControls(
  { assignmentId, assignmentTitle, deleteAssignment }: {
    assignmentId: string;
    assignmentTitle: string;
    deleteAssignment: (assignmentId: string) => void
  }){
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    deleteAssignment(assignmentId);
    setShowDeleteDialog(false);
  };
  return (
    <div className="float-end d-flex align-items-center ms-2">
      {/* <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)}/> */}
      <FacultyProtectedRoute>
        <FaTrash 
          className="text-danger me-2 mb-1" 
          onClick={handleDeleteClick}
        />
      </FacultyProtectedRoute>
      
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />

      <DeleteDialog
        assignmentId={assignmentId}
        assignmentTitle={assignmentTitle}
        deleteAssignment={handleConfirmDelete}
        onClose={handleCloseDialog}
        show={showDeleteDialog}
      />
    </div>
);}