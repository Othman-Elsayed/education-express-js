const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const handleSwagger = (app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "The Sabis Way",
        version: "1.0.0",
      },
    },
    apis: ["./src/routes*.js"],
  };

  const swaggerSpec = swaggerJsdoc(options);

  return app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = handleSwagger;
