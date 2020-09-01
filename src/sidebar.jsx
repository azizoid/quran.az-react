import React, { lazy, Suspense } from "react";

const PrayerWidget = lazy(() => import("./sidebar/prayer.widget.component"));
const RandomAyah = lazy(() => import("./sidebar/random.ayah.component"));
const FacebookPage = lazy(() => import("./sidebar/facebook.page.component"));

const Sidebar = () => {
  return (
    <div style={{ fontSize: "0.9rem" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <PrayerWidget />
        <br />
        <RandomAyah />
        <hr />
        <FacebookPage />
      </Suspense>
    </div>
  );
};
export default Sidebar;
