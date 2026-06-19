"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addBook(newBook) {
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is missing in your environment variables"
    );
  }

  const response = await fetch(`${baseUrl}/api/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    throw new Error("Failed to add book");
  }

  return response.json();
}