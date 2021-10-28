import React from "react";

import { GrAdd } from "react-icons/gr";

import "./empty-hero-space.scss";

const EmptyHeroSpace = () => (
  <div
    className="card p-3 bg-secondary h-100 empty-hero-space"
    data-testid="empty-hero-space"
  >
    <GrAdd size="60%" className="add-hero__icon" />
  </div>
);

export default EmptyHeroSpace;
