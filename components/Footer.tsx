import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <div className=" w-[97%] flex items-center justify-between md:max-w-[500px] bg-[#515151] p-4 rounded-lg shadow-lg text-lg ">
      <div className="flex items-center justify-between text-sm w-full">
        <p>Desenvolvido por Marco Hansen</p>
        <div className="flex items-center gap-2">
          <Link target="blank" href="https://github.com/marcoahansen">
            <FaGithub className="hover:text-[#FE76FF] transition-all w-6 h-6" />
          </Link>
          <Link
            target="blank"
            href="https://www.linkedin.com/in/marco-a-hansen/"
          >
            <FaLinkedinIn className="hover:text-[#FE76FF] transition-all w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
