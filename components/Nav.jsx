'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    fetchProviders();
  }, [])

  return (
    <nav className="flex justify-between w-full mb-16 pt-3 space-x-2">
      <Link href="/" className="flex justify-center space-x-1">
        <Image src="/assets/images/logo.svg" alt="Share Prompts Logo" width={30} height={30} className="object-contain"/>
        <p className="hidden md:align-middle md:logo_text md:block">Share Prompts</p>
      </Link>

      {/* navigation*/}
      <div className="hidden md:flex ">
        {status === "authenticated" ? (
          <div className="flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0">
            <Link href="/create-promt" className="black_btn">
              Create Promt
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image src={session?.user.image} alt="Profile" width={37} height={37} className="rounded-full"/>
            </Link>
          </div>
        ):(
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button 
                  type="button"
                  key={provider.name}
                  onClick={()=> signIn(provider.id)}
                  className="black_btn"
                  >
                  Sign in with {provider.name}
                </button>
              ))}
          </>)}
      </div>

      {/* mobile navigation */}
      <div className="flex relative md:hidden">
        {status === "authenticated" ? (
					<div className="flex">
						<Image 
              src={session?.user.image}
              alt="Profile" 
              width={37} 
              height={37} 
              className="rounded-full" 
              onClick={() => setToggleDropdown(!toggleDropdown)} 
              />

						{toggleDropdown && (
							<div className="dropdown">
								<Link 
									href="/profile" 
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)} 
									>
									My Profile
								</Link>
                <Link 
									href="/create-prompt" 
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)} 
									>
									Create Prompt
								</Link>
                <button 
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn"
                  >
                  Sign Out
                </button>
							</div>
						)}
					</div>
				) : (<>
					{providers &&
						Object.values(providers).map((provider) => (
							<button
								type="button"
								key={provider.name}
								onClick={() => signIn(provider.id)}
								className="black_btn"
							>
								Sign in with {provider.name}
							</button>
						))}
				</>)}
      </div>
    </nav>
  )
}

export default Nav

