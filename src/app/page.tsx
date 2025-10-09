import Link from "next/link";
import Image from "next/image";
import {IoIosArrowDown, IoLogoFacebook, IoLogoGithub} from "react-icons/io";
import CocktailsList from "~/components/CocktailsList";

export default function HomePage() {
  return (
    <main className={"px-[14%] text-light-blue"}>
      <div className={"py-32 lg:gap-36 max-lg:gap-20 flex flex-col items-center min-h-screen h-screen justify-center"}>
        <div className={"flex lg:flex-row max-lg:gap-10 flex-col w-full items-center justify-between"}>
          <div className={"flex flex-col gap-0"}>
            <h1 className={"font-bold text-8xl max-sm:text-6xl text-light-blue"}><span className={"text-snowy drop-shadow-snowy/40 drop-shadow-md"}>SOLVRO</span><br></br>Cocktails
            </h1>
            <div className={"flex flex-row gap-2 text-snowy text-4xl"}>
              <Link href={"https://www.facebook.com/knsolvro"} target={"_blank"} className={"hover:opacity-100 opacity-75 transition-all duration-200"}><IoLogoFacebook/></Link>
              <Link href={"https://github.com/Solvro"} target={"_blank"} className={"hover:opacity-100 opacity-75 transition-all duration-200"}><IoLogoGithub/></Link>
            </div>
          </div>
          <Image className={"animate-bouncing lg:w-[40%] h-auto"} src={"/images/logo_solvro_mono.png"} alt={"Solvro Logo"} width={429}
                 height={337}></Image>
        </div>
        <div className={"flex flex-row max-lg:flex-col justify-between items-center xl:w-full max-lg:gap-8"}>
          <p className={"text-xl text-left text-snowy max-lg:text-center text-pretty lg:w-[60%]"}>
            Witajcie na stronie, gdzie będziecie mogli wyszukać swój ulubiony koktajl, a może sprawdzić inne
            koktajle i dodać do swojej listy!
          </p>
          <Link href={"#cocktails"}
                className={"space-x-2 hover:brightness-125 transition-all duration-300 border-1 border-cloud bg-dark rounded-lg flex flex-row items-center px-4"}>
            <p>Zobacz asortyment</p>
            <IoIosArrowDown className={"text-5xl drop-shadow-snowy/85"}/>
          </Link>
        </div>
      </div>

      <div id={"cocktails"} className={"py-8 max-md:py-12"}>
        <CocktailsList />
      </div>

      <div className={"w-full mt-10 "}>

      </div>
    </main>
  );
}