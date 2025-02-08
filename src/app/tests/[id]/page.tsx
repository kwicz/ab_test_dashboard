'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function TestDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [test, setTest] = useState<{
    id: string;
    name: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    if (!params?.id) return;

    // Simulated fetch (replace with real API call later)
    const testData = [
      { id: '1', name: 'Homepage CTA', status: 'Running' },
      { id: '2', name: 'Checkout Button Color', status: 'Completed' },
    ];
    const foundTest = testData.find((t) => t.id === params.id);
    if (!foundTest) {
      router.push('/tests'); // Redirect if not found
    } else {
      setTest(foundTest);
    }
  }, [params?.id, router]);

  if (!test) return <p>Loading...</p>;

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>{test.name}</h1>
      <p className='text-gray-600'>Status: {test.status}</p>
      <button
        onClick={() => router.push('/tests')}
        className='mt-4 text-blue-500 hover:underline'
      >
        ← Back to Tests
      </button>
    </div>
  );
}
