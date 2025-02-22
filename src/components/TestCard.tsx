import Link from 'next/link';

export default function TestCard({
  test,
}: {
  test: { id: string; name: string; status: string; client: string };
}) {
  return (
    <div className='border p-4 rounded-lg shadow mb-4'>
      <h2 className='text-lg font-semibold'>{test.name}</h2>
      <p className='text-sm text-gray-600'>Client: {test.client}</p>
      <p className='text-sm text-gray-600'>Status: {test.status}</p>
      <Link
        href={`/tests/${test.id}`}
        className='text-blue-500 hover:underline'
      >
        View Details →
      </Link>
    </div>
  );
}
