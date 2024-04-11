import { redis } from "./redis";
import { Ratelimit } from "@upstash/ratelimit";

export const ratelimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "10 s"),
  prefix: '@upstash/ratelimit'
});
