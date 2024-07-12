import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 text-base-content p-5">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Yash Bhalchandra
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/Work" className=" btn btn-ghost text-xl font-light">
              Work
            </Link>
          </li>
          <li>
            <Link href="/About" className=" btn btn-ghost text-xl font-light">
              About
            </Link>
          </li>
          <li>
            <Link href="/Blog" className=" btn btn-ghost text-xl font-light">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/Resume" className=" btn btn-ghost text-xl font-light">
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
