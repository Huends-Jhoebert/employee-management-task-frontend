import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom"; // Use useNavigate in React Router v6

const NotFound = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleRedirect = () => {
    navigate("/"); // Redirect to the home page or any page you'd prefer
  };

  return (
    <MDBContainer className="text-center mt-5">
      <MDBRow>
        <MDBCol>
          <h1 className="display-1">404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <MDBBtn onClick={handleRedirect} color="primary">
            Go Back to Home
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default NotFound;
