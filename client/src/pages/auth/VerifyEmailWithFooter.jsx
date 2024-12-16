import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reload, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../firebase/firebase"; // Import Firestore setup
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import waiting from "../../assets/images/waiting.svg";
import success from "../../assets/images/success.svg";
import toast from "react-hot-toast";
import { FooterSection } from "../../components/navigation/FooterSection";

const VerifyEmailWithFooter = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await reload(user);
        setUserEmail(user.email);

        if (user.emailVerified) {
          setIsVerified(true);
          clearInterval(interval);

          // Fetch user role after verification
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);
          } else {
            toast.error("User data not found. Please contact support.");
          }
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  const resendVerificationEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        toast.success("Verification email resent. Please check your inbox.");
      } catch (error) {
        console.error("Error resending verification email:", error.message);
        if (error.code === "auth/too-many-requests") {
          toast.error("Too many requests. Please wait before trying again.");
        } else {
          toast.error("Error resending email. Please try again later.");
        }
      }
    }
  };

  const handleProceed = () => {
    if (userRole === "shopper") {
      navigate("/catalog");
    } else if (userRole === "seller") {
      navigate("/seller-page/dashboard");
    } else {
      toast.error("User role is not recognized. Please contact support.");
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center px-6 text-center"
        style={{ height: "100vh", backgroundColor: "#f9fafb" }}
      >
        {!isVerified ? (
          <>
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center bg-green-100 rounded-full">
                <img src={waiting} className="h-auto w-52" alt="Waiting" />
              </div>
            </div>

            {/* Header and Instructions */}
            <h1 className="mb-4 text-2xl font-semibold text-gray-900">
              Please verify your email {userRole}
            </h1>
            <p className="text-sm text-gray-600">
              You're almost there! We sent an email to <b>{userEmail}</b>.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Just click on the link in that email to complete your signup. If
              you don't see it, you may need to check your spam folder.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Still can't find the email? No problem.
            </p>

            <button
              onClick={resendVerificationEmail}
              className="px-6 py-2 mt-6 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700"
            >
              Resend Verification Email
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center bg-green-100 rounded-full">
                <img
                  src={success}
                  className="h-auto"
                  style={{ width: "30rem" }}
                  alt="Success"
                />
              </div>
            </div>
            <h1 className="mb-4 text-2xl font-semibold text-gray-900">
              Your email has been verified!
            </h1>
            <p className="text-sm text-gray-600">
              You can now proceed to access your account.
            </p>
            <button
              onClick={handleProceed}
              className="px-6 py-2 mt-6 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700"
            >
              Proceed
            </button>
          </>
        )}
      </div>
      <section>
        <FooterSection topMargin=""></FooterSection>
      </section>
    </>
  );
};

export default VerifyEmailWithFooter;
