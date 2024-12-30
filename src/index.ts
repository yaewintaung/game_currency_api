import app from "./app";
import dotenv from "dotenv";
import transporter from "./config/transporter";
dotenv.config();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is stated at http://localhost:8000/`);
  transporter.verify((error, success) => {
    if (error) {
      console.error("Error connecting to email server:", error);
    } else {
      console.log("Transporter is ready to send emails:", success);
    }
  });
});
