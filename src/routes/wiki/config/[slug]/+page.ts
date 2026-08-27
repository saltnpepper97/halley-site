import { error } from "@sveltejs/kit";
import { configPages, getConfigPage } from "$lib/wiki/config-reference";

export const entries = () => configPages.map((page) => ({ slug: page.slug }));

export const load = ({ params }) => {
  const configPage = getConfigPage(params.slug);

  if (!configPage) {
    error(404, "Config section not found");
  }

  return { configPage };
};
