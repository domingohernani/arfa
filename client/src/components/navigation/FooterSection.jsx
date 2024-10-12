import { Footer } from "flowbite-react";
import logo from "../../assets/logos/logo_green.svg";

export function FooterSection() {
  return (
    <Footer container className="bg-arfagray">
      <div className="w-full mx-auto text-center">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <img src={logo} alt="ARFA" className="w-auto h-14" />
          <Footer.LinkGroup className="flex gap-4">
            <a href="#" className="text-arfablack">
              About
            </a>
            <a href="#" className="text-arfablack">
              Privacy Policy
            </a>
            <a href="#" className="text-arfablack">
              Licensing
            </a>
            <a href="#" className="text-arfablack">
              Contact
            </a>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        {/* <Footer.Copyright href="#" by="ARFA™" year={2024} /> */}
        {/* tempo */}
        <Footer.Copyright href="#" by="ARIA™" year={2024} />
      </div>
    </Footer>
  );
}
