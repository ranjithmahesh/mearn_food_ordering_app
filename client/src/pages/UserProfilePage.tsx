import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-forms/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { UpdateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) return <span>Loading...</span>;
  if (!currentUser) return <span>Unable to load user profile </span>;

  return <UserProfileForm currentUser={currentUser}  onSave={UpdateUser} isLoading={isUpdateLoading} />;
};

export default UserProfilePage;
