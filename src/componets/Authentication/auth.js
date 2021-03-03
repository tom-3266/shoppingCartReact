import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { texterror } from "../checkoutForm/texterror";
import * as Yup from "yup";
import "./auth.css";
import { useHistory } from "react-router-dom";

const initialValues = {
  userName: "",
  password: "",
};
const validationSchema = Yup.object({
  userName: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const Auth = (props) => {
  const [signIn, setSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [token, setToken] = useState(null);
  const history = useHistory();
  const handleClick = () => {
    setSignIn(!signIn);
  };
  const removeItems = () => {
    history.push("/");
    localStorage.removeItem("token");
  }
  const onSubmit = (values) => {
    setLoading(true);
    console.log(values);
    const authData = {
      email: values.userName,
      password: values.password,
      returnSecureTocken: true,
    };

    !signIn &&
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqzlYJRpjRw4LW9uNF-TAyEF2a-r4ibmk",
          authData
        )
        .then((response) => {
          setLoading(false);
          // console.log(response);
          setErrorMessage();
          setToken(response.data.idToken);
          localStorage.setItem("token",response.data.idToken);
          
        })
        .catch((err) => {
          // console.log(err.response.data.error.message);
          setErrorMessage(err.response.data.error.message);
          setLoading(false);
        });

    signIn &&
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqzlYJRpjRw4LW9uNF-TAyEF2a-r4ibmk",
          authData
        )
        .then((response) => {
          setLoading(false);
          // console.log(response);
          setErrorMessage();
          // console.log(response.data.idToken);
          setToken(response.data.idToken);
          localStorage.setItem("token", response.data.idToken);
          
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  console.log(token);
  return (
    <div>
      {!props.logIn && (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="form">
              <div className="form-header">
                {signIn ? "Sign In" : "Sign Up"}
              </div>
              <div className="form-header-error">
                {errorMessage === "EMAIL_EXISTS" ? "Already a member" : null}
              </div>
              <div className="cart">
                <div className="form-container">
                  <div className="individual">
                    <label className="label" htmlFor="userName">
                      Username{" "}
                    </label>
                    <Field
                      id="userName"
                      name="userName"
                      type="text"
                      placeholder="me@something.com"
                    />
                    <ErrorMessage name="userName" component={texterror} />
                  </div>
                  <div className="individual">
                    <label className="label" htmlFor="password">
                      Password{" "}
                    </label>
                    <Field id="password" name="password" type="password" />
                    <ErrorMessage name="password" component={texterror} />
                  </div>
                  <button type="submit" className="button primary">
                    {loading ? (
                      <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      "Confirm"
                    )}
                  </button>
                  <button
                    type="submit"
                    className="button primary"
                    style={{ backgroundColor: "blue", color: "white" }}
                    onClick={handleClick}
                  >
                    {!signIn
                      ? "Already a member, Sign In"
                      : "Not a member, Sign Up"}
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      )}
      {props.logIn && (removeItems())}
    </div>
  );
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (email, password) => dispatch(auth(email, password))
//     };
// };

export default Auth;
