import fs from 'fs';
import matter from 'gray-matter';
import Image from "next/image";

var hljs = require('highlight.js'); // https://highlightjs.org

// Actual default values
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function PostPage({ frontmatter, content }) {
  return (
    <div className='prose px-5 mx-auto pb-10'>
      <h1 className='underline decoration-main'>{frontmatter.title}</h1>
      <div className='flex mb-10'><div className="text-xl px-3 mr-5 bg-gray-200 rounded-md">
                      {frontmatter.date}
                    </div><div className="flex-none flex">
                  {frontmatter.tags.map((tag) => (
                    <div className="flex-none px-2 mr-2 bg-main-light rounded-md">
                      {tag}
                    </div>
                  ))}
                </div></div>
      
      <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
    </div>
  );
}
