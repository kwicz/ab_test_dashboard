'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import TestCard from '@/components/TestCard';
import TestForm from '@/components/TestForm';

export default function TestsPage() {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [tests, setTests] = useState([
    {
      id: '1',
      name: 'Homepage CTA',
      client: 'Client A',
      siteArea: 'Landing Page',
      status: 'Running',
      dateCreated: '2024-02-01',
    },
    {
      id: '2',
      name: 'Checkout Button Color',
      client: 'Client B',
      siteArea: 'Checkout Page',
      status: 'Completed',
      dateCreated: '2024-01-15',
    },
    {
      id: '3',
      name: 'Homepage CTA',
      client: 'Client A',
      siteArea: 'Landing Page',
      status: 'Running',
      dateCreated: '2024-02-01',
    },
    {
      id: '4',
      name: 'Checkout Button Color',
      client: 'Client B',
      siteArea: 'Checkout Page',
      status: 'Completed',
      dateCreated: '2024-01-15',
    },
  ]);

  const addTest = (test: any) => {
    setTests([...tests, test]);
    setModalOpen(false);
  };

  const filteredTests = tests.filter(
    (test) =>
      test.name.toLowerCase().includes(filter.toLowerCase()) ||
      test.client.toLowerCase().includes(filter.toLowerCase()) ||
      test.siteArea.toLowerCase().includes(filter.toLowerCase()) ||
      test.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='container mx-auto p-6'>
      <h1 className='font-semibold text-lg mb-4'>A/B Tests</h1>
      {/* Test Form Button */}
      <div className='flex justify-between items-center mb-4'>
        <input
          type='text'
          placeholder='"Client A" or "Running"'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='border p-2 rounded w-1/3'
        />
        <button
          onClick={() => setModalOpen(true)}
          className='bg-blue-500 text-white p-2 rounded'
        >
          Add New Test
        </button>
      </div>

      {/* Test Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className='hover:underline'
            onClick={() => router.push(`/tests/${test.id}`)}
          >
            <TestCard test={test} />
          </div>
          //   <Link
          //   key={test.id}
          //   href={`/tests/${test.id}`}
          //   className='cursor-pointer'
          // >
          //   <TestCard test={test} />
          // </Link>
        ))}
      </div>

      {/* Test Form Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='bg-white mx-6 p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 relative'>
            <button
              onClick={() => setModalOpen(false)}
              className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg'
            >
              &times;
            </button>
            <h3 className='font-semibold text-black text-lg mb-2'>
              Add New Test
            </h3>
            <TestForm onSubmit={addTest} />
          </div>
        </div>
      )}
    </div>
  );
}
