import { fetchDataFromApi } from "@/lib/api";
import { ReviewsInterface } from "@/models/review.model";

export const getDataReviews = async (
  token: string
): Promise<ReviewsInterface> => {
  const res = await fetchDataFromApi(`/api/reviews?populate=*`, token);
  return res;
};
