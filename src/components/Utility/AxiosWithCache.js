import axios from "axios";
import { setupCache } from "axios-cache-adapter";

export const cache = setupCache({
    // maxAge: 15 * 60 * 1000,
});

export const axiosWithCache = axios.create({
  adapter: cache.adapter
});
