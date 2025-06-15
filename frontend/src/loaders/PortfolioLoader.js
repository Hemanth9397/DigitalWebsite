import axios from "axios";

export default function PortfolioLoader() {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const res = await axios.get("http://localhost:5000/api/v1/portfolio");
      resolve(res.data[0]);
    }, 1000); // simulate delay
  });
}
