import { fetchDataFromApi, postDataFromApi } from "@/lib/api";
import { ContactMessageInterface } from "@/models/contact.model";
import {
  DataPost,
  PostReviewProductInterface,
  ReviewsInterface,
} from "@/models/review.model";
let qs = require("qs");

// export const getDataReviews = async (
//   token: string
// ): Promise<ReviewsInterface> => {
//   const res = await fetchDataFromApi(`/api/reviews?populate=*`, token);
//   return res;
// };

export const getDataProductReviews = async (
  productSlug: string
): Promise<ReviewsInterface> => {
  const query = qs.stringify(
    {
      populate: "*", // Poblar todos los campos relacionados
      filters: {
        product: {
          slug: {
            $eq: productSlug, // Asegúrate de que el slug sea exactamente igual al que buscas
          },
        },
        stateReview: {
          $eq: true, // Filtrar solo las revisiones donde stateReview es true
        },
      },
    },
    {
      encode: false, // Evita la codificación de caracteres, importante para mantener la estructura del filtro
      encodeValuesOnly: true, // Solo codifica los valores, no las claves
    }
  );

  const url = `/api/reviews?${query}`;

  const res = await fetchDataFromApi(url);
  // console.log("Response:", JSON.stringify(res, null, 2));

  return res;
};

interface postReviewProductProps {
  data: DataPost;
}
export const postReviewProduct = async ({ data }: postReviewProductProps) => {
  const res = await postDataFromApi("/api/reviews", { data: data });
  return res;
};
