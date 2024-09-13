// import React, {component}from 'react'
// import firebase from './firebase'
// export class App extends component {
//   handleclick=()=>{
//     let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
//     let number = '+91 6382519651';
//     firebase.auth().signInWithPhoneNumber(number,recaptcha).then (function(e){
//       let code = prompt('enter the otp ', '');
//       if (code == null) return;
//       e.confirm (code).then(function (result){
//         console.log(result.user, 'user');
//         document.querySelector('label').textContent=result.user.phoneNumber + "NumberVerified";
        
//       }).catch((error)=>{
//         console.log(error)
//       })

//     })
   

//   }
//   render(){
//     return(<div>
//       <label></label>
//       <button onClick={this.handleclick}>Clickhere</button>

//     </div>)
    
   
   
//   }
// }

// export default App


// import React, { useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyC9zmzTU08-TuPgi54T0fqMtVHtI6csyKM",
//   authDomain: "otp-verifiy-6d106.firebaseapp.com",
//   projectId: "otp-verifiy-6d106",
//   storageBucket: "otp-verifiy-6d106.appspot.com",
//   messagingSenderId: "489543324381",
//   appId: "1:489543324381:web:8d904dd3050d77a7a04134"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// function App() {
//   const [phoneNumber, setPhoneNumber] = useState('+91 6382519651');
//   const [verificationId, setVerificationId] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [message, setMessage] = useState('');

//   const setupRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       'size': 'normal',
//       'callback': (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         handleSendCode();
//       }
//     });
//   };

//   const handleSendCode = async () => {
//     try {
//       setupRecaptcha();
//       const appVerifier = window.recaptchaVerifier;
//       const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//       setVerificationId(confirmationResult.verificationId);
//       setMessage('Verification code sent to your phone.');
//     } catch (error) {
//       console.error('Error sending verification code:', error);
//       setMessage('Error sending code. Please try again.');
//     }
//   };

//   const handleVerifyCode = async () => {
//     try {
//       const credential = await auth.signInWithCredential(
//         auth.PhoneAuthProvider.credential(verificationId, verificationCode)
//       );
//       setMessage(`Phone number verified: ${credential.user.phoneNumber}`);
//     } catch (error) {
//       console.error('Error verifying code:', error);
//       setMessage('Invalid code. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Phone Authentication</h1>
//       <div>
//         <input
//           type="tel"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           placeholder="Enter phone number"
//         />
//         <button onClick={handleSendCode}>Send Verification Code</button>
//       </div>
//       <div id="recaptcha-container"></div>
//       {verificationId && (
//         <div>
//           <input
//             type="text"
//             value={verificationCode}
//             onChange={(e) => setVerificationCode(e.target.value)}
//             placeholder="Enter verification code"
//           />
//           <button onClick={handleVerifyCode}>Verify Code</button>
//         </div>
//       )}
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect, useRef } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyC9zmzTU08-TuPgi54T0fqMtVHtI6csyKM",
//   authDomain: "otp-verifiy-6d106.firebaseapp.com",
//   projectId: "otp-verifiy-6d106",
//   storageBucket: "otp-verifiy-6d106.appspot.com",
//   messagingSenderId: "489543324381",
//   appId: "1:489543324381:web:8d904dd3050d77a7a04134"
// };

// // Initialize Firebase
// let app;
// let auth;

// try {
//   app = initializeApp(firebaseConfig);
//   auth = getAuth(app);
// } catch (error) {
//   console.error("Error initializing Firebase:", error);
// }

// function App() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const recaptchaVerifier = useRef(null);
//   const recaptchaWidgetId = useRef(null);

//   useEffect(() => {
//     const setupRecaptcha = () => {
//       if (!auth) {
//         setMessage('Firebase authentication is not initialized. Please check your configuration.');
//         return;
//       }

//       recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         'size': 'normal',
//         'callback': (response) => {
//           setMessage('reCAPTCHA verified. You can now send the code.');
//         },
//         'expired-callback': () => {
//           setMessage('reCAPTCHA expired. Please verify again.');
//           resetRecaptcha();
//         }
//       });

