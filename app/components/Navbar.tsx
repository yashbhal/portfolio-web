import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-base-content p-5">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Yash Bhalchandra
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/About" className="text-xl">
              About
            </Link>
          </li>
          <li>
            <Link href="/Work" className="text-xl">
              Work
            </Link>
          </li>
          <li>
            <Link href="/Blog" className="text-xl">
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
