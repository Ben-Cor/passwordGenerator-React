import { useState } from "react";

export default function PasswordForm() {

    const [length, setLength] = useState(10);
    const [numbersAllowed, setNumbersAllowed] = useState(true);
    const [charactersAllowed, setCharactersAllowed] = useState(true);
    const [password, setPassword] = useState("");

    return (
        <div>

        </div>
    );
}