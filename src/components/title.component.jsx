import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const TitleComponent = ({ title = "", description = "" }) => {
  title = title + " | Quran.az - Öz Kitabını Oxu";
  description = description + " | Quran.az - Öz Kitabını Oxu";
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

export default TitleComponent;
