import { config } from "../../utils/config";
import { urls } from "./urls";

 export const fetchTickets = async () => {
    try {
      const url = `${config.baseApi}${urls.fetchTickets}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) { console.error("API Error", err); }
  };