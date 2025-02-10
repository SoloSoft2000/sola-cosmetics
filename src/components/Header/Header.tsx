import { LangSwitch } from "./LangSwitch"
import { Logo } from "./Logo"
import { NavMenu } from "./NavMenu"

export const Header = () => {
  return (
    <header className="px-2 xl:px-4 py-2 xl:py-4 border-b-2 border-primary/25">
      <div className="container mx-auto justify-between hidden sm:flex">
        <Logo />
        <NavMenu />
        <LangSwitch />
      </div>
      <div className="container mx-auto justify-between flex sm:hidden">
        <Logo />
        <div className="flex flex-col items-center justify-around ">
          <NavMenu />
          <LangSwitch  />
        </div>
      </div>
    </header>
  )
}
