"use server";
import { Organizations, init } from "@kinde/management-api-js";

init();
export const getOrganizations = async () => {
  const { organizations } = await Organizations.getOrganizations();
  return organizations;
};
