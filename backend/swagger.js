const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ToDo API",
      version: "1.0.0",
      description: "ToDoアプリのAPIドキュメント"
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "ローカル開発環境"
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"

        
        }
      }
    }
  },
  apis: ['./routes/auth.js', './routes/todo.js'], // ルートファイルのパスを設定
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
