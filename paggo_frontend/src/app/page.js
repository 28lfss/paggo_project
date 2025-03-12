"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to my paggo project</h1>
        <div>
          <button
              onClick={handleRegister}
              style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
          >
            Register
          </button>
          <button
              onClick={handleLogin}
              style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
          >
            Login
          </button>
        </div>
      </div>
  );
}
