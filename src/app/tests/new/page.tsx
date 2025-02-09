'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import TestForm from '@/components/TestForm';

export default function NewTestPage() {
  const router = useRouter();
  const [tests, setTests] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // Prevent premature rerender

  useEffect(() => {
    const storedTests = localStorage.getItem('tests');
    if (storedTests) {
      setTests(JSON.parse(storedTests));
    }
    setIsLoaded(true); // Ensure data is fully loaded before rendering
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tests', JSON.stringify(tests));
    }
  }, [tests, isLoaded]);

  const addTest = (test: any) => {
    const updatedTests = [...tests, test];
    setTests(updatedTests);
    localStorage.setItem('tests', JSON.stringify(updatedTests));
    router.push('/tests');
  };

  // Prevent rendering before state is fully initialized
  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Create New A/B Test</h1>
      <TestForm onSubmit={addTest} />
    </div>
  );
}
