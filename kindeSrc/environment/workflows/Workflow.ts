import {
  accessTokenCustomClaims,
  fetch,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

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

const fetchBook = async (id: string) => {
  const url = "https://openlibrary.org/books/" + id + ".json";
  try {
    const book = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "WebDirectionsComp/1.0 (peter@kinde.com)",
      },
    });

    return book;
  } catch {
    return null;
  }
};

const handler = {
  async handle() {
    const accessToken = accessTokenCustomClaims<{
      hello: string;
      ipAddress: string;
      book: Book;
    }>();

    accessToken.book = await fetchBook("your favorite book id");
  },
};

export default handler;
