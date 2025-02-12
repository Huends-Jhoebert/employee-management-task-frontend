import { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
  MDBContainer,
} from "mdb-react-ui-kit";
import AddEmployeeModal from "./AddEmployeeModal";
import UseAxios from "../../hooks/UseAxios";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import UpdateEmployeeModal from "./UpdateEmployeeModal";

export default function EmployeesTable() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Employees per page

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await UseAxios(
          "Get",
          `/api/v1/employees/${currentPage}/${limit}`
        );

        setEmployees(response.employees); // Update employee list
        setTotalPages(response.totalPages); // Update total pages
      } catch (e) {
        console.log("Error fetching employees:", e);
      }
    };

    fetchEmployees();
  }, [currentPage]); // Refetch when page changes

  return (
    <MDBContainer>
      <div className="shadow-4 mt-5">
        <div className="p-1">
          <h4 className="text-center mt-2">Employee Records</h4>
        </div>
        <div className="p-3">
          <AddEmployeeModal setEmployees={setEmployees} employees={employees} />
        </div>
        <MDBTable responsive="sm" align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Photo</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">Account Type</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {employees?.map((employee) => {
              const {
                id,
                photo,
                email,
                firstName,
                lastName,
                username,
                contactNumber,
                country,
                accountType,
              } = employee;

              return (
                <tr key={id}>
                  <td>
                    <div className="d-flex align-items-center">
                      {photo ? (
                        <img
                          src={photo}
                          alt={`${firstName} ${lastName}`}
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                      ) : (
                        <MDBIcon
                          icon="user"
                          size="2x"
                          className="text-primary"
                        />
                      )}
                    </div>
                  </td>
                  <td>{`${firstName} ${lastName}`}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{country}</td>
                  <td>{accountType}</td>
                  <td>{contactNumber}</td>
                  <td>
                    <div className="mb-2">
                      <UpdateEmployeeModal
                        setEmployees={setEmployees}
                        employees={employees}
                        employeeToUpdate={employee}
                      />
                    </div>
                    <div>
                      <DeleteEmployeeModal
                        id={id}
                        name={`${firstName} ${lastName}`}
                        setEmployees={setEmployees}
                        employees={employees}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>

        {/* Pagination Controls */}
        <div className="d-flex p-3 justify-content-center mt-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn btn-primary mx-2"
          >
            Previous
          </button>

          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn btn-primary mx-2"
          >
            Next
          </button>
        </div>
      </div>
    </MDBContainer>
  );
}
