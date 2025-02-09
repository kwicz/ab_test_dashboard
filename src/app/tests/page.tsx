'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import TestCard from '@/components/TestCard';
import TestForm from '@/components/TestForm';

const dummyData = [
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
    name: 'Pricing Page Headline',
    client: 'Client C',
    siteArea: 'Pricing Page',
    status: 'Pending',
    dateCreated: '2024-03-10',
  },
];

export default function TestsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [tests, setTests] = useState(dummyData);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState<Test | undefined>(undefined);

  useEffect(() => {
    const storedTests = localStorage.getItem('tests');
    if (storedTests) {
      setTests(JSON.parse(storedTests));
    } else {
      localStorage.setItem('tests', JSON.stringify(dummyData));
    }
  }, []);

  useEffect(() => {
    if (tests.length > 0) {
      localStorage.setItem('tests', JSON.stringify(tests));
    }
  }, [tests]);

  interface Test {
    id: string;
    name: string;
    client: string;
    siteArea: string;
    status: string;
    dateCreated: string;
  }

  const pushToGTM = (event: string, data: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event, ...data });
    }
  };

  const addTest = (test: Test) => {
    const updatedTests = [...tests, test];
    setTests(updatedTests);
    localStorage.setItem('tests', JSON.stringify(updatedTests));
    pushToGTM('ab_test_created', {
      testName: test.name,
      client: test.client,
      status: test.status,
    });
    setModalOpen(false);
  };

  const updateTest = (updatedTest: Test) => {
    const updatedTests = tests.map((test) =>
      test.id === updatedTest.id ? updatedTest : test
    );
    setTests(updatedTests);
    localStorage.setItem('tests', JSON.stringify(updatedTests));
    pushToGTM('ab_test_updated', {
      testName: updatedTest.name,
      client: updatedTest.client,
      status: updatedTest.status,
    });
    setUpdateModalOpen(false);
  };

  const deleteTest = (id: string) => {
    const deletedTest = tests.find((test) => test.id === id);
    const updatedTests = tests.filter((test) => test.id !== id);
    setTests(updatedTests);
    localStorage.setItem('tests', JSON.stringify(updatedTests));
    pushToGTM('ab_test_deleted', {
      testName: deletedTest?.name,
      client: deletedTest?.client,
    });
  };

  const filteredTests = tests.filter(
    (test) =>
      test.name.toLowerCase().includes(filter.toLowerCase()) ||
      test.client.toLowerCase().includes(filter.toLowerCase()) ||
      test.siteArea.toLowerCase().includes(filter.toLowerCase()) ||
      test.status.toLowerCase().includes(filter.toLowerCase())
  );

  const openUpdateModal = (test: {
    id: string;
    name: string;
    client: string;
    siteArea: string;
    status: string;
    dateCreated: string;
  }) => {
    setCurrentTest(test);
    setUpdateModalOpen(true);
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='flex justify-between items-center mb-4'>
        <input
          type='text'
          placeholder='Filter tests...'
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

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className='cursor-pointer'
            onClick={() => router.push(`/tests/${test.id}`)}
          >
            <TestCard test={test} />
            <div className='space-x-2'>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openUpdateModal(test);
                }}
                className='bg-yellow-500 text-white p-2 rounded'
              >
                Update
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTest(test.id);
                }}
                className='bg-red-500 text-white p-2 rounded'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 relative'>
            <button
              onClick={() => setModalOpen(false)}
              className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg'
            >
              &times;
            </button>
            <TestForm onSubmit={addTest} />
          </div>
        </div>
      )}
      {isUpdateModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 relative'>
            <button
              onClick={() => setUpdateModalOpen(false)}
              className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg'
            >
              &times;
            </button>
            <h2 className='text-xl font-bold mb-4 text-black'>Update Test</h2>
            <TestForm onSubmit={updateTest} initialData={currentTest} />
          </div>
        </div>
      )}
    </div>
  );
}
