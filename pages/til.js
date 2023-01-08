import fs from 'fs';
import matter from 'gray-matter';

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
    <div className="">
      {til_posts.map(({ slug, frontmatter }) => (
        <div key={slug} class="">
          <div class="box is-rounded p-5">
           
            <div class="columns">
              <div class="column">
            <p class="title is-3 is-underlined" href={`/post/${slug}`}>{frontmatter.title}</p>
            </div>
            <div className="column">
              {frontmatter.tags.map((tag) => (
                <div className="button is-small is-static mr-1 is-pulled-right">
                  {tag}
                </div>
              ))}
              
            </div>
            </div>
            <p class="is-size-5 pb-4">{frontmatter.summary}</p>
            <a class="button is-primary is-small" href={`/post/${slug}`}>
              <span>Read the post</span>
            </a>

          </div>
        </div>
      ))}
    </div>
  );
}
