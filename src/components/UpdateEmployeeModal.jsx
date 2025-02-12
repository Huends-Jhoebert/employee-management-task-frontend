import { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBFile,
} from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import UseAxios from "../../hooks/UseAxios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import LazyLoading from "./LazyLoading";
import ApiResponseModal from "./ApiResponseModal";

export default function UpdateEmployeeModal({
  setEmployees,
  employees,
  employeeToUpdate,
}) {
  const [countries, setCountries] = useState([]);
  const [basicModal, setBasicModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const employeeData = watch(); // Watching form data for updates
  // Or, to watch a specific field
  const firstNameValue = watch("firstName");
  const lastNameValue = watch("lastName");
  const emailValue = watch("email");
  const userNameValue = watch("username");

  const toggleOpen = () => setBasicModal(!basicModal);

  // Fetch countries for the dropdown
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await UseAxios("GET", "/api/v1/countries/");
        setCountries(response);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCountries();
  }, []);

  // Pre-fill the form when employeeToUpdate is passed
  useEffect(() => {
    if (employeeToUpdate) {
      setValue("firstName", employeeToUpdate.firstName);
      setValue("lastName", employeeToUpdate.lastName);
      setValue("username", employeeToUpdate.username);
      setValue("email", employeeToUpdate.email);
      setValue("country", employeeToUpdate.country);
      setValue("contactNumber", employeeToUpdate.contactNumber);
      setValue("accountType", employeeToUpdate.accountType);
    }
  }, [employeeToUpdate, setValue]);

  // Handle the form submission
  const onSubmit = (data) => {
    LazyLoading("Updating employee");

    // console.log(data);Huends-0010

    const submitEmployee = async () => {
      try {
        const response = await UseAxios(
          "PUT",
          `/api/v1/employees/${employeeToUpdate.id}`,
          data
        );
        ApiResponseModal("Success", "Successfully Updated", "success");

        // Update the employee data in the main employee list
        const updatedEmployees = employees.map((employee) =>
          employee.id === response.id ? response : employee
        );
        setEmployees(updatedEmployees);

        toggleOpen();
      } catch (e) {
        if (e.response.status === 400) {
          ApiResponseModal("Error", e.response.data.message, "error");
        } else {
          ApiResponseModal("Error", "Try again later!", "error");
        }
      }
    };

    submitEmployee(data);
  };

  // Convert Image to Base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setValue("photo", reader.result, { shouldValidate: true }); // Store Base64 string
      };
    }
  };

  return (
    <>
      <MDBBtn size="sm" onClick={toggleOpen}>
        Update <MDBIcon fas icon="pen-square" />
      </MDBBtn>

      <MDBModal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="bg-light">
              <MDBModalTitle>Update Employee Record</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      label="First Name"
                      value={firstNameValue}
                      type="text"
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                      className="mb-3"
                    />
                    {errors.firstName && (
                      <p className="text-danger">{errors.firstName.message}</p>
                    )}
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      label="Last Name"
                      type="text"
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                      value={lastNameValue}
                      className="mb-3"
                    />
                    {errors.lastName && (
                      <p className="text-danger">{errors.lastName.message}</p>
                    )}
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      label="Username"
                      type="text"
                      value={userNameValue}
                      {...register("username", {
                        required: "Username is required",
                      })}
                      className="mb-3"
                    />
                    {errors.username && (
                      <p className="text-danger">{errors.username.message}</p>
                    )}
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      label="Email"
                      type="email"
                      value={emailValue}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className="mb-3"
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </MDBCol>

                  <MDBCol md="6">
                    <div className="mb-3">
                      <select
                        className="form-select"
                        {...register("country", {
                          required: "Country is required",
                        })}
                      >
                        <option value="">Select country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="text-danger">{errors.country.message}</p>
                      )}
                    </div>
                  </MDBCol>

                  <MDBCol md="6">
                    <div className="form-control">
                      <PhoneInput
                        placeholder="Enter phone number"
                        value={employeeData.contactNumber || ""}
                        onChange={(value) =>
                          setValue("contactNumber", value, {
                            shouldValidate: true,
                          })
                        }
                        international
                      />
                      {errors.contactNumber && (
                        <p className="text-danger">
                          {errors.contactNumber.message}
                        </p>
                      )}
                    </div>
                  </MDBCol>

                  <MDBCol md="12">
                    <select
                      className="form-select mb-3"
                      {...register("accountType", {
                        required: "Account Type is required",
                      })}
                    >
                      <option value="">Select account type</option>
                      <option value="Team Member">Team Member</option>
                      <option value="Team Lead">Team Lead</option>
                    </select>
                    {errors.accountType && (
                      <p className="text-danger">
                        {errors.accountType.message}
                      </p>
                    )}
                  </MDBCol>

                  <MDBCol md="12">
                    <MDBFile
                      id="customFile"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBModalFooter>
                  <MDBBtn color="primary" type="submit">
                    Submit
                  </MDBBtn>
                </MDBModalFooter>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
