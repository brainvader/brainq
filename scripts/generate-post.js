const fs = require("fs").promises;
const path = require("path");

const formatDate = () => {
  const clock = new Date();
  return clock.toISOString();
};

const createPostId = () => {
  const randNum = Math.floor(Math.random() * 1000000);
  const postId = randNum.toString().padStart("6", "0");
  return postId;
}

const createFrontMatter = (timeStamp) => {
  const title = `title:`;
  const description = `description:`;
  const date = `date: '${timeStamp}'`;
  return `---` + `\n` +
    title + `\n` +
    description + `\n` +
    date + `\n` +
    `---`;
};

async function createDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
    .catch((e) => console.error(e));
}

async function writeMd(path, content) {
  await fs.writeFile(path, content)
    .catch((e) => console.error(e));
}

const main = async function () {
  // generate time stamp
  const timeStamp = formatDate();
  const [yyyy, mm, dd ] = timeStamp.split('T')[0].split('-')

  // generate a path to post like yyyy/mm/dd/[filename].mdx
  const postDir = path.join(`./data`, `posts`, `${yyyy}`, `${mm}`, `${dd}`);
  await createDir(postDir);

  // generate and output a markdown file with randomw 6 digits as its name 
  const postId = createPostId();
  const markdownFile = path.join(`${postDir}`, `${postId}.mdx`);
  const frontMatter = createFrontMatter(timeStamp);
  await writeMd(markdownFile, frontMatter)
};

main();
