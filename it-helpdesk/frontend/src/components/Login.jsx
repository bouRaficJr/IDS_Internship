import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // UI States for handling spinners, errors, and success feedback animations
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Switch API path depending on whether the operator is signing in or registering
    const endpoint = isLogin ? 'login' : 'register';
    const bodyData = isLogin 
      ? { email, password } 
      : { fullName, email, password };

    try {
      const response = await fetch(`http://localhost:5201/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify(bodyData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred during authentication.');
      }

      if (isLogin) {
        // 1. Store JWT token securely in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // 2. Trigger visual success layout feedback
        setLoginSuccess(true);
        
        // 3. Wait 1.5 seconds for animation, then unlock the app router context framework
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
          navigate('/dashboard');
        }, 1500);
      } else {
        // Registration success path: Alert user and instantly toggle back to sign-in panel view
        alert('Registration successful! Please sign in with your new account.');
        setIsLogin(true);
        setPassword('');
        setIsLoading(false);
      }

    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 transition-all duration-300 relative">
      
      {/* Decorative Top-Left Ambient Light Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Main Login Card Component */}
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-black/50 space-y-8 z-10">
        
        {loginSuccess ? (
          /* Simulated Success View Screen */
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl shadow-lg shadow-emerald-500/10">
              ✓
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">Login Successful!</h2>
              <p className="text-sm text-slate-400">Redirecting to your IT-HelpDesk dashboard...</p>
            </div>
          </div>
        ) : (
          /* Interactive Input Form Layout */
          <>
            {/* Header Section */}
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-500/30">
                S
              </div>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {isLogin ? 'Sign in to IT-HelpDesk' : 'Create an Agent Account'}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {isLogin ? 'Secure access to your support dashboard' : 'Register a new tenant operator'}
              </p>
            </div>

            {/* Error Notification Alert Banner */}
            {errorMessage && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3.5 rounded-xl text-xs font-medium text-center shadow-inner transition-all">
                {errorMessage}
              </div>
            )}

            {/* Interactive Input Form */}
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                
                {/* Full Name field */}
                {!isLogin && (
                  <div className="transition-all duration-200">
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5 ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Johnson"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                    />
                  </div>
                )}
                
                {/* Email Field */}
                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5 ml-1">Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@saasdesk.io"
                    className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5 ml-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Form Options Bar */}
              {isLogin && (
                <div className="flex items-center justify-between text-xs px-1">
                  <label className="flex items-center text-slate-400 cursor-pointer select-none group">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500/30 border-slate-800 rounded bg-slate-950 cursor-pointer checked:bg-indigo-600 checked:border-transparent transition-all" 
                    />
                    <span className="ml-2 group-hover:text-slate-300 transition-colors">Remember this device</span>
                  </label>
                  <a href="#reset" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Action Execution Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-lg shadow-indigo-600/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-150 flex items-center justify-center gap-2.5 ${
                  isLoading ? 'opacity-50 cursor-not-allowed shadow-none' : 'hover:shadow-indigo-600/20'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Verifying Identity...</span>
                  </>
                ) : (
                  <span>{isLogin ? 'Sign In Agent Portal' : 'Register Operator'}</span>
                )}
              </button>
            </form>

            {/* View Toggle Controller Footer */}
            <div className="border-t border-slate-800/80 pt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrorMessage('');
                }}
                className="text-indigo-400 text-xs font-semibold hover:text-indigo-300 hover:underline transition-all"
              >
                {isLogin ? "Don't have an account? Register domain" : 'Already have an account? Sign in'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}