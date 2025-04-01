/* eslint-disable no-unused-vars */
"use client";

// import React from 'react'
import { Icon } from "@iconify/react";
import { Divider, Input, Link, Select, SelectItem, Spinner, } from "@nextui-org/react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { fadeIn } from "../assets/utils/motion";
import Loader from "../components/Loader";
import { NextButton } from "../components/NextButton";
import { CreateUser, openAuth } from "../services/AuthenticationService";
import FacebookLogin from "./FacebookLogin";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  const [oAuthProvider, setOAuthProvider] = useState({ provider: '', token: '' })
  const [oAuthFacebook, setOAuthFacebook] = useState({ provider: '', firstName: '', lastName: '', email: '', profilePicture: '', facebookId: '' })
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [selectedGender, setSelectedGender] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    height: '',
    weight: '',
    address: '',
    city: '',
    state: '',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: ''
  });
  const [error, setError] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Register | Fitness360'
  }, [])

  const nextStep = () => {
    setStep(step + 1);
  };
  const logInClick = () => {
    navigate('/login');
  }

  const trainerclick = () => {
    navigate('/trainersignup')
  }
  const prevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    if (name === "password" || name === "confirmPassword") {
      const password = name === "password" ? value : formData.password;
      const confirmPassword = name === "confirmPassword" ? value : formData.confirmPassword;

      if (password !== confirmPassword) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    }
  };
  const toggleVisibility = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };
  const resetForm = () => {
    formData.firstName = ''
    formData.lastName = ''
    formData.gender = ''
    formData.age = ''
    formData.height = ''
    formData.weight = ''
    formData.address = ''
    formData.city = ''
    formData.state = ''
    formData.contactNumber = ''
    formData.email = ''
    formData.password = ''
    formData.confirmPassword = ''

  };

  const validateFormData = () => {
    const errorMessages = [];
    if (formData.firstName === 'ADMIN' || formData.firstName === 'admin' || formData.firstName === 'Admin') {
      errorMessages.push('ooops! You hacked the system');
    }
    if (formData.firstName === '' || formData.firstName.length < 2) {
      errorMessages.push('Enter a valid first name!');
    }
    if (formData.lastName === '') {
      errorMessages.push('Enter a valid last name!');
    }
    if (formData.age === '' || formData.age < 8) {
      errorMessages.push('Enter a valid age greater than 8');
    }
    if (formData.height === '') {
      errorMessages.push('Enter your height');
    }
    if (formData.weight === '') {
      errorMessages.push('Enter your weight');
    }
    if (formData.address === '') {
      errorMessages.push('Enter your address');
    }
    if (formData.city === '') {
      errorMessages.push('Enter your city');
    }
    if (formData.state === '') {
      errorMessages.push('Enter your state');
    }
    if (formData.contactNumber.length !== 10) {
      errorMessages.push('Enter a valid contact number!');
    }
    if (formData.email === '') {
      errorMessages.push('Enter your email address');
    }
    if (formData.password === '') {
      errorMessages.push('Enter your password');
    }
    if (formData.profilePicture === '') {
      errorMessages.push('Please select a profile picture');
    }
    if (!passwordsMatch) {
      errorMessages.push('Passwords do not match!');
    }

    if (errorMessages.length > 0) {
      errorMessages.forEach(msg => toast.error(msg));
      return true;
    }
    setError(false);
  };

  const handleGenderChange = (value) => {
    console.log('Selected gender:', value.target.value);
    setSelectedGender(value.target.value);
  };



  const createUserClick = async (e) => {
    e.preventDefault();
    const validation = validateFormData()
    if (!validation) {
      try {
        setLoading(true);
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          if (key !== 'gender') {
            formDataToSend.append(key, formData[key]);
          }
        });

        if (selectedGender) {
          formDataToSend.append('gender', selectedGender);
        } else {
          console.warn('Gender is not selected');
        }

        console.log('formDataToSend contents:');
        for (let [key, value] of formDataToSend.entries()) {
          console.log(`${key}: ${value}`);
        }

        const result = await CreateUser(formDataToSend);
        if (result.statusCode === 201) {
          toast.success(result.message);
          navigate('/login');
        } else if (result.statusCode === 203) {
          toast.warning(result.message);
          setStep(1);
        } else if (result.statusCode === 202) {
          toast.error(result.message);
          setStep(1);
        }
      } catch (e) {
        console.error(e);
      } finally {
        resetForm();
        setLoading(false);
      }
    }
  };




  // const acceptNumber = (e) => {
  //   e.target.value = e.target.value.replace(/[^0-9]/g, '');
  // };
  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      oAuthProvider.provider = 'Google';
      oAuthProvider.token = credentialResponse;
      const result = await openAuth(oAuthProvider);
      console.log('Google Auth Result:', result);
      handleAuthSuccess(result);
    } catch (error) {
      console.error('Error in handleGoogleSuccess:', error);
      toast.error(error.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    console.error("Google Sign-In Failed");
  };

  const handleAuthSuccess = (result) => {
    try {
      if (result.statusCode === 200) {
        toast.success(result.message);

        // Decode the token
        const decodedToken = jwtDecode(result.token);

        switch (decodedToken.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'user':
            navigate('/user');
            break;
          case 'trainer':
            navigate('/trainer');
            break;
          default:
            toast.error('Invalid User');
            navigate('/');
        }
        sessionStorage.setItem('token', result.token);

      } else if (result.statusCode === 211) {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error in handleAuthSuccess:', error);
      toast.error(error.message || 'Something went wrong');
    }
  };

  const handleFacebookSuccess = async (accessToken, profile) => {
    try {
      let nameParts = profile.name.split(' ');
      let firstName = nameParts[0];
      let lastName = nameParts[1];
      oAuthFacebook.provider = 'Facebook',
        oAuthFacebook.facebookId = profile.id
      oAuthFacebook.firstName = firstName,
        oAuthFacebook.lastName = lastName;
      oAuthFacebook.email = profile.email;
      oAuthFacebook.profilePicture = profile.picture.data.url;
      const result = await openAuth(oAuthFacebook)
      handleAuthSuccess(result);
    } catch (error) {
      console.error('Error in handle Facebook Success:', error);
      toast.error(error.message || 'facebook authentication failed');
    } finally {
      setLoading(false);
    }
  };



  return (

    <>
      <Spinner label="Loading..." color="success" className={`absolute rounded-2xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-svh w-svw z-50 bg-light dark:bg-background ${loading === true ? "" : "hidden"}`} />

      <div className="flex flex-col h-full w-full items-center justify-center absolute bg-gradient-to-br from-secondlight to-light dark:from-secondary dark:to-background text-background dark:text-light ">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn('', 'spring', .2, 0.75)}
          className="flex w-full max-w-sm flex-col gap-4 rounded-large  border-[1px] border-background/40 p-2 shadow-2xl opacity-35 bg-gradient-to-br from-secondlight to-light dark:from-secondary dark:to-background text-background dark:text-light dark:border-1 dark:border-light/30 dark:shadow-none">
          <div className="flex flex-col items-center pb-4">
            {/* <AcmeIcon size={60} /> */}
            <p className="text-small text-default-500 dark:text-secondlight">fitness360 welcomes you</p>
            <p className="text-xl font-medium dark:text-light">Create Your Account</p>
          </div>


          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            {/* Step 1: Email */}
            {step === 1 && (
              <>
                <NextButton color="primary" size="md" className="w-full" type="submit" onClick={nextStep}>
                  Continue with email
                </NextButton>
                <NextButton color="background" size="md" className="w-full dark:bg-light dark:text-background" onClick={trainerclick}>
                  Create A Trainer Account
                </NextButton>

              </>
            )}

            {/* Step 2: First Name, Last Name, Gender, Age */}
            {step === 2 && (
              <div >
                <div className="flex flex-col mb-4">
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px] border-1 border-background/30 rounded-lg", inputWrapper: "rounded-b-none" }}
                    label="First Name"
                    name="firstName"
                    type="text"
                    variant="bordered"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none " }}
                    label="Last Name"
                    name="lastName"
                    type="text"
                    variant="bordered"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {/* <Select
                    radius="none"
                    classNames={{ base: "mb-[2px] h-[52px] rounded-t-none dark:border-red-500", inputWraper: "rounded-lg " }}
                    variant="bordered"
                    items={gender}
                    label="Gender"
                    placeholder="Select gender"

                  >
                    {(item) =>
                      <SelectItem
                        key={item.value}
                        value={item.value}>{item.label}
                      </SelectItem>}
                  </Select> */}
                  <Select
                    radius="none"
                    classNames={{
                      base: "mb-[2px] h-[52px] rounded-t-none dark:border-red-500",
                      inputWraper: "rounded-lg "
                    }}
                    variant="bordered"
                    items={gender}
                    label="Gender"
                    placeholder="Select gender"
                    value={selectedGender}
                    onChange={handleGenderChange}
                  >
                    {(item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    )}
                  </Select>

                  <Input
                    required
                    classNames={{ base: "mb-[2px] h-[52px]", inputWrapper: "rounded-t-none", inputWrapper: "rounded-none" }}
                    label="Age"
                    name="age"
                    type="number"
                    variant="bordered"
                    value={formData.age}
                    onChange={handleInputChange}
                  />

                  <Input
                    required
                    classNames={{ base: "mb-[2px] h-[52px]", inputWrapper: "rounded-t-none" }}
                    name="profilePicture"
                    label="Choose your Profile Image"
                    type="file"
                    accept="image/*"
                    variant="bordered"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                        if (!allowedTypes.includes(file.type)) {
                          toast.error('Please choose a valid image file (JPG, PNG, or JPEG only)');
                          return;
                        }
                        setFormData({ ...formData, profilePicture: file });
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between gap-2 md:gap-28">

                  <NextButton onClick={prevStep} color="secondlight" size="md" className="w-full">Back</NextButton>

                  <NextButton onClick={nextStep} color="secondlight" size="md" className="w-full">Next</NextButton>

                </div>
              </div>
            )}

            {/* Step 3: Height, Weight, Address, City, State */}
            {step === 3 && (
              <div >
                <div className="flex flex-col mb-4">
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-b-none " }}
                    label="Height in cm"
                    name="height"
                    type="number"
                    variant="bordered"
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none" }}
                    label="Weight in kg"
                    name="weight"
                    type="number"
                    variant="bordered"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none" }}
                    label="Address"
                    name="address"
                    type="text"
                    variant="bordered"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none" }}
                    label="City"
                    name="city"
                    type="text"
                    variant="bordered"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <Input
                    required
                    classNames={{ inputWrapper: "rounded-t-none" }}
                    label="State"
                    name="state"
                    type="text"
                    variant="bordered"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between gap-2 md:gap-28">
                  <NextButton onClick={prevStep} color="secondlight" size="md" className="w-full" > Back</NextButton>
                  <NextButton onClick={nextStep} color="secondlight" size="md" className="w-full" >Next</NextButton>
                </div>
              </div>
            )}

            {/* Step 4: Contact Number, Email, Password, Confirm Password */}
            {step === 4 && (
              <div >
                <div className="flex flex-col mb-4">
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-b-none" }}
                    label="Contact Number"
                    name="contactNumber"
                    type="number"
                    variant="bordered"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none" }}
                    label="Email"
                    name="email"
                    type="email"
                    variant="bordered"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none" }}
                    label="Password"
                    name="password"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    value={formData.password}
                    onChange={handleInputChange}
                    endContent={
                      <button type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <Icon
                            className="pointer-events-none text-2xl text-default-400"
                            icon="solar:eye-closed-linear"
                          />
                        ) : (
                          <Icon
                            className="pointer-events-none text-2xl text-default-400"
                            icon="solar:eye-bold"
                          />
                        )}
                      </button>
                    }
                  />
                  <Input
                    required
                    classNames={{ inputWrapper: "rounded-t-none" }}
                    label="Confirm Password"
                    name="confirmPassword"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {!passwordsMatch && (
                    <p className="text-red-500 text-sm">Passwords do not match!</p>
                  )}
                </div>
                <div className="flex justify-between gap-2 md:gap-28">
                  <NextButton onClick={prevStep} color="secondlight" size="md" className="w-full" >Back</NextButton>
                  <NextButton onClick={createUserClick} type="submit" size="md" className="w-full" disabled={!passwordsMatch}>Submit</NextButton>
                </div>
              </div>
            )}
          </form>




          <div className="flex items-center gap-4 py-2">
            <Divider className="flex-1 bg-default-500 " />
            <p className="shrink-0 text-tiny text-default-500">OR</p>
            <Divider className="flex-1 bg-default-500" />
          </div>
          <div className="flex flex-col gap-4">
            <GoogleOAuthProvider clientId={googleClientId}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </GoogleOAuthProvider>
            <FacebookLogin onSuccess={handleFacebookSuccess} />

          </div>
          <p className="text-center text-small dark:text-light">
            Already have an account?&nbsp;
            <Link onClick={logInClick} size="sm" className="hover:cursor-pointer">
              Log In
            </Link>
          </p>
        </motion.div>
      </div>
      <Toaster className="z-40" richColors position="top-right" />

    </>

  )
}

export default Signup