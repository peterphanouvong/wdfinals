import {
  accessTokenCustomClaims,
  onUserTokenGeneratedEvent,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

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

export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
  },
};

const fetchBook = async (bookId: string) => {
  const url = "https://openlibrary.org/books/" + bookId + ".json";
  // const headers = new Headers({
  //   "User-Agent": "WebDirectionsComp/1.0 (peter@kinde.com)",
  // });
  const options = {
    method: "GET",
    // headers: headers,
  };
  try {
    const res = await fetch(url, options);
    return (await res.json()) as Book;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handler = {
  async handle(event: onUserTokenGeneratedEvent) {
    const accessToken = accessTokenCustomClaims<{
      hello: {
        world: string;
        test: number;
      };
      ipAddress: string;
      book: Book;
    }>();
    accessToken.hello = {
      world: "Hello there!",
      test: 123,
    };
    accessToken.book = await fetchBook("OL24224314M");
  },
};

export default handler;
