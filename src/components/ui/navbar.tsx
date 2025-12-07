
const Navbar = () => {
    return(
<div className="overflow-x-hidden w-full">
  <nav className="sticky top-0 z-50 w-full bg-[#007834] text-white shadow-lg">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
      
      {/* Logo */}
      <a
        href="#"
        className="text-2xl font-semibold tracking-wide hover:opacity-90 transition-opacity"
      >
        Zant
      </a>

      {/* Mobile toggle */}
      <button
        type="button"
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/70 hover:bg-white hover:text-[#007834] transition"
        data-collapse="#navbar-menu"
        aria-label="Toggle navigation"
      >
        <span className="icon-[tabler--menu-2] collapse-open:hidden size-5"></span>
        <span className="icon-[tabler--x] collapse-open:block hidden size-5"></span>
      </button>

      {/* Menu */}
      <div
        id="navbar-menu"
        className="hidden md:flex md:items-center md:gap-6"
      >
        <ul className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-lg font-medium">
          <li>
            <a
              href="#"
              className="px-3 py-1 rounded-lg hover:bg-white/20 active:bg-white/30 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-1 rounded-lg hover:bg-white/20 active:bg-white/30 transition"
            >
              Guzik
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
    )
}

export default Navbar