import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function TermsOfUse() {
  return (
    <>
      <div>
        Terms and Conditions of Use
        <p>
          1. Agreement to Terms All access of any area
          of ("The Website") is governed by the terms and conditions below
        ("Terms"). If you do not accept any of these Terms, exit immediately.
        Continue only if you accept these Terms. In these Terms, the words "we",
        "our" and "us" refers to the Government of Singapore.
        </p>
        <p>
        2. Access To The Website The accessibility and operation of The Website relies on
        technologies outside our control. We do not guarantee continuous
        accessibility or uninterrupted operation of The Website. 
        </p>
        <p>
        3. Relying On Information We provide The Website as a general information source only
        and we are not involved in giving professional advice here. The Website
        may not cover all information available on a particular issue. Before
        relying on the Website, you should do your own checks or obtain
        professional advice relevant to your particular circumstances. 
        </p>
        <p>
        4. Security Where appropriate, we use available technology to protect the
        security of communications made through The Website. However, we do not
        accept liability for the security, authenticity, integrity or
        confidentiality of any transactions and other communications made
        through The Website. Internet communications may be susceptible to
        interference or interception by third parties. Despite our best efforts,
        we make no warranties that The Website is free of infection by computer
        viruses or other unauthorised software. You should take appropriate
        steps to keep your information, software and equipment secure. This
        includes clearing your Internet browser cookies and cache before and
        after using any services on The Website. You should keep your passwords
          confidential.
        </p>
        <p>
        5. Hyperlinks We are not responsible or liable for the
        availability or content of any other Internet site (not provided by us)
        linked to or from The Website. Access to any other Internet site is at
        your own risk. If you create a link or frame to The Website, you do so
        at your own risk. We reserve the right to object or disable any link or
        frame to or from The Website. We reserve the right to change the URL of
        The Website.
        </p>
        <p>
        6. Intellectual Property Materials, including source code,
        pages, documents and online graphics, audio and video in The Website are
        protected by law. The intellectual property rights in the materials is
        owned by or licensed to us. All rights reserved. (Government of
        Singapore © 2018). Apart from any fair dealings for the purposes of
        private study, research, criticism or review, as permitted in law, no
        part of The Website may be reproduced or reused for any commercial
        purposes whatsoever without our prior written permission. 
        </p>7. General Disclaimer And Limitation Of Liability We will not be liable for any
        loss or damage 1. That you may incur on account of using, visiting or
        relying on any statements, opinion, representation or information in The
        Website; 2. Resulting from any delay in operation or transmission,
        communications failure, Internet access difficulties or malfunctions in
        equipment or software; or 3. Resulting from the conduct or the views of
        any person who accesses or uses The Website.
        <p>8. Fees: There are currently
        no fees for using any part of The Website. We reserve the right to
        introduce new fees from time to time. We are not responsible for any
          fees charged by any other Internet site (not provided by us). </p>
        <p>
        9.
        Applicable Laws: Use of The Website and these Terms are governed by the
        laws of Singapore. Any claim relating to use of The Website shall be
        heard by Singapore Courts.
        </p>
        <p>
          10. Variation We may revise these Terms at
        any time by updating this page. You should visit this page from time to
        time and review the then current Terms because they are binding on you.
        We may modify or discontinue any information or features that form part
        of The Website at any time, with or without notice to you, and without
          liability.
          </p>
      </div>
      <Link to="/recruitersignup">
        <Button> Go back </Button>{" "}
      </Link>
    </>
  );
}