import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setLength] = useState(4);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //here we create password generator function
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*()_+";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);
  //here we use useEffect to call the generatePassword function when any dependency changes
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);
  //useRef to focus on the input field after copying the password
  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 102);
  }, [password]);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-arange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3 bg-white"
            value={password}
            placeholder="Generate Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-500 text-white py-1 px-3 shrink-0 hover:bg-blue-600 hover:scale-105 transition-all duration-100"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              className="cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all duration-100"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-white">Length ({length})</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-white">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={characterAllowed}
              onChange={() => setCharacterAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput" className="text-white">
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
