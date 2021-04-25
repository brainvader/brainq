import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getMdxFiles } from './mdx'
import { kebabCase } from './utils'

const root = process.cwd()

export async function getAllTags(type) {
  const files = getMdxFiles(path.join(root, 'data', type))

  let tagCount = {}

  const frontMatters = files.map(file => matter.read(file, {
    excerpt: true,
    excerpt_separator: "<!-- sep -->",
  }))
  .filter(({data}) => data.tags)
  .map(({ data }) => {
      data.tags
      .map(tag => kebabCase(tag))
      .map((tag) => {
        if (tag in tagCount) {
          tagCount[tag] += 1
        } else {
          tagCount[tag] = 1
        }
      })
  })

  return tagCount
}
