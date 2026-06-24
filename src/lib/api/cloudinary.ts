export async function uploadImage(file: File, token: string) {
  console.log(file, token)
  const signatureResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cloudinary/signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!signatureResponse.ok) {
    throw new Error('Failed to get Cloudinary signature');
  }

  const { timestamp, signature, cloudName, apiKey, folder } = await signatureResponse.json();

  const formData = new FormData();

  formData.append('file', file);

  formData.append('api_key', apiKey);

  formData.append('timestamp', String(timestamp));

  formData.append('signature', signature);

  formData.append('folder', folder);

  const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  if (!uploadResponse.ok) {
    throw new Error('Cloudinary upload failed');
  }

  const data = await uploadResponse.json();

  return data.secure_url as string;
}
