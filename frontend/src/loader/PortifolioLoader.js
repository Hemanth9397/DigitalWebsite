import axios from "axios";

export default function PortifolioLoader() {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const res = await axios.get("http://localhost:5000/api/v1/portifolio");
      resolve(res.data[0]);
    }, 1000); // simulate delay
  });
}
