import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
const Header = () => {
  const { data } = useSession();
  console.log("session", data);
  return (
    <nav>
      <div>
        <Link href="/">
          <h1>Mang App</h1>
        </Link>
      </div>
      {data?.user ? (
        <>
          <span>Hi,{data?.user?.username}</span>
          <span onClick={() => signOut()}>logout</span>
        </>
      ) : (
        <>
          <Link href="/auth/login">Login</Link>
          <Link href="/">Bookmarks</Link>
        </>
      )}
    </nav>
  );
};

export default Header;
