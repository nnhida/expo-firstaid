'use server';

import Ui from './ui';
import { getPostAll } from '@/api/post';

// Import other components similarly

export default async function HomePage() {

  const post = await getPostAll()

  return (
   <Ui postListHome={post}/>
  );
}