import { fetchApi } from "../libs/helper";
import { ProfilesResponse } from "../types/profiles";

export async function getProfiles(): Promise<ProfilesResponse> {
  return fetchApi("/profiles?populate=*");
}
