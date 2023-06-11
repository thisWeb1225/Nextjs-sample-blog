import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';

const projectsDirectory = path.join(process.cwd(), 'projects');

/**
 * Sorted Projects
 */
export type SortedProjectsType = {
  id: string,
  title: string,
  date: string,
  demoUrl?: string,
  githubUrl?: string,
};

export function getSortedProjectsData(): SortedProjectsType[] {

  const fileNames = fs.readdirSync(projectsDirectory);
  
  const allProjectsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
     const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the project metadata section
    const matterResult = matter(fileContents);

    // Combine the data with id
    return {
      id,
      ...(matterResult.data as {
        title: string,
        date: string,
        demoUrl?: string,
        githubUrl?: string
      })
    };
  });

  // return sorted porjects
  return allProjectsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  })
}

/**
 * Project id for static path
 */
export function getAllProjectsIds() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

/**
 * project data
 */
// type
export type ProjectDataType = SortedProjectsType & {contentHtml: string};

export async function getProjectData (id: string): Promise<ProjectDataType> {
  const fullPath = path.join(projectsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as {
      title: string,
      date: string,
      demoUrl?: string,
      githubUrl?: string,
    })
  }
}