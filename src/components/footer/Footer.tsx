import { BsFacebook } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillYoutube, AiFillInstagram } from "react-icons/ai";

export default function Footer() {
  const socialLinks = [
    { icon: <BsFacebook />, label: "Facebook" },
    { icon: <FaSquareXTwitter />, label: "Twitter" },
    { icon: <AiFillYoutube />, label: "YouTube" },
    { icon: <AiFillInstagram />, label: "Instagram" },
  ];

  const sections = [
    {
      title: "Product",
      links: ["Stocks", "Futures & Options", "Mutual Funds", "Fixed deposits"],
    },
    {
      title: "Company",
      links: ["About", "Products", "Pricing", "Careers", "Press & Media"],
    },
    {
      title: "Support",
      links: [
        "Contact",
        "Support Portals",
        "List Of Charges",
        "Downloads & Resources",
        "Videos",
      ],
    },
  ];

  return (
    <div className="max-w-screen-xl m-auto">
      <div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-3xl pb-6">
              DS<span className="text-indigo-600">Store</span>
            </p>
            <div className="flex gap-6 pb-5">
              {socialLinks.map((link, index) => (
                <a
                  href="#"
                  key={index}
                  className="text-2xl cursor-pointer hover:text-indigo-600"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </ul>
        </div>
        {sections.map((section, index) => (
          <div className="p-5" key={index}>
            <ul>
              <p className="text-gray-800 font-bold text-2xl pb-4">
                {section.title}
              </p>
              {section.links.map((link, linkIndex) => (
                <li
                  key={linkIndex}
                  className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
        <h1 className=" text-gray-800 font-semibold">
          © 2023 | Build with ❤ by{" "}
          <span className="hover:text-indigo-600 font-semibold cursor-pointer">
            abrahamLeVe{" "}
          </span>
        </h1>
      </div>
    </div>
  );
}
