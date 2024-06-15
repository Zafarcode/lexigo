'use client';
import GrammarList from '@/components/grammer/grammer-list';
import { ScrollArea } from '@/components/ui/scroll-area';
import GrammarT from '@/components/grammer/grammar-item.types';


const grammar: GrammarT[] = [
  {
    id: 1,
    name: 'to be',
    slug: 'to-be'
  },
  {
    id: 2,
    name: 'Present Simple',
    slug: 'present-simple'
  },
  {
    id: 3,
    name: 'Present Continuous',
    slug: 'present-continuous'
  },
  {
    id: 4,
    name: 'Past Simple',
    slug: 'past-simple'
  },
  {
    id: 5,
    name: 'Irregular Verbs',
    slug: 'irregular-verbs'
  },
  {
    id: 6,
    name: 'Past Participle',
    slug: 'past-participle'
  },
  {
    id: 7,
    name: 'Present Participle',
    slug: 'present-participle'
  },
  {
    id: 8,
    name: 'Adverbs',
    slug: 'adverbs'
  },
  {
    id: 9,
    name: 'Adjectives',
    slug: 'adjectives'
  },
  {
    id: 10,
    name: 'Conjunctions',
    slug: 'conjunctions'
  },
  {
    id: 11,
    name: 'Prepositions',
    slug: 'prepositions'
  },
  {
    id: 12,
    name: 'Articles',
    slug: 'articles'
  },
  {
    id: 13,
    name: 'Nouns',
    slug: 'nouns'
  }
];

const GrammerPage = () => {
  return (
    <div className='w-full min-h-[80vh]'>
      <div className=' bg-[url("https://images.unsplash.com/photo-1455540904194-fc101941273a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=3600")] bg-cover max-[547px]:bg-[center_14rem]  bg-[center_-14rem]  h-32 w-full'></div>
      <div className='max-w-7xl mx-auto mt-4 flex items-center justify-center'>
        <div className='max-w-[900px] w-full'>
          <ScrollArea className='w-full h-[350px] rounded-lg border p-4'>
            <GrammarList grammar={grammar} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default GrammerPage;
