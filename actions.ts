"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { init, Users } from "@kinde/management-api-js";
import { revalidatePath } from "next/cache";

export const updateUserBookName = async (props: {
  userId: string;
  bookName: string;
}) => {
  init();
  await Users.updateUserProperty({
    userId: props.userId,
    propertyKey: "bookname",
    value: props.bookName,
  });
};

export const refreshData = async () => {
  const { refreshTokens } = getKindeServerSession();
  await refreshTokens();
  revalidatePath("/");
};