//       recaptchaVerifier.current.render().then((widgetId) => {
//         recaptchaWidgetId.current = widgetId;
//       }).catch(error => {
//         console.error("Error rendering reCAPTCHA:", error);
//         setMessage('Error setting up reCAPTCHA. Please check your network connection and try again.');
//       });
//     };

//     setupRecaptcha();

//     return () => {
//       if (recaptchaVerifier.current) {
//         recaptchaVerifier.current.clear();
//       }
//     };
//   }, []);

//   const resetRecaptcha = () => {
//     if (recaptchaWidgetId.current !== null) {
//       window.grecaptcha.reset(recaptchaWidgetId.current);
//     }
//   };

//   const handleSendCode = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       if (!auth) {
//         throw new Error('Firebase authentication is not initialized.');
//       }

//       const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
//       const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier.current);
//       setVerificationId(confirmationResult.verificationId);
//       setMessage('Verification code sent to your phone.');
//     } catch (error) {
//       console.error('Error sending verification code:', error);
//       if (error.code === 'auth/network-request-failed') {
//         setMessage('Network error. Please check your internet connection and try again.');
//       } else {
//         setMessage(`Error: ${error.message}. Please try again.`);
//       }
//       resetRecaptcha();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyCode = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       if (!auth) {
//         throw new Error('Firebase authentication is not initialized.');
//       }

//       const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
//       const result = await auth.signInWithCredential(credential);
//       setMessage(`Phone number verified: ${result.user.phoneNumber}`);
//     } catch (error) {
//       console.error('Error verifying code:', error);
//       setMessage(`Error: ${error.message}. Please try again.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!auth) {
//     return <div>Error: Firebase not initialized. Please check your configuration.</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Phone Authentication</h1>
//       <div className="mb-4">
//         <input
//           type="tel"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           placeholder="Enter phone number (with country code)"
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div id="recaptcha-container" className="mb-4"></div>
//       <button 
//         onClick={handleSendCode} 
//         disabled={loading || !phoneNumber} 
//         className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
//       >
//         {loading ? 'Sending...' : 'Send Verification Code'}
//       </button>
//       {verificationId && (
//         <div className="mt-4">
//           <input
//             type="text"
//             value={verificationCode}
//             onChange={(e) => setVerificationCode(e.target.value)}
//             placeholder="Enter verification code"
//             className="w-full p-2 border rounded mb-2"
//           />
//           <button 
//             onClick={handleVerifyCode} 
//             disabled={loading || !verificationCode}
//             className="w-full bg-green-500 text-white p-2 rounded disabled:bg-gray-300"
//           >
//             {loading ? 'Verifying...' : 'Verify Code'}
//           </button>
//         </div>
//       )}
//       {message && <p className="mt-4 text-center">{message}</p>}
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect, useRef } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyC9zmzTU08-TuPgi54T0fqMtVHtI6csyKM",
//   authDomain: "otp-verifiy-6d106.firebaseapp.com",
//   projectId: "otp-verifiy-6d106",
//   storageBucket: "otp-verifiy-6d106.appspot.com",
//   messagingSenderId: "489543324381",
//   appId: "1:489543324381:web:8d904dd3050d77a7a04134"
// };

// // Initialize Firebase
// let app;
// let auth;

// try {
//   app = initializeApp(firebaseConfig);
//   auth = getAuth(app);
// } catch (error) {
//   console.error("Error initializing Firebase:", error);
// }

// function App() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
//   const recaptchaVerifier = useRef(null);
//   const recaptchaWidgetId = useRef(null);

//   useEffect(() => {
//     const loadRecaptcha = async () => {
//       if (!auth) {
//         setMessage('Firebase authentication is not initialized. Please check your configuration.');
//         return;
//       }

//       try {
//         recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
//           'size': 'normal',
//           'callback': (response) => {
//             setMessage('reCAPTCHA verified. You can now send the code.');
//           },
//           'expired-callback': () => {
//             setMessage('reCAPTCHA expired. Please verify again.');
//             resetRecaptcha();
//           }
//         });

