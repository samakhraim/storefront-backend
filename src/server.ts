import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRoutes from "./handlers/products";

const app: Application = express();
const port = 3000;

/**
 * ✅ 1. Enable CORS globally
 * Express 5 automatically handles OPTIONS pre-flights for any route
 * when `app.use(cors())` is applied before your routes.
 */
app.use(
  cors({
    origin: "http://localhost:4200", // your Angular app
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ 2. Usual middleware
app.use(bodyParser.json());

// ✅ 3. Register API routes
productRoutes(app);

// ✅ 4. Health-check route
app.get("/", (_req: Request, res: Response) => {
  res.send("Server running...");
});

// ✅ 5. Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});

export default app;
