import { useState, useCallback } from "react";

export default function usePasswordGenerator() {
    const [password, setPassword] = useState("");

    const generatePassword = useCallback((length, numbersAllowed, charactersAllowed) => {
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
        setPassword(newPassword);
    }, []);

    return { password, generatePassword };
}