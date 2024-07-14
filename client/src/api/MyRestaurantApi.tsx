import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const Api_Base_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurnt = () => {
  const { getAccessTokenSilently } = useAuth0();

  const CreateMyRestaurntRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${Api_Base_URL}/api/my/resturant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!res.ok) {
      throw new Error("Failed to create restaurant");
    }

    return res.json();
  };

  const {
    mutate: CreateMyRestaurnt,
    isLoading,
    isSuccess,
    error,
  } = useMutation(CreateMyRestaurntRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }
  if (error) {
    toast.error("Unable to update Restaurant");
  }

  return { CreateMyRestaurnt, isLoading };
};
export const useGetMyRestaurnt = () => {
  const { getAccessTokenSilently } = useAuth0();

  const GetMyRestaurntRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${Api_Base_URL}/api/my/resturant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to Get restaurant");
    }

    return res.json();
  };

  const { data: restaurnt, isLoading } = useQuery(
    "fetchMyRestaurnt",
    GetMyRestaurntRequest
  );

  return { restaurnt, isLoading };
};



export const useUpdateMyRestaurnt = () => {
  const { getAccessTokenSilently } = useAuth0();

  const UpdateMyRestaurntRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${Api_Base_URL}/api/my/resturant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!res.ok) {
      throw new Error("Failed to Update restaurant");
    }

    return res.json();
  };

  const {
    mutate: UpdateMyRestaurnt,
    isLoading,
    isSuccess,
    error,
  } = useMutation(UpdateMyRestaurntRequest);

  if (isSuccess) {
    toast.success("Restaurant Updated");
  }
  if (error) {
    toast.error("Unable to update Restaurant");
  }

  return { UpdateMyRestaurnt, isLoading };
};
