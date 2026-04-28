import { error } from "@sveltejs/kit";
import { newsPosts } from "$lib/news/releases";

export const load = ({ params }) => {
  const post = newsPosts.find((item) => item.slug === params.slug);

  if (!post) {
    error(404, "News post not found");
  }

  return { post };
};
