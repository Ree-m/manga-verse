"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useUserContext } from "@/app/context/user";
import { useRouter } from "next/navigation";
import styles from "../../styles/auth.module.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, setUser } = useUserContext();
  const router = useRouter();
  async function onSubmit(e) {
    e.preventDefault();

    

    try {
    

      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
        name,
      });

      if (data?.error) {
        // Handle login error
        alert("Wrong credentials");
      } else {
        // Login successful
        setName("");
        setEmail("");
        setPassword("");
        router.push("/");
      }
  
    

    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className={styles.auth}>
      <form onSubmit={onSubmit}>
        <div className={styles.flex}>
          <h2>Login</h2>
          <p><strong>Demo Account</strong> username: test email: test@test.com password: testtest</p>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
        </div>
        

        <div className={styles.end}>
          <p>
            Don't have an account? <Link href="/auth/register">Register</Link>
          </p>
        
        </div>
      </form>
    </div>
  );

};

export default LoginPage;
