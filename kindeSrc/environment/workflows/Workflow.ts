import {
  accessTokenCustomClaims,
  onUserTokenGeneratedEvent,
  WorkflowSettings,
  WorkflowTrigger,
  fetch,
} from "@kinde/infrastructure";
import { headers } from "next/headers";

export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
    "kinde.fetch": {},
    console: {},
    url: {},
  },
};

interface Book {
  publishers: string[];
  description: {
    type: string;
    value: string;
  };
  isbn_10: string[];
  pagination: string;

  covers: number[];
  lc_classifications: string[];
  key: string;
  authors: { key: string }[];
  ocaid: string;
  publish_places: string[];
  contributions: string[];
  ia_box_id: string[];
  genres: string[];
  source_records: string[];
}

const handler = {
  async handle(event: onUserTokenGeneratedEvent) {
    const accessToken = accessTokenCustomClaims<{
      hello: string;
      ipAddress: string;
      book: Book;
    }>();

    const url = "https://openlibrary.org/books/" + "OL24224314M" + ".json";

    const book = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "WebDirectionsComp/1.0 (peter@kinde.com)",
      },
    });

    accessToken.book = book;
  },
};

export default handler;
