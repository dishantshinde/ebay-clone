import React, { useState } from "react";
import Logo from "../assets/ebay 2.png";
import googlelogo from "../assets/google.png";
import { auth, provider } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignin = async (email, password) => {
    try {
      if (!email || !password) {
        setError("Email and password are required!");
        return;
      }

      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in");
      navigate("/");
      // Optionally, you might want to redirect or update the UI on successful login
    } catch (error) {
      console.error("Error signing in", error.message);
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return; // prevent multiple triggers
    setLoading(true);
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user.email);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.warn("Cancelled popup request due to multiple attempts.");
      } else if (error.code === "auth/popup-blocked") {
        console.warn("Popup blocked, using redirect...");
        await signInWithRedirect(auth, provider);
      } else {
        console.error("Google Sign-In Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed top-11 left-4 ">
        <img className="w-[7.8rem]" src={Logo} alt="eBay Logo" />
      </div>
      <div className="fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 flex flex-col w-[22rem] gap-4">
        <div className="text-center space-y-3">
          <p className="text-4xl font-bold">Hello</p>
          <p>
            Login to eBay or{" "}
            <Link className="text-blue-500" to="/signup">
              Signup
            </Link>
          </p>
        </div>
        <input
          className="w-full h-10 pl-3 mt-2 border border-gray-400 rounded-md"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full h-10 pl-3 my-2 border border-gray-400 rounded-md"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => handleSignin(email, password)}
          className="w-full py-4 bg-blue-600 text-white font-semibold rounded-full"
        >
          Continue
        </button>
        {error && <p className="text-red-600 text-[13px]">{error}</p>}
        <div className="flex items-center">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-1 my-1">or</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="relative w-full py-4 border border-black rounded-full font-semibold"
        >
          <img
            className="absolute top-1/2 -translate-y-1/2 ml-5 w-6"
            src={googlelogo}
            alt="Google Logo"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
