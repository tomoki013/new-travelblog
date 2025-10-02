const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'src', 'posts');
const cachePath = path.join(process.cwd(), '.posts.cache.json');

async function generatePostsCache() {
  console.log('Generating posts cache...');
  try {
    const fileNames = await fs.readdir(postsDirectory);
    const postsCache = {};

    for (const fileName of fileNames) {
      if (path.extname(fileName) !== '.md') {
        continue;
      }

      const slug = fileName.replace(/\.md$/, '').toLowerCase();
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');

      // We only need the main content for the AI prompt, not the frontmatter.
      const { content } = matter(fileContents);
      postsCache[slug] = content;
    }

    await fs.writeFile(cachePath, JSON.stringify(postsCache));
    console.log('✅ Successfully generated posts cache at .posts.cache.json');
  } catch (error) {
    console.error('Error generating posts cache:', error);
    process.exit(1);
  }
}

generatePostsCache();