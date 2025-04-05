import React from "react";
// import Herosection from "@/pages/Herosection";
import EnhancedTradingNewsFeed from "@/pages/NewsUpdate";
import MultiAssetChart from "@/python dataset/multi-asset-chart";
import Heroyash from "@/pages/Heroyash";

const Home = () => {
  return (
<div>
  <div className="flex">
    <div className="left  ">
      {/* <Herosection /> */}
         <Heroyash/>
      <div className="space-y-5"> 
        <EnhancedTradingNewsFeed className="m-10 p-5" />
        <MultiAssetChart className="m-10 p-5" />
      </div>
    </div>

  </div>
</div>


  );
};

export default Home;
