import Link from "next/link";
const Header = () => {
    return ( 
        <div>
            <Link href="/"><h1>Mang App</h1></Link>
            <Link href="/auth/login">Login</Link>
            

        </div>
     );
}
 
export default Header;