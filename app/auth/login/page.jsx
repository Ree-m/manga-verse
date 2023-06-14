"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useUserContext } from "@/app/context/user";
import { useRouter } from "next/navigation";
import styles from "app/styles/auth.module.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, setUser } = useUserContext();
  const router = useRouter();
  async function onSubmit(e) {
    e.preventDefault();

    // try {

    //   e.preventDefault();
    //   const response = await fetch(`http://localhost:3000/api/auth/login`, {
    //     method: "POST",
    //     body: JSON.stringify({ name, password, email }),
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    //   });

    //   if (response.ok) {
    //     response.json().then((user) => {
    //       console.log("this is login page",user);
    //       setUser(user);
    //     });
    //   } else {
    //     alert("Wrong credentials");
    //   }

    // } catch (error) {
    //   console.log(error);
    // }

    try {
      console.log("login data", {
        email,
        password,
        name,
      });

      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
        name,
      });
      setName("");
      setEmail("");
      setPassword("");
      router.push("/");

      console.log("post login", data);
    } catch (error) {
      console.log(error);
    }
  }

  // async function handleGoogleSignIn() {
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/auth/register`, {
  //       method: "POST",
  //       body: JSON.stringify({ name, email }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await response.json();
  //     console.log("sign in with google", data);
  //     setUser(data); // Save the user object in the user context

  //     await signIn("google");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
        <button onClick={()=>router.push(`/`)}>Login</button>
        </div>
        

        <div className={styles.end}>
          <p>
            Don't have an account? <Link href="/auth/register">Register</Link>
          </p>
          {/* <p>Or sign up with</p> */}
          {/* <button type="button" onClick={handleGoogleSignIn}>
          google
        </button> */}
        </div>
      </form>
    </div>
  );

};

export default LoginPage;
