import { GetStaticProps } from "next";
import RootLayout from "../components/rootLayout/index";
import { getSortedProjectsData, SortedProjectsType } from "../lib/project";

type Props = {
  allSortedProjectsData: SortedProjectsType[],
}

const Projects: React.FC = ({allSortedProjectsData}: Props) => {

  return (
    <RootLayout>
      
    </RootLayout>
  )
}

export default Projects;

export const getStaticPorps: GetStaticProps = async () => {
  const allSortedProjectsData = getSortedProjectsData();
  return {
    props: {
      allSortedProjectsData
    }
  }
}