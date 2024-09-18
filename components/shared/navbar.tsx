import { Button } from "@/components/ui/button"
import Link from "next/link"

const Navbar = () =>{
    return(
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
    <Link className="flex items-center justify-center" href="/">
      <span className="ml-2 text-lg font-semibold">Cricket Team Management</span>
    </Link>
    <nav className="flex items-center gap-4 sm:gap-6">
      <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
        Features
      </Link>
      <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
        About
      </Link>
      <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
        Contact
      </Link>
      <Button variant="default" size="sm">Sign in</Button>
    </nav>
  </header>
 );
}

export default Navbar;