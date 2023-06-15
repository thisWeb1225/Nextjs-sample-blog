import { GetStaticProps } from "next";
import { getSortedProjectsData, ProjectTypeWithHtml } from "../lib/projects";

import RootLayout from "../components/rootLayout/index";
import ProjectContainer from "../components/project/index"

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


export const getStaticProps: GetStaticProps = async () => {
  const allSortedProjectsData = getSortedProjectsData();
  return {
    props: {
      allSortedProjectsData
    }
  }
}

export default Projects;