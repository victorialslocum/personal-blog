import fs from 'fs';
import matter from 'gray-matter';
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

export default function TIL({ posts }) {
  let til_posts = []
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].frontmatter.tags.includes('TIL')) {
      til_posts.push(posts[i])
    }
  }
  return (
    <div className=''>
      {til_posts.slice(0, 5).map(({ slug, frontmatter }) => (
        <div key={slug} className="overflow-hidden flex flex-col pb-10">
          <Link href={`/post/${slug}`}>
            <a>
<div className='container mx-auto lg:px-60'>
                <div className="text-left flex-auto p-2 pl-9">
                  <div className="flex py-4">
                    <h1 className="text-2xl font-bold underline decoration-main">
                      {frontmatter.title}
                    </h1>
                    {/* <div className="flex-none text-xl ml-6 mt-0.5 px-3 bg-gray-200 rounded-md">/post/TIL-2023-01-01
                      {frontmatter.date}
                    </div> */}
                  </div>

                  <p className="text-lg pr-5">{frontmatter.summary}</p>
                  <div className="flex pt-5">
                    {frontmatter.tags.map((tag) => (
                      <div className="flex-none px-2 mr-2 bg-main-light rounded-md">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