//         await recaptchaVerifier.current.render();
//         setRecaptchaLoaded(true);
//       } catch (error) {
//         console.error("Error rendering reCAPTCHA:", error);
//         setMessage('Error setting up reCAPTCHA. Please check your network connection and try again.');
//       }
//     };

//     loadRecaptcha();

//     return () => {
//       if (recaptchaVerifier.current) {
//         recaptchaVerifier.current.clear();
//       }
//     };
//   }, []);

//   const resetRecaptcha = () => {
//     if (recaptchaVerifier.current) {
//       recaptchaVerifier.current.clear();
//       recaptchaVerifier.current = null;
//     }
//     setRecaptchaLoaded(false);
//     const loadRecaptcha = async () => {
//       try {
//         recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
//           'size': 'normal',
//           'callback': (response) => {
//             setMessage('reCAPTCHA verified. You can now send the code.');
//           },
//           'expired-callback': () => {
//             setMessage('reCAPTCHA expired. Please verify again.');
//             resetRecaptcha();
//           }
//         });

//         await recaptchaVerifier.current.render();
//         setRecaptchaLoaded(true);
//       } catch (error) {
//         console.error("Error re-rendering reCAPTCHA:", error);
//         setMessage('Error resetting reCAPTCHA. Please refresh the page and try again.');
//       }
//     };
//     loadRecaptcha();
//   };

//   const handleSendCode = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       if (!auth) {
//         throw new Error('Firebase authentication is not initialized.');
//       }

//       const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
//       const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier.current);
//       setVerificationId(confirmationResult.verificationId);
//       setMessage('Verification code sent to your phone.');
//     } catch (error) {
//       console.error('Error sending verification code:', error);
//       if (error.code === 'auth/network-request-failed') {
//         setMessage('Network error. Please check your internet connection and try again.');
//       } else if (error.code === 'auth/invalid-phone-number') {
//         setMessage('Invalid phone number. Please enter a valid phone number with country code.');
//       } else {
//         setMessage(`Error: ${error.message}. Please try again.`);
//       }
//       resetRecaptcha();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyCode = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       if (!auth) {
//         throw new Error('Firebase authentication is not initialized.');
//       }

