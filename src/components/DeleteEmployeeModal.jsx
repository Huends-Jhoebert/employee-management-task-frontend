import { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import UseAxios from "../../hooks/UseAxios";
UseAxios;
import LazyLoading from "./LazyLoading";
import ApiResponseModal from "./ApiResponseModal";

export default function App({ id, name, employees, setEmployees }) {
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);

  const handleDeleteEmployee = async (id) => {
    LazyLoading("Deleting employee");
    try {
      await UseAxios(
        "DELETE",
        `https://employee-management-task.onrender.com/api/employees/${id}`
      );
      //   console.log("Employee deleted successfully");
      setBasicModal(false);
      ApiResponseModal("Success", "Successfully Deleted", "success");

      //update employees usestate when deleted
      setEmployees(employees.filter((employee) => employee.id !== id));
      //   setEmployees(employees.filter((employee) => employee._id!== id));
    } catch (e) {
      ApiResponseModal("Error", "Try again later!", "error");
    }
  };

  return (
    <>
      <MDBBtn size="sm" color="danger" onClick={toggleOpen}>
        {" "}
        Remove <MDBIcon fas icon="trash" />
      </MDBBtn>
      <MDBModal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              {/* <MDBModalTitle>Modal title</MDBModalTitle> */}
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="text-center">
              {" "}
              <MDBIcon size="4x" color="danger" fas icon="times-circle" />
              <div>
                <p className="mt-3">
                  {`  Do you really want to remove ${name} ? This process
                  cannot be undone.`}
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <div className="">
                  <MDBBtn color="secondary" onClick={toggleOpen}>
                    Close
                  </MDBBtn>
                </div>
                <div className="ml-3">
                  <MDBBtn
                    color="danger"
                    onClick={() => handleDeleteEmployee(id)}
                  >
                    Delete
                  </MDBBtn>
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
