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

const handler = {
  async handle(event: onUserTokenGeneratedEvent) {
    const accessToken = accessTokenCustomClaims<{
      hello: {
        world: string;
        test: number;
      };
      ipAddress: string;
      book: Book | null;
    }>();
    accessToken.hello = {
      world: "Hello there!",
      test: 123,
    };
    const url = "https://openlibrary.org/books/" + "OL24224314M" + ".json";
    const res = await fetch(url, {
      method: "GET",
    });
    const book = await res.json();
    console.log("book", book);
    accessToken.book = book;
  },
};

export default handler;
