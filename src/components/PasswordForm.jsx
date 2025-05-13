import { useEffect } from "react";
import { useCallback, useRef, useState } from "react";
import useGeneratePassword from "../hooks/useGeneratePassword";

export default function PasswordForm() {

    const [length, setLength] = useState(10);
    const [numbersAllowed, setNumbersAllowed] = useState(true);
    const [charactersAllowed, setCharactersAllowed] = useState(true);
    const [isClicked, setIsClicked] = useState(false);

    const passwordRef = useRef(null);
    //useRef to store the password input field
    const {password, generatePassword} = useGeneratePassword();
    //usePasswordGenerator is a custom hook that generates a password

    const copyPassword = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
            //change buttonstatus to clicked for .3 secs
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 400);
    }, [password]);
    // useCallback to stop rerendering on every input change
    

    //anytime useGeneratePassword changes, it will rerender the password
    //useEffect to generate password when length, numbersAllowed, or charactersAllowed changes
    useEffect(() => {
        generatePassword(length, numbersAllowed, charactersAllowed);
    }, [length, numbersAllowed, charactersAllowed, generatePassword]);

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-6 md:max-w-2xl">
            <div className="p-8">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Generated Password
                </label>
                <div className="flex justify-center items-center">
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="text"
                    ref={passwordRef}
                    placeholder="Your password will appear here"
                    value={password}
                    readOnly
                    />
                    <button 
                    className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isClicked ? "transition ease-in-out duration-100 text-white bg-blue-950" : "transition ease-in-out duration-100 bg-blue-500 hover:bg-blue-700 text-white"}`}
                    type="button" onClick={copyPassword}>
                        Copy
                    </button>
                </div>
                
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="length">
                Password Length: {length}
                </label>
                <input
                className="w-full"
                id="length"
                type="range"
                min="6"
                max="30"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="inline-flex items-center">
                <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={numbersAllowed}
                    onChange={() => setNumbersAllowed(!numbersAllowed)}
                />
                <span className="ml-2">Include Numbers</span>
                </label>
            </div>
            <div className="mb-4">
                <label className="inline-flex items-center">
                <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={charactersAllowed}
                    onChange={() => setCharactersAllowed(!charactersAllowed)}
                />
                <span className="ml-2">Include Special Characters</span>
                </label>
            </div>
            {/* <button className={`mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isClicked ? "transition ease-in-out duration-100 text-white bg-blue-950" : "transition ease-in-out duration-100 bg-blue-500 hover:bg-blue-700 text-white"}`}
            type="button" onClick={generatePassword}>
                Generate Password
            </button> */}
            </div>
        </div>
    );
};