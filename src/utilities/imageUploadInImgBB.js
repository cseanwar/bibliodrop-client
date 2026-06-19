import toast from 'react-hot-toast';

export const imageUploadInImgBB = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  // console.log(data);

  if (data.success) {
    return data.data.url;
  }

  toast.error('Image upload failed');
};

// import toast from "react-hot-toast";

// export const imageUploadInImgBB = async (imageFile) => {
//   try {
//     const formData = new FormData();
//     formData.append("image", imageFile);

//     const response = await fetch(
//       `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await response.json();

//     if (data.success) {
//       return data.data.display_url;
//     }

//     throw new Error("Image upload failed");
//   } catch (error) {
//     console.error(error);
//     toast.error("Image upload failed");
//     return null;
//   }
// };