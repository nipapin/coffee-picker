import { put } from "@vercel/blob";

const getOrders = async () => {
  try {
    const response = await fetch(process.env.STORE_URL);
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const createOrder = (payload) => {
  return { ...payload, id: Date.now(), createdAt: Date.now(), favorite: false };
};

export async function GET() {
  const orders = await getOrders();
  return Response.json(orders.reverse(), { status: 200 });
}

export async function POST(request) {
  const payload = await request.json();
  const order = createOrder(payload);
  const orders = await getOrders();
  orders.push(order);
  await put("orders.json", JSON.stringify(orders), { access: "public", allowOverwrite: true });
  return Response.json({ message: "Order saved" }, { status: 200 });
}

export async function UPDATE(request) {
  const { id, favorite } = await request.json();
  const orders = await getOrders();
  const updatedOrders = orders.map((order) => (order.id === id ? { ...order, favorite } : order));
  await put("orders.json", JSON.stringify(updatedOrders), { access: "public", allowOverwrite: true });
  return Response.json({ message: updatedOrders }, { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  if (id === "all") {
    await put("orders.json", JSON.stringify([]), { access: "public", allowOverwrite: true });
    return Response.json({ message: [] }, { status: 200 });
  }
  const orders = await getOrders();
  const updatedOrders = orders.filter((order) => order.id !== Number(id));
  await put("orders.json", JSON.stringify(updatedOrders), { access: "public", allowOverwrite: true });
  return Response.json({ message: updatedOrders }, { status: 200 });
}
