"use server";

import { neon } from "@neondatabase/serverless";

async function query(query, params) {
  const sql = neon(`${process.env.STORAGE_POSTGRES_URL}`);
  return await sql.query(query, params);
}

export async function createOrder(order) {
  return await query("INSERT INTO orders (base, milk, syrup, createdat) VALUES ($1, $2, $3, $4)", [
    order.base,
    order.milk,
    order.syrup.join(","),
    Date.now(),
  ]);
}

export async function getOrders() {
  const rows = await query("SELECT * FROM orders ORDER BY createdat DESC");
  return rows.map((row) => ({
    id: row.id,
    base: row.base,
    milk: row.milk,
    syrup: row.syrup.split(","),
    createdAt: Number(row.createdat),
    favorite: row.favorite,
  }));
}

export async function updateOrder(order) {
  await query("UPDATE orders SET base = $1, milk = $2, syrup = $3, createdat = $4 WHERE id = $5", [
    order.base,
    order.milk,
    order.syrup.join(","),
    Date.now(),
    order.id,
  ]);
  return await getOrders();
}

export async function deleteOrder(id) {
  if (id === "all") {
    await query("DELETE FROM orders");
    return [];
  }
  await query("DELETE FROM orders WHERE id = $1", [id]);
  return await getOrders();
}
