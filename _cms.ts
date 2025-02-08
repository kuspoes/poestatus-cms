import lumeCMS from "lume/cms/mod.ts";
import { Octokit } from "npm:octokit";
import GitHubStorage from "lume/cms/storage/github.ts";

const username = Deno.env.get("USERNAME")!;
const password = Deno.env.get("PASSWORD")!;

const cms = lumeCMS({
  auth: {
    method: "basic",
    users: {
      [username]: password,
    },
  },
});

cms.storage(
  "gh",
  new GitHubStorage({
    client: new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") }),
    owner: "kuspoes",
    repo: "poestatus",
  }),
);

cms.collection("posts", "gh:src/status", [
  "title: text",
  {
    name: "summary",
    type: "textarea",
    attributes: {
      required: true,
    },
  },
  {
    name: "image",
    type: "file",
    uploads: "uploads",
    attributes: {
      accept: "image/*",
    },
  },
  "content: markdown",
]);

cms.upload("uploads", "gh:uploads");

export default cms;
