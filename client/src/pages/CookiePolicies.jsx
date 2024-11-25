import React from "react";
import { FooterSection } from "../components/navigation/FooterSection";
import { Link } from "react-router-dom";
import logo from "../assets/logos/logo_black.svg";
import profile from "../assets/icons/profile-black.svg";
import search from "../assets/icons/search.svg";
import heart from "../assets/icons/heart-black.svg";
import { NotificationDrawer } from "../components/dynamic/NotificationDrawer";

const CookiePolicies = () => {
  return (
    <section>
      <section className="mx-6 my-3">
        <div className="grid items-center grid-cols-11 grid-rows-2 gap-2 md:grid-rows-1">
          <div className="flex justify-start col-span-1 ">
            <Link to="/">
              <img src={logo} alt="ARFA" className="h-auto min-w-16 md:w-24" />
            </Link>
          </div>
          <div className="flex items-center justify-end col-start-11 ">
            <NotificationDrawer />
            <Link to={"/profile/user-profile"} className="mr-3 ">
              <img
                src={profile}
                alt="profile"
                className="w-4 h-auto mx-3 cursor-pointer"
              />
            </Link>
            <Link to={"/wishlist"}>
              <button className="flex items-center justify-center gap-2 px-4 bg-transparent focus:outline-none md:px-5">
                <span className="text-xs font-normal text-arfablack md:text-sm">
                  Wishlist
                </span>
                <img
                  src={heart}
                  alt="wishlist"
                  className="w-3 h-auto cursor-pointer md:w-4"
                />
              </button>
            </Link>
            <Link to={"/cart"}>
              <button className="flex items-center justify-center gap-2 px-4 bg-transparent focus:outline-none md:px-4">
                <span className="text-xs font-normal text-arfablack md:text-sm">
                  Cart
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill=""
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                  className="w-3 h-auto cursor-pointer text-arfablack md:w-4"
                >
                  <path d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z" />
                  <circle cx="7" cy="22" r="2" />
                  <circle cx="17" cy="22" r="2" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section className="w-4/5 max-w-5xl mx-auto">
        <h1 className="font-semibold">Cookies Policy</h1>
        <p className="leading-loose">Last updated: November 25, 2024</p>
        <p className="leading-loose">
          This Cookies Policy explains what Cookies are and how We use them. You
          should read this policy so You can understand what type of cookies We
          use, or the information We collect using Cookies and how that
          information is used. This Cookies Policy has been created with the
          help of the{" "}
          <a
            href="https://www.freeprivacypolicy.com/free-cookies-policy-generator/"
            target="_blank"
          >
            Free Cookies Policy Generator
          </a>
          .
        </p>
        <p className="leading-loose">
          Cookies do not typically contain any information that personally
          identifies a user, but personal information that we store about You
          may be linked to the information stored in and obtained from Cookies.
          For further information on how We use, store and keep your personal
          data secure, see our Privacy Policy.
        </p>
        <p className="leading-loose">
          We do not store sensitive personal information, such as mailing
          addresses, account passwords, etc. in the Cookies We use.
        </p>
        <h2>Interpretation and Definitions</h2>
        <h4>Interpretation</h4>
        <p className="leading-loose">
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>
        <h4>Definitions</h4>
        <p className="leading-loose">
          For the purposes of this Cookies Policy:
        </p>
        <ul>
          <li>
            <strong>Company</strong> (referred to as either &quot;the
            Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in
            this Cookies Policy) refers to ARIA PH, 7th Floor, MacArthur
            Highway, Urdaneta City, Pangasinan.
          </li>
          <li>
            <strong>Cookies</strong> means small files that are placed on Your
            computer, mobile device or any other device by a website, containing
            details of your browsing history on that website among its many
            uses.
          </li>
          <li>
            <strong>Website</strong> refers to Arfa, accessible from{" "}
            <a
              href="https://arfaph.vercel.app/"
              rel="external nofollow noopener"
              target="_blank"
            >
              https://arfaph.vercel.app/
            </a>
          </li>
          <li>
            <strong>You</strong> means the individual accessing or using the
            Website, or a company, or any legal entity on behalf of which such
            individual is accessing or using the Website, as applicable.
          </li>
        </ul>
        <h2>The use of the Cookies</h2>
        <h4>Type of Cookies We Use</h4>
        <p className="leading-loose">
          Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies.
          Persistent Cookies remain on your personal computer or mobile device
          when You go offline, while Session Cookies are deleted as soon as You
          close your web browser.
        </p>
        <p className="leading-loose">
          We use both session and persistent Cookies for the purposes set out
          below:
        </p>
        <ul>
          <li>
            <p className="leading-loose">
              <strong>Necessary / Essential Cookies</strong>
            </p>
            <p className="leading-loose">Type: Session Cookies</p>
            <p className="leading-loose">Administered by: Us</p>
            <p className="leading-loose">
              Purpose: These Cookies are essential to provide You with services
              available through the Website and to enable You to use some of its
              features. They help to authenticate users and prevent fraudulent
              use of user accounts. Without these Cookies, the services that You
              have asked for cannot be provided, and We only use these Cookies
              to provide You with those services.
            </p>
          </li>
          <li>
            <p className="leading-loose">
              <strong>Functionality Cookies</strong>
            </p>
            <p className="leading-loose">Type: Persistent Cookies</p>
            <p className="leading-loose">Administered by: Us</p>
            <p className="leading-loose">
              Purpose: These Cookies allow us to remember choices You make when
              You use the Website, such as remembering your login details or
              language preference. The purpose of these Cookies is to provide
              You with a more personal experience and to avoid You having to
              re-enter your preferences every time You use the Website.
            </p>
          </li>
        </ul>
        <h4>Your Choices Regarding Cookies</h4>
        <p className="leading-loose">
          If You prefer to avoid the use of Cookies on the Website, first You
          must disable the use of Cookies in your browser and then delete the
          Cookies saved in your browser associated with this website. You may
          use this option for preventing the use of Cookies at any time.
        </p>
        <p className="leading-loose">
          If You do not accept Our Cookies, You may experience some
          inconvenience in your use of the Website and some features may not
          function properly.
        </p>
        <p className="leading-loose">
          If You'd like to delete Cookies or instruct your web browser to delete
          or refuse Cookies, please visit the help pages of your web browser.
        </p>
        <ul>
          <li>
            <p className="leading-loose">
              For the Chrome web browser, please visit this page from Google:{" "}
              <a
                href="https://support.google.com/accounts/answer/32050"
                rel="external nofollow noopener"
                target="_blank"
              >
                https://support.google.com/accounts/answer/32050
              </a>
            </p>
          </li>
          <li>
            <p className="leading-loose">
              For the Internet Explorer web browser, please visit this page from
              Microsoft:{" "}
              <a
                href="http://support.microsoft.com/kb/278835"
                rel="external nofollow noopener"
                target="_blank"
              >
                http://support.microsoft.com/kb/278835
              </a>
            </p>
          </li>
          <li>
            <p className="leading-loose">
              For the Firefox web browser, please visit this page from Mozilla:{" "}
              <a
                href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored"
                rel="external nofollow noopener"
                target="_blank"
              >
                https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
              </a>
            </p>
          </li>
          <li>
            <p className="leading-loose">
              For the Safari web browser, please visit this page from Apple:{" "}
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                rel="external nofollow noopener"
                target="_blank"
              >
                https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
              </a>
            </p>
          </li>
        </ul>
        <p className="leading-loose">
          For any other web browser, please visit your web browser's official
          web pages.
        </p>
        <h4>More Information about Cookies</h4>
        <p className="leading-loose">
          You can learn more about cookies:{" "}
          <a
            href="https://www.freeprivacypolicy.com/blog/cookies/"
            target="_blank"
          >
            Cookies: What Do They Do?
          </a>
          .
        </p>
        <h4>Contact Us</h4>
        <p className="leading-loose">
          If you have any questions about this Cookies Policy, You can contact
          us:
        </p>
        <ul>
          <li>By email: hello.ariaph@gmail.com</li>
        </ul>
      </section>
      <section>
        <FooterSection></FooterSection>
      </section>
    </section>
  );
};

export default CookiePolicies;
