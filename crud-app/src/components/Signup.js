import React,{Component} from 'react';
import { Formik, Form, Field } from 'formik';

import { TextField } from './TextField';
import * as Yup from 'yup';
import { GoogleLogin } from "react-google-login";
import axios from "axios";


export const Signup = () => {
  const googleAuth = async ({profileObj}) => {
    axios({
        method: "post",
        url: "/auth/google/signin",
        data: {
            googleId: profileObj.googleId,
            email: profileObj.email,
        },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    division: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    contact: Yup.number()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),

    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),

    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null],'password must match')
    .required('Confirm Password is required') ,

      profPic: Yup
      .mixed()
      .required("A file is required")

    })
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        division: '',
        contact: '',
        password: '',
        profPic: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        console.log(values)
      }}
    >
      {formik => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form>
            <TextField label="Name" name="firstName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="division" name="division" type="text" />
            <TextField label="Contact" name="contact" type="number" />
            <TextField label="password" name="password" type="password" />
            <TextField label="Confirm Password" name="confirmPassword" type="password" />
            <TextField
                name="file"
                component={'CustomImageInput'}
                title="Select a file"/>

            <button className="btn btn-dark mt-3" type="submit">Register</button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
          </Form>
        </div>
      )}
    </Formik>
           

  )
}