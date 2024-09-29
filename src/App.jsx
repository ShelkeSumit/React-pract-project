import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [pass, setPass] = useState("");

  //useRef hook
  const passRef = useRef(null)

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += "1234567890";
    if (charAllow) str += "~!@#$%^&*()-_+=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPass(pass);
  }, [length, numberAllow, charAllow, setPass]);
   
  const copyPassToClip = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(pass)}, [pass])

  useEffect(()=> {passwordGen()}, [length, numberAllow, charAllow, passwordGen] )
  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-4xl font-bold text-center text-white ">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg mt-4 overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-2 px-4"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button onClick={copyPassToClip} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              id="numberInput"
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              onChange={() => {
                setCharAllow((prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Characters </label>
          </div>
       
        </div>
      </div>
    </>
  );
}

export default App;
