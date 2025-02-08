import TestCard from '@/components/TestCard';

export default function TestsPage() {
  const tests = [
    { id: '1', name: 'Homepage CTA', status: 'Running' },
    { id: '2', name: 'Checkout Button Color', status: 'Completed' },
  ];

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>A/B Tests</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
}
