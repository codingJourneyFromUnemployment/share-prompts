// 1.当页面初次加载时，useSession 钩子被调用，它会查找本地 cookie 中的 session。如果这是首次加载并且用户还没有登录，那么 session 信息将是空的。

// 2.因为 useSession 是响应式的，它会试图从 /api/auth/session 端点获取 session 数据，这会触发您的 async session 回调。但是，由于用户尚未登录，所以没有有效的 session，这意味着此时的 session.user.email 是 undefined。因此，您的回调应当考虑到这一点，避免在此时查询数据库。

// 3.接下来，您的 useEffect 钩子被触发，调用 getProviders API 来获取所有的 authentication providers。这个流程主要用于前端渲染登录按钮。

// 4.用户点击登录按钮并选择 Google 进行登录。登录成功后，next-auth 会设置一个包含 session 信息的 cookie。

// 5.由于 session 改变（从无到有），useSession 会重新获取 session，从而再次触发 async session 回调。这时，您的回调使用新的 session 信息中的 user.email 来查询数据库，并更新 session 的 user.id。

'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    fetchProviders();
  }, [])

  return (
    <nav className="flex justify-between w-full mb-16 pt-3 space-x-2">
      <Link href="/" className="flex justify-center items-center space-x-1">
        <Image src="/assets/images/logo.svg" alt="Share Prompts Logo" width={30} height={30} className="object-contain"/>
        <p className="hidden md:align-middle md:logo_text md:block">Share Prompts</p>
      </Link>

      {/* navigation*/}
      <div className="hidden md:flex ">
        {status === "authenticated" ? (
          <div className="flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>

            <button 
              type="button" 
              onClick={() => {
                    signOut()
                    router.push("/")
                  }} 
              className="outline_btn"
              >
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
                    router.push("/")
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

