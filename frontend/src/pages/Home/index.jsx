import React from "react";
import HorizontalExperience from "./HorizontalExperience";

const PublicSite = ({ config, products, reviews, onAdminClick }) => {
  return (
    <HorizontalExperience
      config={config}
      products={products}
      reviews={reviews}
      onAdminClick={onAdminClick}
    />
  );
};

export default PublicSite;
