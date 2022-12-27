import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='bg-yellow-100 mb-8 py-4'>
        <div className='container mx-auto flex justify-center'>
          <Link href='/'>
            <a>🌻</a>
          </Link>
          <span className='mx-auto'>Welcome to my blog!</span>{' '}
        </div>
      </header>
      <main className='container mx-auto flex-1'>{children}</main>
      <footer className='bg-red-100 mt-8 py-4'>
        <div className='container mx-auto flex justify-center'>
        From Victoria with ❤️
        </div>
      </footer>
    </div>
  );
}
