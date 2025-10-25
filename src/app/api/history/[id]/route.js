import fs from "fs";

export async function POST(request, { params }) {
  const { id } = params;
  const { favorite } = await request.json();
  if (fs.existsSync("history.json")) {
    const history = fs.readFileSync("history.json", "utf8");
    const historyData = JSON.parse(history);
    const updatedHistoryData = historyData.map((item) => (item.id === Number(id) ? { ...item, favorite } : item));
    fs.writeFileSync("history.json", JSON.stringify(updatedHistoryData, null, 2));
    return Response.json(updatedHistoryData, { status: 200 });
  }
  return Response.json([], { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  if (fs.existsSync("history.json")) {
    const history = fs.readFileSync("history.json", "utf8");
    const historyData = JSON.parse(history);
    const updatedHistoryData = historyData.filter((item) => item.id !== Number(id));
    fs.writeFileSync("history.json", JSON.stringify(updatedHistoryData, null, 2));
    return Response.json(updatedHistoryData, { status: 200 });
  }
  return Response.json([], { status: 200 });
}
