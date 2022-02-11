import Link from 'next/link'

const Header = () => {
    return (
        <header className="mx-auto flex max-w-7xl justify-between p-5">
            <div className="flex items-center space-x-5">
                <Link href="/">
                    <img
                        className="w-44 cursor-pointer object-contain"
                        src="https://links.papareact.com/yvf"
                        alt="logo"
                    />
                </Link>
                <ul className="hidden items-center space-x-5 md:inline-flex">
                    <li>About</li>
                    <li>Contact</li>
                    <li className="rounded-full bg-green-600 px-4 py-1 text-white">
                        Follow
                    </li>
                </ul>
            </div>

            <ul className="flex items-center space-x-5 text-green-600">
                <li>Sign In</li>
                <li className="rounded-full border border-green-600 px-4 py-1">
                    Get Started
                </li>
            </ul>
        </header>
    )
}

export default Header
