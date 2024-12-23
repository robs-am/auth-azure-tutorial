
/**
 * Renders information about the user obtained from MS Graph 
 * @param props
 */

interface ProfileDataProps {

  givenName: string;
  surname: string;
  userPrincipalName: string;
  id: string;

}
export const ProfileData: React.FC<ProfileDataProps> = (props) => {
  return (
    <div id="profile-div">
      <p>
        <strong>First Name: </strong> {givenName}
      </p>
      <p>
        <strong>Last Name: </strong> {props.graphData.surname}
      </p>
      <p>
        <strong>Email: </strong> {props.graphData.userPrincipalName}
      </p>
      <p>
        <strong>Id: </strong> {props.graphData.id}
      </p>
    </div>
  );
};