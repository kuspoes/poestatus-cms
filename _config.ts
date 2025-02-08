import lume from "lume/mod.ts";

const site = lume({
  src: "./src",
  dest: "./_site",
});

site.copy("assets", ".");

export default site;
