
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    dob: "",
    contact: "",
    email: "",
    password: "",
  });
  const Backend_Url = import.meta.env.VITE_API_BACKEND_URL; 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    await axios.post(`${Backend_Url}/api/auth/signup`, {
      email: form.email,
      name:form.name,
      password : form.password,
      fatherName : form.fatherName,
      dob:form.dob,
      contact:form.contact
    });

    setStep(2);
    toast.success("otp send successfully");
  };

  const verifyOTP = async () => {
    const res = await axios.post(`${Backend_Url}/api/auth/verify-signup-otp`, {
      email: form.email,
      otp,
    });

    if (res.data) {
      toast.success("Signup Successful!");
      navigate('/login');
      
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md mx-10">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Create Account
            </h2>

            <div className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
              />

              <input
                name="fatherName"
                placeholder="father-name"
                value={form.fatherName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
              />
              <input
                name="dob"
                placeholder="date of birth"
                type="date"
                value={form.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
              />
              <input
                name="contact"
                placeholder="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
              />

              <button
                onClick={sendOTP}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                Verify Email
              </button>
            </div>
          </>
        )}

        {/* OTP PAGE */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Verify Email
            </h2>

            <p className="text-gray-600 text-center mb-3">
              OTP sent to: <b>{form.email}</b>
            </p>

            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none mb-4"
            />

            <button
              onClick={verifyOTP}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Verify OTP
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full mt-3 text-blue-600 underline"
            >
              Edit Email
            </button>
          </>
        )}
      </div>
    </div>
  );
}
