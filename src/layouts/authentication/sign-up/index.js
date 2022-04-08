/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

// firebase.js
import { auth } from "../../../firebase";

function SignUp() {
  const [agreement, setAgremment] = useState(true);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleSignUp = (e) => {
    e.preventDefault();
    setError(false);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // sign up
        // eslint-disable-next-line prefer-destructuring, no-unused-vars
        const user = userCredential.user;
        navigate("/authentication/sign-in");
      })
      .catch((err) => {
        // eslint-disable-next-line no-unused-vars
        const errorCode = err.code;
        // eslint-disable-next-line no-unused-vars
        const errorMsg = err.message;
        setErrorMessage(err.message);
        setError(true);
      });
  };

  const inputStyles = { border: "1px solid #e5e5e5", borderRadius: "8px" };

  return (
    <BasicLayout title="Welcome!" image={curved6}>
      <Card>
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form" onSubmit={handleSignUp}>
            {/* <SuiBox mb={2}>
              <SuiInput placeholder="Username" sx={inputStyles} />
            </SuiBox> */}
            <SuiBox mb={2}>
              <SuiInput
                type="email"
                minLength="6"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                sx={inputStyles}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                sx={inputStyles}
              />
            </SuiBox>
            {error && (
              <SuiBox mb={3}>
                <SuiTypography variant="button" color="error" fontWeight="regular">
                  Upps! Something look likes wrong. Please, try again.{" "}
                </SuiTypography>
                <br />
                <SuiTypography variant="button" color="error" fontWeight="regular">
                  {/* cut 'Firebase: ' part from error message */}
                  {/:(.+)/.exec(errorMessage)[1]}
                </SuiTypography>
              </SuiBox>
            )}
            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} disabled />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton type="submit" variant="gradient" color="dark" fullWidth>
                sign up
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
