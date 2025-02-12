import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useLocation } from "react-router-dom"; // For programmatic navigation

const ErrorPage = () => {
  const navigate = useNavigate();

  // Get the error message from the location state object if available
  const { state } = useLocation();
  const { errorMessage } = state;

  const handleRedirect = () => {
    navigate("/"); // Redirect to the home page or any other page
  };

  return (
    <MDBContainer className="text-center mt-5">
      <MDBRow>
        <MDBCol>
          <h1 className="display-1">Error</h1>
          <h2>{errorMessage}</h2>
          <MDBBtn onClick={handleRedirect} color="primary">
            Go Back to Home
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ErrorPage;
