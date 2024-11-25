import { updateUserBookName } from "@/actions";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { NextResponse } from "next/server";

interface Book {
  title: string;
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

const fetchBook = async (code: string): Promise<Book | null> => {
  const url = "https://openlibrary.org/works/" + code + ".json";
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "WebDirectionsComp/1.0 (peter@kinde.com)",
      },
    });

    return await res.json();
  } catch {
    return null;
  }
};

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  console.log("Webhook received");
  try {
    const token = await req.text();
    const decodedToken = jwt.decode(token, {
      complete: true,
    }) as jwt.JwtPayload;
    const { kid } = decodedToken.header;

    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();

    const event = jwt.verify(token, signingKey) as {
      type: string;
      data: {
        user: {
          id: string;
        };
      };
    };

    if (event.type == "user.authenticated") {
      // TODO: Call the fetchBook function with the user's book code
      const book = await fetchBook("bookCode");

      await updateUserBookName({
        userId: event.data.user.id,
        bookName: book?.title ?? "Try clicking the refresh button...",
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}
