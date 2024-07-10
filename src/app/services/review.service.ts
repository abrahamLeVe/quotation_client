import { fetchDataFromApi, postDataFromApi } from "@/lib/api";
import { DataPost, ReviewsInterface } from "@/models/review.model";
let qs = require("qs");

export const getDataProductReviews = async (
  productSlug: string
): Promise<ReviewsInterface> => {
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        product: {
          slug: {
            $eq: productSlug,
          },
        },
        stateReview: {
          $eq: true,
        },
      },
    },
    {
      encode: false,
      encodeValuesOnly: true,
    }
  );

  const url = `/api/reviews?${query}`;

  const res = await fetchDataFromApi(url);

  return res;
};

interface postReviewProductProps {
  data: DataPost;
}
export const postReviewProduct = async ({ data }: postReviewProductProps) => {
  const res = await postDataFromApi("/api/reviews", { data: data });
  return res;
};
