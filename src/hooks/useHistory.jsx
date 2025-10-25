"use client";

import { deleteOrder, getOrders, updateOrder } from "@/utilities/postgres";
import { useCallback, useEffect, useState } from "react";

export default function useHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleFavorite = useCallback((order) => {
    setIsLoading(true);
    updateOrder(order)
      .then((data) => setHistory(data))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteHistoryItem = useCallback((order) => {
    setIsLoading(true);
    deleteOrder(order.id)
      .then((data) => setHistory(data))
      .finally(() => setIsLoading(false));
  }, []);

  const removeOrders = useCallback(() => {
    setIsLoading(true);
    deleteOrder("all")
      .then((data) => setHistory(data))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!open) return;
    const fetchHistory = async () => {
      setIsLoading(true);
      getOrders()
        .then((data) => console.log(data) || setHistory(data))
        .finally(() => setIsLoading(false));
    };
    fetchHistory();
  }, [open]);

  return { history, isLoading, toggleFavorite, open, setOpen, deleteHistoryItem, removeOrders };
}
