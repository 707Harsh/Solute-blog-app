import { useState, useRef, useEffect } from 'react'
import { FiSearch, FiEdit3 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
          if (
            isMenuOpen &&
            menuRef.current &&
            !menuRef.current.contains(e.target as Node)
          ) {
            setIsMenuOpen(false)
          }
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
      }, [isMenuOpen])
    
      const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        navigate('/')
      }

    const toggleMobileSearch = () => {
        setMobileSearchOpen((open) => !open);
    };

    const navigate = useNavigate()

    const username = localStorage.getItem('name') || ""

    return (
        <>
            <nav className="fixed top-0 left-0 z-50 w-full border-b px-6 py-3 flex items-center justify-between bg-white mb-6">
                {/* Left: Logo and Search */}
                <div className="flex items-center gap-4">
                    <button onClick={()=>navigate('/blogs')} className="cursor-pointer text-3xl font-serif font-bold">Solute</button>

                    {/* Desktop search */}
                    <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1 w-60">
                        <FiSearch className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none text-sm w-full"
                        />
                    </div>

                    {/* Mobile search icon */}
                    <button
                        className="md:hidden w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                        onClick={toggleMobileSearch}
                    >
                        <FiSearch className="text-gray-600 text-md" />
                    </button>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 text-sm">
                    <button onClick={() => navigate('/publish')} className="font-medium bg-green-600 text-white rounded-xl px-3 h-8 flex items-center gap-1 hover:bg-green-700 transition duration-200">
                        <FiEdit3 />
                        <span className="hidden sm:inline">Write</span>
                    </button>
                    <button onClick={()=> setIsMenuOpen((isopen)=>!isopen)} className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full ">
                        <span className="font-medium text-gray-600 ">{username[0]}</span>
                    </button>
                </div>
                {isMenuOpen && (
                    <div
                    ref={menuRef}
                    className="absolute right-0 mt-36 w-40 bg-white border rounded shadow-lg py-2"
                    >
                    <div className="px-4 py-2 text-gray-800 font-medium border-b">
                        {`Hello, ${username}`}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                        Log out
                    </button>
                    </div>
                )}
            </nav>


            {/* Mobile search bar below navbar */}
            {mobileSearchOpen && (
                <div className="mt-16 md:hidden w-full  px-4 py-2 border-b animate-slide-down">
                    <div className="flex items-center border rounded-full px-3 py-1">
                        <FiSearch className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search Solute"
                            className="outline-none flex-1 text-sm"
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
