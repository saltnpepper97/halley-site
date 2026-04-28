import { error } from "@sveltejs/kit";
import { getConfigPage } from "$lib/wiki/config-reference";

export const load = ({ params }) => {
  const configPage = getConfigPage(params.slug);

  if (!configPage) {
    error(404, "Config section not found");
  }

  return { configPage };
};
