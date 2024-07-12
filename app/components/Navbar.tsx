import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Yash Bhalchandra</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-4">
          <li>
            <Link href="/Work">Work</Link>
          </li>
          <li>
            <Link href="/About">About</Link>
          </li>
          <li>
            <Link href="/Blog">Blog</Link>
          </li>
          <li>
            <Link href="/Resume">Resume</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
