import React from "react";

import FacebookProvider from "react-facebook/dist/FacebookProvider";
import Page from "react-facebook/dist/Page";

const FacebookPage = () => (
  <div className="card d-none d-lg-block">
    <div className="card-header">BİZİ BƏYƏNDİNİZ Mİ?</div>
    <div id="fb-root">
      <FacebookProvider appId="202242063195586">
        <Page href="https://www.facebook.com/quranaz/" tabs="none" />
      </FacebookProvider>
    </div>
  </div>
);

export default FacebookPage;
