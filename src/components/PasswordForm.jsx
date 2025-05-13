import { useCallback, useState } from "react";

export default function PasswordForm() {

    const [length, setLength] = useState(10);
    const [numbersAllowed, setNumbersAllowed] = useState(true);
    const [charactersAllowed, setCharactersAllowed] = useState(true);
    const [password, setPassword] = useState("");

    const generatePassword = useCallback(() => {
        let newPassword = "";
        let stringData = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numbersAllowed) {
            stringData += "0123456789";
        }
        if (charactersAllowed) {
            stringData += "!@#$%^&*()_+[]{}|;:,.<>?";
        }
        for (let i = 0; i < length; i++) {
            newPassword += stringData.charAt(Math.floor(Math.random() * stringData.length));
        }
        // save password to state
        setPassword(newPassword);
        

        // dependancies for useCallback to update the password
    }, [length, numbersAllowed, charactersAllowed]);
    

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-6 md:max-w-2xl">
            <div className="p-8">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Generated Password
                </label>
                <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="text"
                placeholder="Your password will appear here"
                value={password}
                readOnly
                />
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
                max="20"
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={generatePassword}>
                Generate Password
            </button>
            </div>
        </div>
    );
};