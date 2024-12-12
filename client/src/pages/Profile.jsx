import { useAppStore } from "../stores";

const Profile = () => {
  const { userInfo } = useAppStore();
  console.log("userInfo",userInfo)
  return (
    <div>
      <h1>email : {userInfo.email}</h1>
    </div>
  );
};

export default Profile;
