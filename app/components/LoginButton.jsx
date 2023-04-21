import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        {session.user.name}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Sign in with google <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default LoginButton;
