"use client";

import * as React from "react";

import SignUpForm from "@/components/Register/Form";
import toast from "@/lib/toast";
import { RegisterPayload } from "@/types/auth";

const SignUp = () => {
  const handleFormSubmit = async (payload: RegisterPayload) => {
    try {
      // await createUserAction(payload);
      toast("The user account has been successfully created. You can now log in.", "success");
    } catch (err) {
      toast("An issue occurred when creating the user account", "error");
    }
  };

  return (
    <main className="layout-auth">
      <h2 className="layout-auth__heading">Sign Up Form</h2>
      <SignUpForm handleFormSubmit={handleFormSubmit} />
    </main>
  );
};

export default SignUp;
