import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from 'react-icons/fa';

export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <span className="border rounded-pill p-2 me-2 border-black">40% of Total</span>
      <FaPlus className="me-1 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}