import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

export async function getStaticProps() {
  const files = fs.readdirSync('posts');

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
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

export default function Home({ posts }) {
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
              <div className='p-2 flex-none w-325 h-170'><Image
                width={325}
                height={170}
                alt={frontmatter.title}
                src={`/${frontmatter.socialImage}`}
              /></div>
              
              
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
