/* eslint-disable no-unused-vars */
"use client";

import { Icon } from "@iconify/react";
import { Input, Link, Select, SelectItem, Spinner, Textarea } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { fadeIn } from "../assets/utils/motion";
import { NextButton } from "../components/NextButton";
import { CreateTrainer } from "../services/adminService/TrainerService";

function TrainerSignup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [selectedGender, setSelectedGender] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    contactNumber: 0,
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: '',
    bio: '',
    certifications: '',
    experience: '',
    specialization: '',
    instaId: '',
    facebook: '',
    twitter: '',
    address: '',
    city: '',
    state: '',
    profilePicture: '',
    profilePreview: ''
  });

  const [error, setError] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Trainer Registration | Fitness360';
    return () => {
      if (formData.profilePreview) {
        URL.revokeObjectURL(formData.profilePreview);
      }
    };
  }, [formData.profilePreview]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const userClick = () => {
    navigate('/signup');
  };

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
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      contactNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePicture: '',
      bio: '',
      certifications: '',
      experience: '',
      specialization: '',
      instaId: '',
      facebook: '',
      twitter: ''
    });
  };

  const validateFormData = () => {
    const errorMessages = [];

    if (formData.firstName === '' || formData.firstName.length < 2) {
      errorMessages.push('Enter a valid first name!');
    }

    if (formData.lastName === '') {
      errorMessages.push('Enter a valid last name!');
    }

    if (formData.age === '' || formData.age < 18) {
      errorMessages.push('Trainers must be at least 18 years old');
    }

    if (formData.contactNumber.length !== 10) {
      errorMessages.push('Enter a valid 10-digit contact number!');
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

    if (formData.bio === '' || formData.bio.length < 50) {
      errorMessages.push('Please provide a bio of at least 50 characters');
    }

    if (formData.certifications === '') {
      errorMessages.push('Please list your certifications');
    }

    if (formData.experience === '') {
      errorMessages.push('Please specify your experience');
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
    setSelectedGender(value.target.value);
  };

  const createTrainerClick = async (e) => {
    e.preventDefault();
    const validation = validateFormData();

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
        }

        // Add role as trainer
        formDataToSend.append('role', 'trainer');

        const result = await CreateTrainer(formDataToSend);

        if (result.statusCode === 201) {
          toast.success(result.message);
          navigate('/login');
        } else {
          toast.error(result.message || 'Registration failed');
        }
      } catch (e) {
        console.error(e);
        toast.error('An error occurred during registration');
      } finally {
        resetForm();
        setLoading(false);
      }
    }
  };

  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <>
      <Spinner
        label="Loading..."
        color="success"
        className={`absolute rounded-2xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-svh w-svw z-50 bg-light dark:bg-background ${loading ? "" : "hidden"}`}
      />

      <div className="flex flex-col h-full w-full items-center justify-center absolute bg-gradient-to-br from-secondlight to-light dark:from-secondary dark:to-background text-background dark:text-light">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn('', 'spring', .2, 0.75)}
          className="flex w-full max-w-sm flex-col gap-4 rounded-large border-[1px] border-background/40 p-2 shadow-2xl opacity-35 bg-gradient-to-br from-secondlight to-light dark:from-secondary dark:to-background text-background dark:text-light dark:border-1 dark:border-light/30 dark:shadow-none"
        >
          <div className="flex flex-col items-center pb-4">
            <p className="text-small text-default-500 dark:text-secondlight">Become a Fitness360 Trainer</p>
            <p className="text-xl font-medium dark:text-light">Trainer Registration</p>
          </div>

          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <>
                <NextButton color="background" size="md" className="w-full  dark:bg-light dark:text-background" type="submit" onClick={nextStep}>
                  Continue with email
                </NextButton>
                <NextButton color="primary" size="md" className="w-full" onClick={userClick}>
                  Create A User Account
                </NextButton>
              </>
            )}

            {/* Step 2: Personal Details */}
            {step === 2 && (
              <div>
                <div className="flex flex-col mb-4">
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-b-none" }}
                    label="First Name"
                    name="firstName"
                    type="text"
                    variant="bordered"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none" }}
                    label="Last Name"
                    name="lastName"
                    type="text"
                    variant="bordered"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <Select
                    radius="none"
                    classNames={{
                      base: "mb-[2px] h-[52px] rounded-t-none dark:border-red-500",
                      inputWraper: "rounded-lg"
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
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-t-none" }}
                    label="Age"
                    name="age"
                    type="number"
                    variant="bordered"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="18"
                  />

                </div>
                <div className="flex justify-between gap-2 md:gap-28">
                  <NextButton onClick={prevStep} color="secondlight" size="md" className="w-full">Back</NextButton>
                  <NextButton onClick={nextStep} color="secondlight" size="md" className="w-full">Next</NextButton>
                </div>
              </div>
            )}

            {/* Step 3: Professional Details */}
            {step === 3 && (
              <div>
                <div className="flex flex-col mb-4">
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-b-none" }}
                    label="Certifications (separated by commas)"
                    name="certifications"
                    type="text"
                    variant="bordered"
                    value={formData.certifications}
                    onChange={handleInputChange}
                  // description="List your fitness certifications (separated by commas)"
                  />
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none" }}
                    label="Years of Experience"
                    name="experience"
                    type="number"
                    variant="bordered"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none" }}
                    label="Specialization - Gym, Yoga, etc."
                    name="specialization"
                    type="text"
                    variant="bordered"
                    value={formData.specialization}
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
                  <NextButton onClick={prevStep} color="secondlight" size="md" className="w-full">Back</NextButton>
                  <NextButton onClick={nextStep} color="secondlight" size="md" className="w-full">Next</NextButton>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Social */}
            {step === 4 && (
              <div>
                <div className="flex flex-col mb-4">
                  <Input
                    required
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-b-none" }}
                    label="Contact Number"
                    name="contactNumber"
                    type="tel"
                    variant="bordered"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    pattern="[0-9]{10}"
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
                  <Textarea
                    required
                    classNames={{ base: "-mb-[2px]", inputWrapper: "rounded-none" }}
                    label="Bio training philosophy (min 50 chars)"
                    name="bio"
                    variant="bordered"
                    value={formData.bio}
                    onChange={handleInputChange}
                    minRows={3}
                  // description="Tell us about yourself and your training philosophy (min 50 chars)"
                  />
                  <Input
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none" }}
                    label="Instagram"
                    name="instaId"
                    type="text"
                    variant="bordered"
                    value={formData.instaId}
                    onChange={handleInputChange}
                    placeholder="@username"
                  />
                  <Input
                    classNames={{ base: "-mb-[2px] h-[52px]", inputWrapper: "rounded-none" }}
                    label="Facebook"
                    name="facebook"
                    type="text"
                    variant="bordered"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    placeholder="Profile URL"
                  />
                  <Input
                    classNames={{ inputWrapper: "rounded-t-none" }}
                    label="Twitter/X"
                    name="twitter"
                    type="text"
                    variant="bordered"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="@username"
                  />
                </div>
                <div className="flex justify-between gap-2 md:gap-28">
                  <NextButton onClick={prevStep} color="secondlight" size="md" className="w-full">Back</NextButton>
                  <NextButton onClick={nextStep} color="secondlight" size="md" className="w-full">Next</NextButton>
                </div>
              </div>
            )}

            {/* Step 5: Account Setup */}
            {step === 5 && (
              <div>
                <div className="flex flex-col mb-4">
                  <div className="mt-1 flex justify-center">
                    {formData.profilePreview !== '' &&
                      (
                        <motion.div
                          whileInView="show"
                          initial="hidden"
                          viewport={{ once: false, amount: 0.2 }}
                          variants={fadeIn("", "", 0.2, 0.5)}
                          className="relative">
                          <img
                            src={formData.profilePreview}
                            alt="Profile Preview"
                            className="h-40 w-40 rounded-full object-cover border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                profilePicture: '',
                                profilePreview: ''
                              });
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <Icon icon="mdi:close" className="w-4 h-4" />
                          </button>
                        </motion.div>
                      )
                    }
                  </div>

                  <Input
                    required
                    classNames={{ base: "-mb-[30px] h-[52px]", inputWrapper: "rounded-b-none" }}
                    name="profilePicture"
                    label="Profile Image"
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
                        setFormData({
                          ...formData,
                          profilePicture: file,
                          profilePreview: URL.createObjectURL(file) // Create preview URL
                        });
                      }
                    }}
                  />


                  <span className="my-2" ></span>
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
                <div className="flex justify-between gap-2 md:gap-12">
                  <NextButton onClick={prevStep} color="secondlight" size="md" className="w-full ">Back</NextButton>
                  <NextButton
                    onClick={createTrainerClick}
                    type="submit"
                    size="md"
                    className="w-full"
                    disabled={!passwordsMatch}
                  >
                    Complete Registration
                  </NextButton>
                </div>
              </div>
            )}
          </form>

          <p className="text-center text-small dark:text-light">
            Already have an account?&nbsp;
            <Link onClick={() => navigate('/login')} size="sm" className="hover:cursor-pointer">
              Log In
            </Link>
          </p>
        </motion.div>
      </div>
      <Toaster className="z-40" richColors position="top-right" />
    </>
  );
}

export default TrainerSignup;