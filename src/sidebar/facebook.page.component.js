import React from "react";
// import { FacebookProvider, Page } from "react-facebook";
import FacebookProvider from "react-facebook/dist/FacebookProvider";
import Page from "react-facebook/dist/Page";

const FacebookPage = () => {
  return (
    <div className="card d-none d-lg-block">
      <div className="card-header">BİZİ BƏYƏNDİNİZ Mİ?</div>
      <FacebookProvider appId="10177953140">
        <Page href="https://www.facebook.com/quranaz/" tabs="none" />
      </FacebookProvider>
    </div>
  );
};

export default FacebookPage;
