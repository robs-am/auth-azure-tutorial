import { useState } from 'react';
import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph, GraphData } from './graph';
import { ProfileData as ProfileDataComponent } from './components/ProfileData';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import './App.css';
import Button from 'react-bootstrap/Button';

console.log("Environment Variables:", import.meta.env);

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  const RequestProfileData = () => {
    // Verificar se há contas disponíveis
    if (!accounts || accounts.length === 0) {
      console.error("Nenhuma conta encontrada.");
      return;
    }

    // Tentar obter o token de forma silenciosa
    instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0] // Usar a primeira conta disponível
    }).then((response) => {
      // Chamar a API Graph com o token de acesso
      callMsGraph(response.accessToken).then((data) => setGraphData(data));
    }).catch((error) => {
      console.error("Erro ao obter token de forma silenciosa:", error);
      // Caso falhe, tentamos um login interativo
      instance.acquireTokenPopup({
        ...loginRequest,
        account: accounts[0]
      }).then((response) => {
        callMsGraph(response.accessToken).then((data) => setGraphData(data));
      }).catch((popupError) => {
        console.error("Erro ao obter token via popup:", popupError);
      });
    });
  };

  return (
    <div>
      <AuthenticatedTemplate>
        <h5 className="card-title">Welcome {accounts[0]?.name}</h5>
        {graphData ? (
          <ProfileDataComponent
            graphData={graphData}
            givenName={graphData.givenName}
            surname={graphData.surname}
            userPrincipalName={graphData.userPrincipalName}
            id={graphData.id}
          />
        ) : (
          <Button onClick={RequestProfileData}>Request Profile Information</Button>
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h5 className="card-title">Please sign-in to see your profile information.</h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5>
          <center>Please sign-in to see your profile information.</center>
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  return (
    <PageLayout>
      <center>
        <MainContent />
      </center>
    </PageLayout>
  );
}
