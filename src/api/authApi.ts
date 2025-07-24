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

export const resendOtpApi = async ({
  contact,
  purpose = 'REGISTRATION',
}: {
  contact: string;
  purpose?: string;
}) => {
  console.log('API_BASE_URL:', API_BASE_URL); // Debugging: base URL
  console.log('Contact:', contact); // Debugging: email or phone

  const res = await fetch(
    `${API_BASE_URL}/auth/resend-otp?contact=${encodeURIComponent(contact)}&purpose=${purpose}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  console.log('Resend OTP response:', res);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.message || 'Failed to resend OTP');
  }

  return res.json();
};