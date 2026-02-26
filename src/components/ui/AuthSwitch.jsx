import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Briefcase,
  Phone,
  Building2,
  Eye,
  EyeOff,
} from "lucide-react";
import GlassActions from "./glass-ui/GlassActions";

// ─── Initial form state factories ────────────────────────────────────────────
const defaultSignIn = () => ({ email: "", password: "" });

const defaultCandidateSignUp = () => ({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const defaultCompanySignUp = () => ({
  fullName: "", // owner's full name  → User.fullName
  companyName: "", // → Company.companyName
  email: "", // → User.email
  password: "", // hashed server-side → User.passwordHash
  confirmPassword: "",
});

// ─── Pill toggle (shared) ─────────────────────────────────────────────────────
function UserTypePill({ userType, setUserType }) {
  return (
    <div className="relative flex bg-slate-100 p-1 h-15 rounded-full mb-5 w-full max-w-[300px]">
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${
          userType === "candidate" ? "left-1" : "left-[calc(50%)]"
        }`}
      />
      {["candidate", "company"].map((type) => (
        <button
          key={type}
          type="button"
          className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 capitalize ${
            userType === type
              ? "text-slate-800"
              : "text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => setUserType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

// ─── Reusable input row ───────────────────────────────────────────────────────
function InputField({
  icon: Icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  extra,
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div
      className="input-field"
      style={{ gridTemplateColumns: extra ? "15% 75% 10%" : "15% 85%" }}
    >
      <i className="flex items-center justify-center">
        <Icon size={20} />
      </i>
      <input
        type={resolvedType}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={isPassword ? "current-password" : "on"}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          tabIndex={-1}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AuthSwitch() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState("candidate"); // 'candidate' | 'company'

  // Controlled form state
  const [signIn, setSignIn] = useState(defaultSignIn());
  const [candidateSignUp, setCandidateSignUp] = useState(
    defaultCandidateSignUp(),
  );
  const [companySignUp, setCompanySignUp] = useState(defaultCompanySignUp());

  // Helpers
  const handleSignIn = (e) =>
    setSignIn((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleCandidateSignUp = (e) =>
    setCandidateSignUp((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleCompanySignUp = (e) =>
    setCompanySignUp((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Slide animation
  useEffect(() => {
    const container = document.querySelector(".auth-container");
    if (!container) return;
    if (isSignUp) container.classList.add("sign-up-mode");
    else container.classList.remove("sign-up-mode");
  }, [isSignUp]);

  // Form submissions (wire to API later)
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-in payload:", {
      email: signIn.email, // → User.email
      password: signIn.password, // → raw; bcrypt compare server-side
      role: userType === "candidate" ? "CANDIDATE" : "COMPANY",
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (userType === "candidate") {
      const { fullName, email, password, confirmPassword } = candidateSignUp;
      if (password !== confirmPassword) return alert("Passwords do not match");
      console.log("Candidate sign-up payload:", {
        fullName, // → User.fullName
        email, // → User.email
        password, // → hashed server-side → User.passwordHash
        role: "CANDIDATE",
      });
    } else {
      const { fullName, companyName, email, password, confirmPassword } =
        companySignUp;
      if (password !== confirmPassword) return alert("Passwords do not match");
      console.log("Company sign-up payload:", {
        fullName, // → User.fullName  (owner)
        companyName, // → Company.companyName
        email, // → User.email
        password, // → hashed server-side → User.passwordHash
        role: "COMPANY",
      });
    }
  };

  return (
    <>
      <style>{`
        .auth-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .auth-wrapper {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          min-height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .auth-container {
          position: relative;
          width: 100%;
          height: 100vh;
          background: white;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .forms-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .signin-signup {
          margin-top: 30px;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 75%;
          width: 50%;
          transition: 1s 0.7s ease-in-out;
          display: grid;
          grid-template-columns: 1fr;
          z-index: 5;
        }

        .auth-container form {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 5rem;
          transition: all 0.2s 0.7s;
          overflow-y: auto;
          overflow-x: hidden;
          grid-column: 1 / 2;
          grid-row: 1 / 2;

        }

        form.sign-up-form {
          opacity: 0;
          z-index: 1;
          
        }

        form.sign-in-form {
          z-index: 2;
        }

        .title {
          font-size: 2rem;
          color: #444;
          margin-bottom: 10px;
          font-weight: 700;
          margin-top: 30px;
        }

        .input-field {
          max-width: 500px;
          width: 100%;
          background-color: #f0f0f0;
          margin: 7px 0;
          height: 58px;
          border-radius: 55px;
          display: grid;
          grid-template-columns: 15% 85%;
          padding: 0 0.4rem;
          position: relative;
          transition: 0.3s;
        }

        .input-field:focus-within {
          background-color: #e8e8e8;
          box-shadow: 0 0 0 2px #667eea;
        }

        .input-field i {
          text-align: center;
          line-height: 55px;
          color: #666;
          transition: 0.5s;
          font-size: 1.1rem;
          font-style: normal;
        }

        .input-field input {
          background: none;
          outline: none;
          border: none;
          line-height: 1;
          font-weight: 500;
          font-size: 1rem;
          color: #333;
          width: 100%;
        }

        .input-field input::placeholder {
          color: #aaa;
          font-weight: 400;
        }

        // .btn {
        //   width: 250px;
        //   background-color: #667eea;
        //   border: none;
        //   outline: none;
        //   height: 59px;
        //   border-radius: 49px;
        //   color: #fff;
        //   text-transform: uppercase;
        //   font-weight: 600;
        //   margin: 10px 0;
        //   cursor: pointer;
        //   transition: 0.5s;
        //   font-size: 0.9rem;
        // }

        // .btn:hover {
        //   background-color: #5568d3;
        //   transform: translateY(-2px);
        //   box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        // }

        .panels-container {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .panel {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-around;
          text-align: center;
          z-index: 6;
        }

        .left-panel {
          pointer-events: all;
          padding: 3rem 17% 2rem 12%;
        }

        .right-panel {
          pointer-events: none;
          padding: 3rem 12% 2rem 17%;
        }

        .panel .content {
          color: #fff;
          transition: transform 0.9s ease-in-out;
          transition-delay: 0.6s;
        }

        .panel h3 {
          font-weight: 600;
          line-height: 1;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .panel p {
          font-size: 0.95rem;
          padding: 0.7rem 0;
        }

        .btn.transparent {
          margin: 0;
          background: none;
          border: 2px solid #fff;
          width: 230px;
          height: 51px;
          font-weight: 600;
          font-size: 0.8rem;
        }

        .btn.transparent:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .right-panel .content {
          transform: translateX(800px);
        }

        .auth-container.sign-up-mode:before {
          transform: translate(100%, -50%);
          right: 52%;
        }

        .auth-container.sign-up-mode .left-panel .content {
          transform: translateX(-800px);
        }

        .auth-container.sign-up-mode .signin-signup {
          left: 25%;
        }

        .auth-container.sign-up-mode form.sign-up-form {
          opacity: 1;
          z-index: 2;
        }

        .auth-container.sign-up-mode form.sign-in-form {
          opacity: 0;
          z-index: 1;
        }

        .auth-container.sign-up-mode .right-panel .content {
          transform: translateX(0%);
        }

        .auth-container.sign-up-mode .left-panel {
          pointer-events: none;
        }

        .auth-container.sign-up-mode .right-panel {
          pointer-events: all;
        }

        .auth-container:before {
          content: "";
          position: absolute;
          height: 2000px;
          width: 2000px;
          top: -10%;
          right: 48%;
          transform: translateY(-50%);
          background: linear-gradient(-45deg, #667eea 0%, #764ba2 100%);
          transition: 1.8s ease-in-out;
          border-radius: 50%;
          z-index: 6;
        }

        .social-text {
          padding: 0.7rem 0;
          font-size: 1rem;
          color: #666;
        }

        .social-media {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .social-icon {
          height: 46px;
          width: 46px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 50%;
          color: #667eea;
          font-size: 1.2rem;
          transition: 0.3s;
          cursor: pointer;
          text-decoration: none;
        }

        .social-icon:hover {
          border-color: #764ba2;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .forgot-link {
          font-size: 0.85rem;
          color: #667eea;
          cursor: pointer;
          margin-bottom: 4px;
          text-decoration: underline;
          background: none;
          border: none;
          padding: 0;
        }

        .forgot-link:hover {
          color: #5568d3;
        }

        @media (max-width: 870px) {
          .auth-container {
            min-height: 800px;
            height: 100vh;
          }
          .signin-signup {
            width: 100%;
            top: 95%;
            transform: translate(-50%, -100%);
            transition: 1s 0.8s ease-in-out;
          }
          .signin-signup,
          .auth-container.sign-up-mode .signin-signup {
            left: 50%;
          }
          .panels-container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
          }
          .panel {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 2.5rem 8%;
            grid-column: 1 / 2;
          }
          .right-panel {
            grid-row: 3 / 4;
          }
          .left-panel {
            grid-row: 1 / 2;
          }
          .panel .content {
            padding-right: 15%;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.8s;
          }
          .panel h3 {
            font-size: 1.2rem;
          }
          .panel p {
            font-size: 0.7rem;
            padding: 0.5rem 0;
          }
          .btn.transparent {
            width: 110px;
            height: 35px;
            font-size: 0.7rem;
          }
          .auth-container:before {
            width: 1500px;
            height: 1500px;
            transform: translateX(-50%);
            left: 30%;
            bottom: 68%;
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
          }
          .auth-container.sign-up-mode:before {
            transform: translate(-50%, 100%);
            bottom: 32%;
            right: initial;
          }
          .auth-container.sign-up-mode .left-panel .content {
            transform: translateY(-300px);
          }
          .auth-container.sign-up-mode .right-panel .content {
            transform: translateY(0px);
          }
          .right-panel .content {
            transform: translateY(300px);
          }
          .auth-container.sign-up-mode .signin-signup {
            top: 5%;
            transform: translate(-50%, 0);
          }
        }

        @media (max-width: 570px) {
          form {
            padding: 0 1.5rem;
          }
          .panel .content {
            padding: 0.5rem 1rem;
          }
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="auth-container">
          <div className="forms-container">
            <div className="signin-signup">
              {/* ── Sign In Form ─────────────────────────────────────────── */}
              <form className="sign-in-form" onSubmit={handleSignInSubmit}>
                <UserTypePill userType={userType} setUserType={setUserType} />

                <h2 className="title">
                  {userType === "candidate" ? "Sign in" : "Company Sign in"}
                </h2>

                {/* email → User.email */}
                <InputField
                  icon={Mail}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={signIn.email}
                  onChange={handleSignIn}
                />

                {/* password → User.passwordHash (hashed server-side) */}
                <InputField
                  icon={Lock}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signIn.password}
                  onChange={handleSignIn}
                  extra
                />

                <button type="button" className="forgot-link">
                  Forgot password?
                </button>

                <input type="submit" value="Login" className="btn solid" />

                <p className="social-text">Or sign in with</p>
                <div className="social-media">
                  <SocialIcons />
                </div>
              </form>

              {/* ── Sign Up Form ─────────────────────────────────────────── */}
              <form className="sign-up-form" onSubmit={handleSignUpSubmit}>
                <UserTypePill userType={userType} setUserType={setUserType} />

                <h2 className="title">
                  {userType === "candidate"
                    ? "Create Account"
                    : "Register Company"}
                </h2>

                {userType === "company" && (
                  <>
                    {/* companyName → Company.companyName */}
                    <InputField
                      icon={Building2}
                      type="text"
                      placeholder="Company Name"
                      name="companyName"
                      value={companySignUp.companyName}
                      onChange={handleCompanySignUp}
                    />

                    {/* fullName → User.fullName (owner / point of contact) */}
                    <InputField
                      icon={User}
                      type="text"
                      placeholder="Owner Full Name"
                      name="fullName"
                      value={companySignUp.fullName}
                      onChange={handleCompanySignUp}
                    />

                    {/* email → User.email */}
                    <InputField
                      icon={Mail}
                      type="email"
                      placeholder="Work Email"
                      name="email"
                      value={companySignUp.email}
                      onChange={handleCompanySignUp}
                    />

                    {/* password → User.passwordHash */}
                    <InputField
                      icon={Lock}
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={companySignUp.password}
                      onChange={handleCompanySignUp}
                      extra
                    />

                    {/* confirmPassword — client-side validation only */}
                    <InputField
                      icon={Lock}
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={companySignUp.confirmPassword}
                      onChange={handleCompanySignUp}
                      extra
                    />
                  </>
                )}

                {userType === "candidate" && (
                  <>
                    {/* fullName → User.fullName */}
                    <InputField
                      icon={User}
                      type="text"
                      placeholder="Full Name"
                      name="fullName"
                      value={candidateSignUp.fullName}
                      onChange={handleCandidateSignUp}
                    />

                    {/* email → User.email */}
                    <InputField
                      icon={Mail}
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={candidateSignUp.email}
                      onChange={handleCandidateSignUp}
                    />

                    {/* password → User.passwordHash */}
                    <InputField
                      icon={Lock}
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={candidateSignUp.password}
                      onChange={handleCandidateSignUp}
                      extra
                    />

                    {/* confirmPassword — client-side only */}
                    <InputField
                      icon={Lock}
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={candidateSignUp.confirmPassword}
                      onChange={handleCandidateSignUp}
                      extra
                    />
                  </>
                )}

                <GlassActions
                  type="button"
                  text="Sign up"
                  bounce
                  className="w-[250px] h-[59px] rounded-[49px] uppercase font-semibold cursor-pointer font-[0.9rem]"
                >
                  {/* <input type="submit" value="Sign up" className="btn" /> */}
                </GlassActions>
                <p className="social-text">Or sign up with</p>
                <div className="social-media">
                  <SocialIcons />
                </div>
              </form>
            </div>
          </div>

          {/* ── Side panels ──────────────────────────────────────────────── */}
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here?</h3>
                <p>
                  Join ProveIt today and discover a world of possibilities.
                  <br />
                  Create your account in seconds!
                </p>
                <button
                  className="btn transparent"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign up
                </button>
              </div>
            </div>

            <div className="panel right-panel">
              <div className="content">
                <h3>One of us?</h3>
                <p>Welcome back! Sign in to continue your journey with us.</p>
                <button
                  className="btn transparent"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SocialIcons() {
  return (
    <>
      {/* Google */}
      <a href="#" className="social-icon" aria-label="Sign in with Google">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
      </a>
      {/* Facebook */}
      <a href="#" className="social-icon" aria-label="Sign in with Facebook">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#1877F2"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      {/* LinkedIn */}
      <a href="#" className="social-icon" aria-label="Sign in with LinkedIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#0A66C2"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      {/* GitHub */}
      <a href="#" className="social-icon" aria-label="Sign in with GitHub">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
    </>
  );
}
