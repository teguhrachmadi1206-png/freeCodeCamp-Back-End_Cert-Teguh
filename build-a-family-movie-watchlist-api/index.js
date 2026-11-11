import express from "express";
import helmet from "helmet";
import authRouter from "./routes/auth.js";
import watchlistRoutes from "./routes/watchlist.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use("/api/watchlist", watchlistRoutes);

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

// app.post('/login', authenticate, (req, res) => {
//   res.send("Login successful");
// })
