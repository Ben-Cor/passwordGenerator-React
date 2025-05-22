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

    const [strength, setStrength] = useState("");

    const passwordStrength = useCallback(() => {
        let strengthScore = 0;

        if (length >= 15) {
            strengthScore += 1;
        } else if (length >= 10) {
            strengthScore += 0;
        }
        if (numbersAllowed) {
            strengthScore += 1;
        }
        if (charactersAllowed) {
            strengthScore += 1;
        }

        if (strengthScore >= 3) {
            return "Strong";
        } else if (strengthScore >= 2) {
            return "Medium";
        } else {
            return "Weak";
        }
    }, [length, numbersAllowed, charactersAllowed]);

    useEffect(() => {
        const calculatedStrength = passwordStrength();
        setStrength(calculatedStrength); // Update the state with the calculated strength
    }, [password, length, numbersAllowed, charactersAllowed]);

    return (
        <div className="max-w-md md:mx-auto mx-4 bg-white rounded-xl shadow-lg shadow-gray-400 overflow-hidden mt-10 md:max-w-2xl">
            <div className="md:p-8 p-4">
            <div className="mb-4">
                <label className=" font-tektur block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
            <div className="mb-4 font-tektur">
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
            <div className="mb-4 font-tektur">
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
            <div className="mb-4 font-tektur">
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
            <p className={strength=="Weak" ? `text-red-500 font-tektur` : `text-black font-tektur`}>Password Strength: {strength}</p>
            </div>
        </div>
    );
};