//       const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
//       const result = await auth.signInWithCredential(credential);
//       setMessage(`Phone number verified: ${result.user.phoneNumber}`);
//     } catch (error) {
//       console.error('Error verifying code:', error);
//       setMessage(`Error: ${error.message}. Please try again.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!auth) {
//     return <div className="text-red-500 font-bold">Error: Firebase not initialized. Please check your configuration.</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-md">
//       <h1 className="text-2xl font-bold mb-4">Phone Authentication</h1>
//       <div className="mb-4">
//         <input
//           type="tel"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           placeholder="Enter phone number (with country code)"
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div id="recaptcha-container" className="mb-4"></div>
//       {!recaptchaLoaded && (
//         <button 
//           onClick={resetRecaptcha} 
//           className="w-full bg-yellow-500 text-white p-2 rounded mb-2"
//         >
//           Reload reCAPTCHA
//         </button>
//       )}
//       <button 
//         onClick={handleSendCode} 
//         disabled={loading || !phoneNumber || !recaptchaLoaded} 
//         className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
//       >
//         {loading ? 'Sending...' : 'Send Verification Code'}
//       </button>
//       {verificationId && (
//         <div className="mt-4">
//           <input
//             type="text"
//             value={verificationCode}
//             onChange={(e) => setVerificationCode(e.target.value)}
//             placeholder="Enter verification code"
//             className="w-full p-2 border rounded mb-2"
//           />
//           <button 
//             onClick={handleVerifyCode} 
//             disabled={loading || !verificationCode}
//             className="w-full bg-green-500 text-white p-2 rounded disabled:bg-gray-300"
//           >
//             {loading ? 'Verifying...' : 'Verify Code'}
//           </button>
//         </div>
//       )}
//       {message && <p className="mt-4 text-center">{message}</p>}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC9zmzTU08-TuPgi54T0fqMtVHtI6csyKM",
  authDomain: "otp-verifiy-6d106.firebaseapp.com",
  projectId: "otp-verifiy-6d106",
  storageBucket: "otp-verifiy-6d106.appspot.com",
  messagingSenderId: "489543324381",
  appId: "1:489543324381:web:8d904dd3050d77a7a04134"
};

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    const loadRecaptcha = async () => {
      if (!auth) {
        setMessage('Firebase authentication is not initialized. Please check your configuration.');
        return;
      }

      try {
        recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'normal',
          'callback': () => {
            setMessage('reCAPTCHA verified. You can now send the code.');
          },
          'expired-callback': () => {
            setMessage('reCAPTCHA expired. Please verify again.');
            resetRecaptcha();
          }
        });

        await recaptchaVerifier.current.render();
        setRecaptchaLoaded(true);
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setMessage('Error setting up reCAPTCHA. Please check your network connection and try again.');
      }
    };

    loadRecaptcha();

    return () => {
      if (recaptchaVerifier.current) {
        recaptchaVerifier.current.clear();
      }
    };
  }, []);

  const resetRecaptcha = () => {
    if (recaptchaVerifier.current) {
      recaptchaVerifier.current.clear();
      recaptchaVerifier.current = null;
    }
    setRecaptchaLoaded(false);
    const loadRecaptcha = async () => {
      try {
        recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'normal',
          'callback': () => {
            setMessage('reCAPTCHA verified. You can now send the code.');
          },
          'expired-callback': () => {
            setMessage('reCAPTCHA expired. Please verify again.');
            resetRecaptcha();
          }
        });

        await recaptchaVerifier.current.render();
        setRecaptchaLoaded(true);
      } catch (error) {
        console.error("Error re-rendering reCAPTCHA:", error);
        setMessage('Error resetting reCAPTCHA. Please refresh the page and try again.');
      }
    };
    loadRecaptcha();
  };

  const handleSendCode = async () => {
    setLoading(true);
    setMessage('');
    try {
      if (!auth) {
        throw new Error('Firebase authentication is not initialized.');
      }

      const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier.current);
      setVerificationId(confirmationResult.verificationId);
      setMessage('Verification code sent to your phone.');
    } catch (error) {
      console.error('Error sending verification code:', error);
      if (error.code === 'auth/network-request-failed') {
        setMessage('Network error. Please check your internet connection and try again.');
      } else if (error.code === 'auth/invalid-phone-number') {
        setMessage('Invalid phone number. Please enter a valid phone number with country code.');
      } else {
        setMessage(`Error: ${error.message}. Please try again.`);
      }
      resetRecaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setMessage('');
    try {
      if (!auth) {
        throw new Error('Firebase authentication is not initialized.');
      }

      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const result = await auth.signInWithCredential(credential);
      setMessage(`Phone number verified: ${result.user.phoneNumber}`);
    } catch (error) {
      console.error('Error verifying code:', error);
      setMessage(`Error: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  };

  const messageStyle = {
    marginTop: '15px',
    textAlign: 'center',
    color: '#333',
  };

  if (!auth) {
    return <div style={{...containerStyle, color: 'red', fontWeight: 'bold'}}>Error: Firebase not initialized. Please check your configuration.</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={{textAlign: 'center', marginBottom: '20px', color: '#333'}}>Phone Authentication</h1>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number (with country code)"
          style={inputStyle}
        />
        <div id="recaptcha-container" style={{marginBottom: '15px'}}></div>
        {!recaptchaLoaded && (
          <button 
            onClick={resetRecaptcha} 
            style={{...buttonStyle, backgroundColor: '#FFA500'}}
          >
            Reload reCAPTCHA
          </button>
        )}
        <button 
          onClick={handleSendCode} 
          disabled={loading || !phoneNumber || !recaptchaLoaded} 
          style={loading || !phoneNumber || !recaptchaLoaded ? disabledButtonStyle : buttonStyle}
        >
          {loading ? 'Sending...' : 'Send Verification Code'}
        </button>
        {verificationId && (
          <div>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              style={inputStyle}
            />
            <button 
              onClick={handleVerifyCode} 
              disabled={loading || !verificationCode}
              style={loading || !verificationCode ? disabledButtonStyle : buttonStyle}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </div>
        )}
        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
}

export default App;