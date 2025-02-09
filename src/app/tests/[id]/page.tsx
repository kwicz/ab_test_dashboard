'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TestCard from '@/components/TestCard';
import TestForm from '@/components/TestForm';

export default function TestDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [test, setTest] = useState<{
    id: string;
    name: string;
    client: string;
    siteArea: string;
    status: string;
    dateCreated: string;
  } | null>(null);

  useEffect(() => {
    if (!params?.id) return;

    const storedTests = localStorage.getItem('tests');
    const testData = storedTests ? JSON.parse(storedTests) : [];

    const foundTest = testData.find((t: any) => t.id === params.id);

    if (!foundTest) {
      router.push('/tests'); // Redirect only if not found
    } else {
      setTest(foundTest);
    }
  }, [params?.id, router]);

  if (!test) return <p>Loading...</p>;

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>{test.name}</h1>
      <p className='text-gray-600'>Client: {test.client}</p>
      <p className='text-gray-600'>Site Area: {test.siteArea}</p>
      <p className='text-gray-600'>Status: {test.status}</p>
      <p className='text-gray-600'>Date Created: {test.dateCreated}</p>
      <button
        onClick={() => router.push('/tests')}
        className='mt-4 text-blue-500 hover:underline'
      >
        ← Back to Tests
      </button>
    </div>
  );
}
