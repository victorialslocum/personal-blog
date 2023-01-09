import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 mb-8 py-4">
        <div className="container mx-auto flex">
          <div className="flex-none text-5xl pt-2 pr-5"><a href='/'>🥦</a></div>
          <div className="flex-none">
          <Link href="/">
            <a className="text-3xl">my learnings and doings</a>
          </Link>
          <div className="flex pt-3">
            <div className="flex-none px-2 mr-2 bg-main-light font-bold rounded-md">
              <Link href="/blog">
                <a>blog</a>
              </Link>
            </div>
            <div className="flex-none px-2 mr-2 bg-main-light font-bold rounded-md">
              <Link href="/til">
                <a>til</a>
              </Link>
            </div>
            <div className="flex-none px-2 mr-2 bg-main-light font-bold rounded-md">
              <Link href="/projects">
                <a>projects</a>
              </Link>
            </div>
            <div className="flex-none px-2 mr-2 bg-main-light font-bold rounded-md">
              <Link href="https://victoriaslocum.com">
                <a>about me</a>
              </Link>
            </div>
          </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="bg-gray-200 mt-8 py-4">
        <div className="container mx-auto flex justify-center">
          From Victoria with ❤️
        </div>
      </footer>
    </div>
  );
}
