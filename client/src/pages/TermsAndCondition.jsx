import { FooterSection } from "../components/navigation/FooterSection";
import logo from "../assets/logos/logo_black.svg";
import { Link } from "react-router-dom";
import React from "react";
import profile from "../assets/icons/profile-black.svg";
import search from "../assets/icons/search.svg";
import heart from "../assets/icons/heart-black.svg";
import { NotificationDrawer } from "../components/dynamic/NotificationDrawer";
import SearchlessNavigationBar from "../components/SearchlessNavigationBar";

const TermsAndCondition = () => {
  return (
    <div className="text-gray-700 ">
      <section className="mx-6 my-3">
        <SearchlessNavigationBar />
      </section>
      <section className="w-4/5 max-w-5xl mx-auto">
        <h4>Terms and Conditions for ARIA Seller Center Packages</h4>
        <p className="leading-relaxed">
          These <strong>Terms and Conditions</strong> (the “Agreement”) are
          supplemental to the ARIA Platform Terms and Conditions and any
          applicable ARIA Policies.
        </p>

        <h4>1. DEFINITIONS</h4>
        <p className="leading-relaxed">
          <strong>1.1 "Advertisement"</strong> refers to any advertisement
          placed under this Agreement.
        </p>
        <p className="leading-relaxed">
          <strong>1.2 “Advertising Fee”</strong> has the meaning defined in
          Section 3.1.
        </p>
        <p className="leading-relaxed">
          <strong>1.3 “Advertiser”</strong> means the Customer or entity
          specified in a Package Order for whom the Customer acts as a reseller.
        </p>
        <p className="leading-relaxed">
          <strong>1.4 “Advertising Targets”</strong> includes brands, products,
          and services promoted through Advertising Material.
        </p>
        <p className="leading-relaxed">
          <strong>1.5 “Applicable Deductions”</strong> refers to applicable
          taxes and fees on a Deposit.
        </p>
        <p className="leading-relaxed">
          <strong>1.6 “Landing Page”</strong> is the initial webpage a user
          visits after clicking on any Advertising Material.
        </p>
        <p className="leading-relaxed">
          <strong>1.7 “Media”</strong> encompasses any medium and advertising
          inventory available through ARIA.
        </p>
        <p className="leading-relaxed">
          <strong>1.8 “Platform”</strong> refers to the ARIA online platform.
        </p>
        <p className="leading-relaxed">
          <strong>1.9 “Terms of Use”</strong> are the governing terms for the
          Platform.
        </p>

        <h4>2. PACKAGE ORDERS</h4>
        <p className="leading-relaxed">
          <strong>2.1 Package Order:</strong> Advertisers may purchase various
          Package Orders at listed prices. All Package Orders are governed by
          these Terms, which prevail over any conflicting terms in the Package
          Order.
        </p>
        <p className="leading-relaxed">
          <strong>2.2 No Cancellation:</strong> Once a Package Order is
          purchased, modifications or cancellations are not permitted, and
          refunds will not be issued.
        </p>

        <h4>3. COMPENSATION AND PAYMENT TERMS</h4>
        <p className="leading-relaxed">
          <strong>3.1 Advertising Fee and Invoice:</strong>
        </p>
        <p className="leading-relaxed">
          (a) Upon receipt of a Package Order, ARIA will issue a billing
          statement detailing the <strong>Advertising Fee</strong> and payment
          due date.
        </p>
        <p className="leading-relaxed">
          (b) Advertisers must pay for Package Orders in advance using available
          payment methods. Failure to pay will result in automatic cancellation
          of the Package Order.
        </p>
        <p className="leading-relaxed">
          (c) Payments to ARIA are VAT inclusive. Each party is responsible for
          their own taxes, and if withholding taxes are required, the Customer
          must provide a Creditable Withholding Tax Certificate (BIR Form 2307)
          within five days of payment.
        </p>
        <h4>4. RESPONSIBILITIES OF CUSTOMER</h4>
        <p className="leading-relaxed">
          <strong>4.1 Business Conduct:</strong> Customers may not bind ARIA or
          misrepresent their relationship with ARIA. Deceptive or illegal
          advertising practices are prohibited.
        </p>
        <p className="leading-relaxed">
          <strong>4.2 Relationship with Advertisers:</strong> Customers may not
          commit ARIA to obligations on behalf of Advertisers without written
          consent.
        </p>
        <p className="leading-relaxed">
          <strong>4.3 Compliance with Laws:</strong> Customers must ensure all
          Landing Pages comply with applicable laws,{" "}
          <strong>Terms of Use</strong>, and ARIA's specifications.
        </p>
        <p className="leading-relaxed">
          <strong>4.4 Landing Pages:</strong> Each Landing Page must closely
          resemble the previously submitted version, and the link must remain
          static across visits.
        </p>
        <p className="leading-relaxed">
          <strong>4.5 Prohibited Uses:</strong> Customers shall not use
          automated tools or scraping methods to generate fraudulent activity or
          access ARIA's advertising-related information without written consent.
        </p>

        <h4>5. RESPONSIBILITIES AND RIGHTS OF ARIA</h4>
        <p className="leading-relaxed">
          <strong>5.1 Platform:</strong> ARIA will operate and maintain the
          Platform. Changes to the features or functionalities of the Platform
          will not affect the validity of this Agreement.
        </p>
        <p className="leading-relaxed">
          <strong>5.2 Right to Cancel, Reject, or Remove:</strong> Failure of
          Advertisers to nominate on purchased slots within the specified time
          will result in forfeiture of benefits without entitlement to a refund.
        </p>
        <p className="leading-relaxed">
          <strong>5.3 Changes to Terms of Use:</strong> ARIA may update the{" "}
          <strong>Terms of Use</strong>, including eligibility requirements,
          prohibited product categories, and payment terms. Customers will be
          notified through publication on the website, email, or messaging.
          Updated Terms take effect upon publication, and continuing to execute
          Package Orders constitutes agreement to these updates.
        </p>

        <h4>6. CONFIDENTIAL INFORMATION</h4>
        <p className="leading-relaxed">
          <strong>6.1 Definition:</strong> “Confidential Information” includes
          proprietary information disclosed in various forms, marked as
          confidential, or understood to be confidential by context.
        </p>
        <p className="leading-relaxed">
          <strong>6.2 Exceptions:</strong> Confidential Information does not
          include publicly available information, information already in
          possession of the receiving party, or independently developed
          information.
        </p>
        <p className="leading-relaxed">
          <strong>6.3 Non-Use and Non-Disclosure:</strong> Each party will treat
          the other’s <strong>Confidential Information</strong> as confidential,
          not disclose it to third parties without consent, and use it only for
          fulfilling obligations under this Agreement. Disclosure may be
          permitted if required by law, with prior notice given to the other
          party.
        </p>

        <h4>7. TERM AND TERMINATION</h4>
        <p className="leading-relaxed">
          <strong>7.1 Termination for Convenience by ARIA:</strong> ARIA may
          terminate any Package Order without cause with prior written notice. A
          refund will be provided unless the termination is due to a Customer's
          breach.
        </p>
        <p className="leading-relaxed">
          <strong>7.2 Effect of Termination:</strong> If terminated due to the
          Customer’s breach, all amounts paid may be forfeited as liquidated
          damages without prejudice to ARIA’s rights.
        </p>
        <p className="leading-relaxed">
          <strong>7.3 Survival:</strong> Provisions relating to confidentiality,
          liability, and any obligations that naturally survive termination will
          continue in effect.
        </p>

        <h4>8. REPRESENTATIONS AND WARRANTIES</h4>
        <p className="leading-relaxed">
          <strong>8.1 Mutual Representations:</strong> Both parties warrant
          their legal standing, authority to execute this Agreement, and
          compliance with applicable laws.
        </p>
        <p className="leading-relaxed">
          <strong>8.2 Customer Representations:</strong> The Customer warrants
          that:
        </p>
        <ul>
          <li>This Agreement does not conflict with any other obligations;</li>
          <li>All provided information is accurate and current;</li>
          <li>All documents submitted are true;</li>
          <li>
            Advertisers have rights to use and market{" "}
            <strong>Landing Pages</strong>;
          </li>
          <li>
            No <strong>Landing Page</strong> contains harmful or illegal
            content.
          </li>
        </ul>

        <h4>9. INDEMNIFICATION</h4>
        <p className="leading-relaxed">
          <strong>9.1 Indemnification by Customer:</strong> The Customer agrees
          to indemnify ARIA against claims arising from breaches of this
          Agreement or violations of third-party rights.
        </p>
        <p className="leading-relaxed">
          <strong>9.2 Procedure:</strong> ARIA will notify the Customer of
          claims, allowing them to control the defense. ARIA may participate in
          defense at its cost and will not settle claims without prior written
          consent.
        </p>

        <h4>10. LIMITATION OF LIABILITY</h4>
        <p className="leading-relaxed">
          <strong>10.1 Disclaimer of Warranties:</strong> All services and
          materials provided by ARIA and its affiliates are on an "as is" basis.
          ARIA makes no guarantees regarding the success of campaigns, including
          the number of visits, sales, or conversion rates. Customers
          acknowledge that ARIA cannot ensure the protection of any submitted
          materials from theft or misuse, and ARIA will not be liable for any
          failure of security technologies or procedures.
        </p>
        <p className="leading-relaxed">
          <strong>10.2 Disclaimer of Consequential Damages:</strong> Under no
          circumstances will ARIA be liable for consequential, incidental,
          special, punitive, or exemplary damages arising from this Agreement,
          including lost profits or loss of business.
        </p>
        <p className="leading-relaxed">
          <strong>10.3 Cap on Liability:</strong> ARIA’s total liability arising
          from this Agreement will not exceed the total amount received from the
          Customer in the twelve-month period preceding the claim.
        </p>
        <p className="leading-relaxed">
          <strong>10.4 Independent Allocations of Risk:</strong> Each limitation
          of liability provision allocates risk between the parties and is
          essential to the agreement. These provisions are severable and apply
          even if they fail their essential purpose.
        </p>

        <h4>11. MISCELLANEOUS</h4>
        <p className="leading-relaxed">
          <strong>11.1 Subcontractors:</strong> ARIA may delegate its rights
          under this Agreement to affiliates and subcontractors, who must comply
          with the terms herein.
        </p>
        <p className="leading-relaxed">
          <strong>11.2 Independent Contractor:</strong> This Agreement does not
          create a partnership or agency relationship; both parties are
          independent contractors. Neither party can bind the other without
          express authorization.
        </p>
        <p className="leading-relaxed">
          <strong>11.3 Press Release:</strong> Neither party shall make public
          announcements regarding this Agreement without prior consent, except
          as required by law.
        </p>
        <p className="leading-relaxed">
          <strong>11.4 Force Majeure:</strong> Neither party shall be liable for
          delays caused by circumstances beyond their control, including natural
          disasters or governmental actions.
        </p>
        <p className="leading-relaxed">
          <strong>11.5 Governing Law and Resolution of Disputes:</strong> This
          Agreement shall be governed by the laws of [Insert applicable
          jurisdiction]. Any disputes shall first be attempted to be resolved
          through mutual discussions for thirty (30) days. If unresolved,
          disputes will be referred to arbitration in accordance with applicable
          laws, with costs shared equally between the parties.
        </p>
        <p className="leading-relaxed">
          <strong>11.6 Notices:</strong> All notices under this Agreement shall
          be considered given upon receipt via recognized delivery methods to
          the addresses specified.
        </p>
        <p className="leading-relaxed">
          <strong>11.7 Assignment:</strong> The Customer may not assign rights
          or delegate obligations without ARIA’s prior written consent. ARIA may
          assign its rights without consent.
        </p>
        <p className="leading-relaxed">
          <strong>11.8 Waiver:</strong> Waivers of any provisions must be in
          writing and do not constitute a waiver of any future rights.
        </p>
        <p className="leading-relaxed">
          <strong>11.9 Severability:</strong> If any provision is found invalid
          or unenforceable, the remaining provisions shall continue to be valid
          and enforceable.
        </p>
        <p className="leading-relaxed">
          <strong>11.10 Remedies Cumulative:</strong> Rights and remedies are
          cumulative and not exclusive.
        </p>
        <p className="leading-relaxed">
          <strong>11.11 Confidentiality of Agreement:</strong> The Customer
          shall not disclose terms without ARIA's written consent, except as
          required by law.
        </p>
        <p className="leading-relaxed">
          <strong>11.12 Counterparts:</strong> This Agreement may be executed in
          counterparts, which together constitute one agreement.
        </p>
        <p className="leading-relaxed">
          <strong>11.13 Language:</strong> In case of translations, the English
          version is binding.
        </p>
        <p className="leading-relaxed">
          <strong>11.14 Headings:</strong> Headings are for reference only and
          do not affect interpretation.
        </p>
        <p className="leading-relaxed">
          <strong>11.15 Integration:</strong> This Agreement constitutes the
          entire understanding between the parties and supersedes any prior
          agreements.
        </p>
      </section>

      <section>
        <FooterSection />
      </section>
    </div>
  );
};

export default TermsAndCondition;
