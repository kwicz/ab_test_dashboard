'use client';
import { useState } from 'react';
import TestCard from '@/components/TestCard';
import TestForm from '@/components/TestForm';

export default function TestsPage() {
  const [tests, setTests] = useState([
    { id: '1', name: 'Homepage CTA', status: 'Running' },
    { id: '2', name: 'Checkout Button Color', status: 'Completed' },
  ]);

  const addTest = (test: any) => {
    setTests([...tests, test]);
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>A/B Tests</h1>
      <TestForm onSubmit={addTest} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
}
