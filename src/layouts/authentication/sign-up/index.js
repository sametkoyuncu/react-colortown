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

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

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
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../../firebase";

function SignUp() {
  // const [agreement, setAgremment] = useState(true);

  const [file, setFile] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const [data, setData] = useState({});
  const [perc, setPerc] = useState(null);

  const navigate = useNavigate();
  // TODO: butona basmadan db'ye otomatik yükleniyor, bu bir sorun, useEffectten çıkartmak gerek
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is " ${progress}% done`);
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, photoURL: downloadURL }));
          });
        }
      );
    };
    // eslint-disable-next-line no-unused-expressions
    file && uploadFile();
  }, [file]);

  // const handleSetAgremment = () => setAgremment(!agreement);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError({ status: false, message: "" });

    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);

      await updateProfile(res.user.auth.currentUser, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      }).catch((err) => {
        // An error occurred
        // ...
        console.log(err);
      });
      // we are not need this now, because updateProfile() enough.
      await setDoc(doc(db, "users", res.user.uid), {
        displayName: data.displayName,
        email: data.email,
        photoURL: data.photoURL,
        timeStamp: serverTimestamp(),
      });

      navigate("/authentication/sign-in");
    } catch (err) {
      // eslint-disable-next-line no-unused-vars
      const errorCode = err.code;
      // eslint-disable-next-line no-unused-vars
      const errorMsg = err.message;
      setError({ status: true, message: err.message });
    }
  };

  const handleInput = (e) => {
    const { id, value } = e.target;

    setData({ ...data, [id]: value });
  };

  const inputStyles = { border: "1px solid #e5e5e5", borderRadius: "8px" };

  return (
    <BasicLayout title="Welcome!" image={curved6}>
      <Card>
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form" onSubmit={handleSignUp}>
            <SuiBox mb={2}>
              <SuiInput
                id="displayName"
                onChange={handleInput}
                placeholder="Name"
                sx={inputStyles}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                id="email"
                type="email"
                onChange={handleInput}
                placeholder="Email"
                sx={inputStyles}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                id="password"
                type="password"
                minLength="6"
                onChange={handleInput}
                placeholder="Password"
                sx={inputStyles}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Profile Picture{" "}
              </SuiTypography>
              <SuiInput
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                sx={inputStyles}
              />
            </SuiBox>
            {error.status && (
              <SuiBox mb={3}>
                <SuiTypography variant="button" color="error" fontWeight="regular">
                  Upps! Something look likes wrong. Please, try again.{" "}
                </SuiTypography>
                <br />
                <SuiTypography variant="button" color="error" fontWeight="regular">
                  {/* cut 'Firebase: ' part from error message */}
                  {/:(.+)/.exec(error.message)[1]}
                </SuiTypography>
              </SuiBox>
            )}
            {/* <SuiBox display="flex" alignItems="center">
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
            </SuiBox> */}
            <SuiBox mt={4} mb={1}>
              <SuiButton
                disabled={perc !== null && perc < 100}
                type="submit"
                variant="gradient"
                color="dark"
                fullWidth
              >
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
