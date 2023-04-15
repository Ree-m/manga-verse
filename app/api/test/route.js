// import connectMongo from "@/utils/connectMongo";
// import Test from "@/models/testModel";

// export async function POST(req, res) {
//   try {
//     console.log("CONNECTING TO MONGO");
//     await connectMongo();
//     console.log("CONNECTED TO MONGO");

//     console.log("CREATING DOCUMENT");
//     const test = await Test.create(req.body);
//     console.log("CREATED DOCUMENT");

//     res.json({ test });
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }
// }
