import { Modal, Button } from "react-bootstrap";
export default function DeleteDialog({ assignmentId, assignmentTitle, deleteAssignment, onClose, show }: { 
    assignmentId: string; 
    assignmentTitle: string; 
    deleteAssignment: (assignmentId: string) => void; 
    onClose: () => void; 
    show: boolean }){
    return (
        <Modal id="wd-delete-assignment-dialog" show={show} onHide={onClose} centered>
            <Modal.Body>
                <Modal.Title  className="fs-5">
                    Are you sure you want to delete <strong>{assignmentTitle}</strong>? 
                </Modal.Title>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    No
                </Button>
                <Button variant="danger" onClick={() => deleteAssignment(assignmentId)}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}