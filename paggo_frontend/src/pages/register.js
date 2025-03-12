import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${apiBaseUrl}user`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log("Registration successful");
                router.push("/login");
            } else {
                console.error("Registration failed");
            }
        };

        xhr.onerror = () => {
            console.error("Error:", xhr.statusText);
        };

        xhr.send(JSON.stringify(formData));
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
