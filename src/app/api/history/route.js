import fs from "fs";

const createHistoryItem = (item, id) => {
  return {
    id,
    base: item.base,
    milk: item.milk,
    syrup: item.syrup,
    favorite: false,
    createdAt: Date.now(),
  };
};

export async function POST(request) {
  const payload = await request.json();
  if (fs.existsSync("history.json")) {
    const history = fs.readFileSync("history.json", "utf8");
    const historyData = JSON.parse(history);
    historyData.push(createHistoryItem(payload, historyData.length + 1));
    fs.writeFileSync("history.json", JSON.stringify(historyData, null, 2));
  } else {
    fs.writeFileSync("history.json", JSON.stringify([createHistoryItem(payload, 1)], null, 2));
  }
  return Response.json({ message: "History saved" }, { status: 200 });
}

export async function GET() {
  if (!fs.existsSync("history.json")) {
    return Response.json([], { status: 200 });
  }
  const history = fs.readFileSync("history.json", "utf8");
  const historyData = JSON.parse(history);
  return Response.json(historyData.reverse(), { status: 200 });
}
