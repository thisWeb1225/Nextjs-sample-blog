import { GetStaticProps } from "next";
import { getSortedProjectsData, ProjectTypeWithHtml } from "../lib/projects";

import RootLayout from "../components/rootLayout/rootLayout";
import ProjectContainer from "../components/project/projectContainer";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {
  allSortedProjectsData: ProjectTypeWithHtml[],
}

const Projects: React.FC = ({allSortedProjectsData}: Props) => {

  return (
    <RootLayout>
      <ProjectContainer allSortedProjectsData={allSortedProjectsData}></ProjectContainer>
    </RootLayout>
  )
}


export const getStaticProps: GetStaticProps = async ({locale}) => {
  const allSortedProjectsData = getSortedProjectsData();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      allSortedProjectsData
    }
  }
}

export default Projects;