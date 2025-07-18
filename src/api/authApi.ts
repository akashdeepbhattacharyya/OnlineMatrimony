const API_BASE_URL = process.env.API_BASE_URL
export const signUpApi = async (payload: {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  password: string;
}) => {
    console.log('API_BASE_URL:', API_BASE_URL); // Debugging line to check the API base URL
    console.log('Payload:', payload); // Debugging line to check the payload
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  console.log(res);
  if (!res.ok) {
    throw new Error('Signup failed');
  }

  return res.json();
};
