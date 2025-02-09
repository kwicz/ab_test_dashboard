'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TestCard from '@/components/TestCard';

export default function HomePage() {
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);

  interface Test {
    id: string;
    name: string;
    client: string;
    siteArea: string;
    status: string;
    dateCreated: string;
  }

  useEffect(() => {
    const storedTests = localStorage.getItem('tests');
    setTests(storedTests ? JSON.parse(storedTests) : []);
  }, []);

  console.log('deployment check');
  const runningTests = tests.filter((test) => test.status === 'Running').length;
  const completedTests = tests.filter(
    (test) => test.status === 'Completed'
  ).length;
  const pendingTests = tests.filter((test) => test.status === 'Pending').length;

  return (
    <div className='container mx-auto p-6'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold'>Welcome to A/B Test Manager</h1>
        <p className='text-gray-600 mt-2'>
          Easily create, manage, and analyze your A/B tests.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
        <div className='p-6 bg-blue-100 rounded-lg shadow'>
          <p className='text-lg font-semibold text-black'>Running Tests</p>
          <p className='text-2xl font-bold text-black'>{runningTests}</p>
        </div>
        <div className='p-6 bg-green-100 rounded-lg shadow'>
          <p className='text-lg font-semibold text-black'>Completed Tests</p>
          <p className='text-2xl font-bold text-black'>{completedTests}</p>
        </div>
        <div className='p-6 bg-yellow-100 rounded-lg shadow'>
          <p className='text-lg font-semibold text-black'>Pending Tests</p>
          <p className='text-2xl font-bold text-black'>{pendingTests}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='flex justify-center mt-6 gap-4'>
        <button
          onClick={() => router.push('/tests')}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          View All Tests
        </button>
        <button
          onClick={() => router.push('/tests/new')}
          className='bg-green-500 text-white px-4 py-2 rounded'
        >
          Create New Test
        </button>
      </div>

      {/* Recent Tests */}
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Recent Tests</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {tests.slice(0, 3).map((test) => (
            <div
              key={test.id}
              className='cursor-pointer'
              onClick={() => router.push(`/tests/${test.id}`)}
            >
              <TestCard test={test} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
