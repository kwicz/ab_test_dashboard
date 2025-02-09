'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='bg-gray-900 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className='text-xl font-bold'>
          A/B Test Manager
        </Link>
        <div className='space-x-4'>
          <Link href='/tests' className='hover:underline'>
            All Tests
          </Link>
          <Link href='/tests/new' className='hover:underline'>
            Create Test
          </Link>
        </div>
      </div>
    </nav>
  );
}
