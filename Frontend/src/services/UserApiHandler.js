import axiosInstance from "./axiosInstance";

export const userSignUp = async (finalValues, registerType) => {
  const { password, ...remaining } = finalValues; // Exclude 'password' from finalValues

  let requestBody = {};
  requestBody = {
    ...remaining,
    password: password,
    role: registerType.toLowerCase(),
  };

  try {
    const response = await axiosInstance.post(`/user/signup`, requestBody);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserRole = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/get-user-role/${userId}`, {
      resourceName: "User",
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPendingUsers = async () => {
  try {
    const response = await axiosInstance.get(`/user/getPendingUsers`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateUserAcceptance = async (id, role, isAccepted) => {
  try {
    const response = await axiosInstance.post(`/user/changeAcceptance/${id}`, {
      role,
      isAccepted,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateUserPassword = async (
  id,
  role,
  oldPassword,
  newPassword
) => {
  const response = await axiosInstance.post(`/user/changePassword/${id}`, {
    role,
    oldPassword,
    newPassword,
  });
  return response.data;
};

export const deleteUser = async (id, role) => {
  try {
    const response = await axiosInstance.patch(
      `/user/request-account-deletion/${id}`,
      { role }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const sendForgotPasswordEmail = async (username) => {
  const response = await axiosInstance.post(`/user/forgot-password`, {
    username,
  });
  return response.data;
};

export const resetPassword = async (id, newPassword) => {
  console.log("Reset Password Request:", { id, newPassword });
  const response = await axiosInstance.post(`/user/reset-password`, {
    id,
    newPassword,
  });
  return response.data; // Return response data directly
};
