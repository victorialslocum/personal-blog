import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';

export async function getStaticProps() {
  const files = fs.readdirSync('til');

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`til/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function TIL({ posts }) {
  return (
    <div className=''>
      {posts.map(({ slug, frontmatter }) => (
        <div
          key={slug}
          className='overflow-hidden flex flex-col'
        >
          <Link href={`/post/${slug}`}>
          <a>
            <div className='flex'>
            
              
              
              <div className='text-left flex-auto p-2 pl-9'>
              <h1 className='text-2xl font-bold pb-3 pt-3'>{frontmatter.title}</h1>
              <p className='text-lg'>{frontmatter.summary}</p>
              <div className='flex pt-5'>{frontmatter.tags.map((tag)=>(<div className='flex-none px-2 mr-2 bg-slate-200 rounded-md'>{tag}</div>))}</div>
              </div>
              
            
              </div>
            </a>
            
          </Link>
        </div>
      ))}
    </div>
  );
}
