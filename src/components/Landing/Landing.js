import  Header  from "../Header/Header";
import  Promo  from "../Promo/Promo";
import  AboutProject  from "../AboutProject/AboutProject";
import  AboutMe  from "../AboutMe/AboutMe";
import  Main  from "../Main/Main";
import  Footer  from "../Footer/Footer";
import Techs from "../Techs/Techs";


export default function Landing  ({ isLoggedIn })  {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} color={"header_landing"} />
      <Main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </Main>
      <Footer />
    </>
  );
};