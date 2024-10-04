import React, { useEffect, useState } from "react";
import googlelogo from "../assets/google.png";
import Logo from "../assets/ebay 2.png";
import { auth, provider } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [agree, setAgree] = useState(false); // To track checkbox state
  const navigate = useNavigate();

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  useEffect(() => {
    if (regex.test(email)) {
      setError((prev) => ({ ...prev, email: "" }));
    }
    if (password.length < 8 && password === confirmPassword) {
      setError((prev) => ({ ...prev, password: "" }));
    }
  }, [email, password]);

  const handleSignInClick = async () => {
    try {
      if (email && password) {
        if (!regex.test(email)) {
          setError((prevError) => ({ ...prevError, email: "Invalid Email" }));
          return;
        }
        if (password.length < 8) {
          setError((prevError) => ({
            ...prevError,
            password: "Password length must be at least 8 characters!",
          }));
          return;
        }
        if (password !== confirmPassword) {
          setError((prevError) => ({
            ...prevError,
            password: "Passwords do not match!",
          }));
          return;
        }
        if (!agree) {
          setError((prevError) => ({
            ...prevError,
            password: "You must agree to the User Agreement!",
          }));
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("User is ", userCredential.user);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info
      const user = result.user;
      console.log("User signed in or signed up:", user);
      navigate("/login");

      // Optionally, you can redirect the user or update the UI
    } catch (error) {
      // Handle Errors here
      const errorMessage = error.message;

      console.error(
        "Error signing in or signing up with Google:",
        errorMessage
      );
    }
  };

  return (
    <>
      <div className="fixed top-11 left-4">
        <img className="w-[7.8rem]" src={Logo} alt="Logo" />
      </div>
      <div className="fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 flex flex-col w-[22rem] gap-5">
        <p className="text-3xl font-bold mb-2">Create an account</p>
        <p>
          Already have an account?
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
        <div className="flex justify-between">
          <input
            className="w-[45%] h-8 border pl-3 border-gray-700 rounded-md"
            type="text"
            placeholder="First name"
          />
          <input
            className="w-[45%] h-8 border pl-3 border-gray-700 rounded-md"
            type="text"
            placeholder="Last name"
          />
        </div>
        <div>
          <input
            className="w-full h-8 pl-3 border border-gray-700 rounded-md"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && (
            <p className="text-red-600 text-[13px]">{error.email}</p>
          )}
        </div>
        <div>
          <input
            className="w-full h-8 pl-3 border border-gray-700 rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && (
            <p className="text-red-600 text-[13px]">{error.password}</p>
          )}
        </div>
        <div>
          <input
            className="w-full h-8 pl-3 border border-gray-700 rounded-md"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <span className="text-[14px] text-gray-700">
          <input
            className="mr-1"
            type="checkbox"
            id="option1"
            name="option1"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          By checking this box, you agree to our User Agreement and acknowledge
          reading our User Privacy Notice.
        </span>
        <button
          onClick={handleSignInClick}
          className="w-full py-4 bg-blue-600 text-white font-semibold rounded-full"
        >
          Continue
        </button>
        <div className="flex items-center">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-1 my-1">or continue with</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="flex w-[40%] px-4 py-4 border border-black rounded-full font-semibold"
        >
          <img className="w-6 mr-3" src={googlelogo} alt="Google Logo" />
          Google
        </button>
      </div>
    </>
  );
}
