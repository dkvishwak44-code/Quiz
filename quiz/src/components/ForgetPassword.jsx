import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const navigate = useNavigate();
  const Backend_Url = import.meta.env.VITE_API_BACKEND_URL;

  // Step 1: Send OTP
  const sendOTP = async () => {
    try{
   const res =  await axios.post(`${Backend_Url}/api/auth/forgot-password`, { email });

     console.log(res);
 
    // toast.error(res.data);
    setStep(2);
    toast.success("otp send successfully");
  } catch(error){
    // console.log(error.response.data.error);
    
    toast.error(error.response.data.error);

 }
}

  // Step 2: Verify OTP
  const verifyOTP = async () => {
    const res = await axios.post(`${Backend_Url}/api/auth/verify-forgot-otp`, {
      email,
      otp,
    });

    if (res.data) {
      setStep(3);
      toast.success('otp verified');
        } else {
      toast.error("Invalid OTP");
    }
  };

  // Step 3: Reset Password
  const resetPassword = async () => {
    await axios.post(`${Backend_Url}/api/auth/reset-password`, {
      email,
      newPassword: newPass,
    });

    toast.success("Password Reset Successful!");
    navigate('/login');


  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md absolute top-50 ">
        
        {/* STEP 1 - Enter Email */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Forgot Password
            </h2>

            <input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none mb-4"
            />

            <button
              onClick={sendOTP}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 - OTP Verification */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold text-center mb-4">Verify OTP</h2>

            <p className="text-gray-600 text-center mb-3">
              OTP sent to <b>{email}</b>
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
              Change Email
            </button>
          </>
        )}

        {/* STEP 3 - Reset Password */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold text-center mb-6">
              Reset Password
            </h2>

            <input
              type="password"
              placeholder="Enter New Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none mb-4"
            />

            <button
              onClick={resetPassword}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
