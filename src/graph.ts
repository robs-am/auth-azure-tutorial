/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 *
 *
 */
export interface GraphData {
  displayName: string;
  givenName: string;
  surname: string;
  userPrincipalName: string;
  id: string;
}

export interface GraphConfig {
  graphMeEndpoint: string;
}

const graphConfig: GraphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};

export async function callMsGraph(accessToken: string): Promise<GraphData> {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options: RequestInit = {
    method: 'GET',
    headers: headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
