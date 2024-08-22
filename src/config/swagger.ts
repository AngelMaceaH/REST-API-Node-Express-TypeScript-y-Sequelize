import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.2",
    tags:[
      {
        name: "Products",
        description: "API operations related to products"
      }
    ],
    info: {
      title: "REST API - ANGEL MACEA",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
  },
  apis: ["./src/router.ts"],
}

const swaggerUiOptions: SwaggerOptions = {
  customCss: `
    .swagger-ui .topbar {
      background-color: rgba(0,0,0,0.4);
      }
    .topbar-wrapper .link {
      content: url('https://mcgroupus.com/wp-content/uploads/2018/03/MCGroup-1.png');
      height: 120px;
      width: auto;
      }`,
  customSiteTitle: "REST API - ANGEL MACEA",
}

export const swaggerSpec = swaggerJSDoc(options);

export {
  swaggerUiOptions
}