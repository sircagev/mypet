"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Documentation = () => (
  <div>
    <SwaggerUI url="/swagger.json" />
  </div>
);

export default Documentation;