import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const [formData, setFormData] = useState({
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
        xhr.open("POST", `${apiBaseUrl}user/validate-user`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log("Login successful");

                // Redirect to the upload page with the username
                router.push(`/upload/${formData.username}`);
            } else {
                console.error("Login failed");
            }
        };

        xhr.onerror = () => {
            console.error("Error:", xhr.statusText);
        };

        xhr.send(JSON.stringify(formData));
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
