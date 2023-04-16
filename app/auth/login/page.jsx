import Link from "next/link";
const LoginPage = () => {
  return (
    <form>
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <button>Login</button>

      <p>
        Don't have an account?{" "}
        <button>
          <Link href="/auth/register">Create one</Link>
        </button>
      </p>
    </form>
  );
};

export default LoginPage;
