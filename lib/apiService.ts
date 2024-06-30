export const getData = async ({
  endpoint,
}: {
  endpoint: string;
  data?: any;
}) => {
  try {
    const response = await fetch(`${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
