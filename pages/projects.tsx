import { GetStaticProps } from "next";
import { getSortedProjectsData, SortedProjectsType } from "../lib/projects";
import RootLayout from "../components/rootLayout/index";

type Props = {
  allSortedProjectsData: SortedProjectsType[],
}

const Projects: React.FC = ({allSortedProjectsData}: Props) => {

  return (
    <RootLayout>
      <div className="px-2 sm:px-8 md:px-24 lg:px-32 
       flex flex-col mt-32">
      {allSortedProjectsData.map((project) => <div>{project.title}</div>)}
      </div>
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