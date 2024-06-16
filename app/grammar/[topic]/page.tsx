const page = ({ params: { topic } }: { params: { topic: string } }) => {
  return (
    <div className='max-w-7xl mx-auto min-h-[80vh] relative h-full'>
      <a
        href='/grammer'
        className='absolute border max-[1140px]:top-0 hover:bg-gray-700 hover:text-white font-medium rounded py-2 px-3 top-2'
      >
        Back to Grammar
      </a>
      <div className='mx-auto max-w-[800px] mt-6  max-[1140px]:pt-[50px] px-5'>
        <h2 className='text-2xl border-b-2 border-gray-400'>{topic}</h2>
        <p>
          {topic} {topic} {topic} {topic} {topic} {topic} {topic} {topic} {topic} {topic} {topic}{' '}
          {topic} {topic}{' '}
        </p>
      </div>
    </div>
  );
};

export default page;
