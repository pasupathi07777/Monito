import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import './ResetPass.css';
import auth from '../../firebase/firebase';
import { useService } from '../../service/ServiceProvider';
const ResetPass = () => {
    // const { onResetPassword } = useService;
    

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [gmail, setGmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const onResetPassword = async (e) => {
        e.preventDefault()
        if (gmail === "")  return setEmailError("Required");
        setLoading(true);
        sendPasswordResetEmail(auth, gmail)
            .then(() => {
                alert("passwoer reset link sent to email check it")
                navigate('/login');
                setGmail("");
               
            })
            .catch((error) => {
                alert("Error sending password reset email:")
                console.error("Error sending password reset email:", error);
            });
        };

  

    useEffect(() => {
        function authathicata(user) {

            if (user) {
                navigate("/")

            } else {

            }

        }
        onAuthStateChanged(auth, authathicata)
    }, [])



    return (
        <div className="reset flex flex-col items-center justify-center w-full sm:px-8  min-h-screen bg-transparent  text-white ">
            <div className="background-shadow absolute inset-0 bg-black/40"></div>
            <form className={`flex h-full sm:h-auto flex-col gap-4 w-full sm:max-w-md px-4 py-6 sm:px-8 sm:py-10 bg-white/10 rounded-lg backdrop-blur-sm  sm:shadow-md ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="font-bold text-2xl text-center">Reset Password</div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="gmail" className="font-semibold">Email</label>
                        <p className="text-red-500 text-xs">{emailError}</p>
                    </div>
                    <input
                        type="email"
                        id="gmail"
                        placeholder="Enter Your Gmail"
                        className="focus:outline-none py-2 px-3 rounded border border-gray-300"
                        value={gmail}
                        onChange={(e) => { setGmail(e.target.value); setEmailError(""); }}
                    />
                </div>

              

                <button
                    className="py-2 mt-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-all"
                    onClick={onResetPassword}
                    disabled={loading}
                >
                    Reset Password
                </button>

                <Link to="/login" className="text-sm text-center   mt-4">
                    Existing User? Login
                </Link>
            </form>
        </div>
    );
};

export default ResetPass;



