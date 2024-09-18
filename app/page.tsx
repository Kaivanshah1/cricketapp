import Link from "next/link"
import { Users, Calendar, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/shared/navbar"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage Your Cricket Team Like a Pro
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Streamline your team management, track player performance, and organize matches with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/teams"> 
                <Button size="lg" variant="default">Get Started</Button>
                </Link>
                <Button variant="outline" size="lg">Learn more</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6" id="features">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 text-center">
              <div className="flex flex-col items-center space-y-3">
                <Users className="h-12 w-12" />
                <h3 className="text-lg font-bold">Team Management</h3>
                <p className="text-sm text-muted-foreground">
                  Easily manage your team roster, roles, and player information.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <Calendar className="h-12 w-12" />
                <h3 className="text-lg font-bold">Squad Management</h3>
                <p className="text-sm text-muted-foreground">
                Allow team managers to add, edit, and remove players from their squad.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <BarChart className="h-12 w-12" />
                <h3 className="text-lg font-bold">Player Profiles</h3>
                <p className="text-sm text-muted-foreground">
                Include detailed profiles for each player, featuring statistics, batting/bowling averages, profiles, and career highlights.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Cricket Community</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay updated with the latest features, tips, and cricket management strategies.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our terms and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 Cricket Team Management. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}