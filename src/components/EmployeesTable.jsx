import { useEffect, useState } from "react";
import {
  MDBBtn,
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
  // State to hold the employee data, including the new fields

  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await UseAxios(
          "Get",
          "https://employee-management-task.onrender.com/api/employees"
        );

        setEmployees(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchEmployees();
  }, []);

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
            {/* Loop through employees array and render rows dynamically */}
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
                        <div className="">
                          <MDBIcon
                            icon="user"
                            size="2x"
                            className="text-primary"
                          />
                        </div>
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
                    {/* Action buttons remain static and fixed */}

                    <div className="mb-2">
                      {/* <MDBBtn color="primary" size="sm">
                        Update <MDBIcon fas icon="pen-square" />
                      </MDBBtn> */}
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
      </div>
    </MDBContainer>
  );
}
