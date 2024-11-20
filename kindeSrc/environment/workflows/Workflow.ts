import {
  accessTokenCustomClaims,
  onUserTokenGeneratedEvent,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
  },
};

const fetchBook = async (bookId: string) => {
  const url = "https://openlibrary.org/books/" + bookId + ".json";
  const headers = new Headers({
    "User-Agent": "WebDirectionsComp/1.0 (peter@kinde.com)",
  });
  const options = {
    method: "GET",
    headers: headers,
  };
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
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

    accessToken.book = await fetchBook("Zen's favorite book ID");
  },
};

export default handler;
