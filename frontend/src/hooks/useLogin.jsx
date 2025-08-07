import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../lib/api";

const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged in Successfully");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(
        error?.response?.data?.message || "Login failed, please try again"
      );
    },
  });

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;
