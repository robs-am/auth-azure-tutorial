
/**
 * Renders information about the user obtained from MS Graph 
 * @param props
 */



interface ProfileDataProps {

  givenName: string;
  surname: string;
  userPrincipalName: string;
  id: string;
  graphData: {
    givenName: string;
    surname: string;
    userPrincipalName: string;
    id: string;
  };

}
export const ProfileData: React.FC<ProfileDataProps> = ({ givenName, surname, userPrincipalName, id }) => {
  return (
    <div id="profile-div">
      <p>
        <strong>First Name: </strong> {givenName}
      </p>
      <p>
        <strong>Last Name: </strong> {surname}
      </p>
      <p>
        <strong>Email: </strong> {userPrincipalName}
      </p>
      <p>
        <strong>Id: </strong> {id}
      </p>
    </div>
  );
};