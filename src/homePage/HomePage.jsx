// import Loader from "../loader/Loader";
import AddOns from "./AddOns";
import Categories from "./Categories";
import Feedbacks from "./Feedbacks";
import InfoEdu from "./InfoEdu";
import LearnPress from "./LearnPress";
import ListArticles from "./ListArticles";
import ListCourses from "./ListCourses";
import PostComment from "./PostComment";
import Student from "./Student";
import ThemeWorkPress from "./ThemeWorkPress";

const HomePage = () => {
  return (
    <div>
      <PostComment></PostComment>
      <Categories></Categories>
      <ListCourses></ListCourses>
      <AddOns></AddOns>
      <InfoEdu></InfoEdu>
      <LearnPress></LearnPress>
      <ThemeWorkPress></ThemeWorkPress>
      <Feedbacks></Feedbacks>
      <Student></Student>
      <ListArticles></ListArticles>
    </div>
  );
};

export default HomePage;
