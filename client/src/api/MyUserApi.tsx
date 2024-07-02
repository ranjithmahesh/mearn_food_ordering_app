import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const Api_Base_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${Api_Base_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to get user Details");
    }
    return res.json();
  };

  const {
    data: currentUser,
    isLoading,

    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);
  if (error) toast.error(error.toString());
  return { currentUser, isLoading };
};
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const userCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${Api_Base_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return { createUser, isLoading, isError, isSuccess };
};

type UpdateMuUserRequest = {
  name: string;
  city: string;
  country: string;
  addressLine1: string;
};
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyUserRequest = async (formData: UpdateMuUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${Api_Base_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to Update user");
    }
  };
  const {
    mutateAsync: UpdateUser,
    isLoading,
    isSuccess,
    error,

    reset,
  } = useMutation(updateMyUserRequest);
  if (isSuccess) toast.success("User profile Updated!");
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { UpdateUser, isLoading };
};
