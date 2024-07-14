import { useCreateMyRestaurnt, useGetMyRestaurnt, useUpdateMyRestaurnt } from "@/api/MyRestaurantApi";
import ManageRestaurantForms from "../forms/user-profile-forms/manage-restaurant-forms/ManageRestaurantForms";
const ManageRestaurantPage = () => {
  const { CreateMyRestaurnt, isLoading: isCreateLoading } = useCreateMyRestaurnt();
  const { UpdateMyRestaurnt, isLoading: isUpdateLoading } = useUpdateMyRestaurnt();
  const { restaurnt } = useGetMyRestaurnt();


  const isEditing = !!restaurnt
  return (
    <ManageRestaurantForms
      restaurnt={restaurnt}
      onSave={isEditing ? UpdateMyRestaurnt : CreateMyRestaurnt}
      isLoading={isCreateLoading || isUpdateLoading}

    />
  );
};

export default ManageRestaurantPage;
