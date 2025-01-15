import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
      // URL se searchParams ko parse karo
      const { searchParams } = new URL(req.url);
  
      // params ko extract karo
      const params: { [key: string]: string | string[] | undefined } = {};
      searchParams.forEach((value, key) => {
        params[key] = params[key] ? [...(params[key] as string[]), value] : value;
      });
  
      // params.key se value lo
      const searchKey = params.key as string;
  
    const suggestions = await prisma.user.findMany({
  where: {
    OR: [
      {
        displayname: {
          contains: searchKey, // Partial match ke liye
          mode: "insensitive", // Case-insensitive match
        },
      },
      {
        dipartment: {
          contains: searchKey,
          mode: "insensitive",
        },
      },
    ],
  },
  take: 10, // Top 10 suggestions
});

  
      // Suggestions ko response me bhejo
      return new Response(JSON.stringify({ success: true, data: suggestions }), {
        status: 200,
      });
    } catch (error) {
      console.error("Error:", error);
      return new Response(JSON.stringify({ success: false, error: "Something went wrong!" }), {
        status: 500,
      });
    }
  }
  