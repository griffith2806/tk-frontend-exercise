import { Home } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorTypography, StyledBox } from "../components/not-found/notFoundStyles";

export default function NotFound(){
    const navigate = useNavigate();
    
    return (
        <Container maxWidth="sm">
      <StyledBox>
        <ErrorTypography variant="h1" color="primary">
          404
        </ErrorTypography>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          startIcon={<Home />}
          size="large"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </StyledBox>
    </Container>
    )
}