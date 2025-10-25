"use client";

import { useCallback, useState } from "react";
import { useEffect } from "react";

export default function useHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleFavorite = useCallback((id, favorite) => {
    setIsLoading(true);
    fetch(`/api/orders`, {
      method: "UPDATE",
      body: JSON.stringify({ id, favorite }),
    })
      .then((res) => res.json())
      .then((data) => setHistory(data.message.reverse()))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteHistoryItem = useCallback((id) => {
    setIsLoading(true);
    fetch(`/api/orders`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => setHistory(data.message.reverse()))
      .finally(() => setIsLoading(false));
  }, []);

  const removeOrders = useCallback(() => {
    setIsLoading(true);
    fetch(`/api/orders`, {
      method: "DELETE",
      body: JSON.stringify({ id: "all" }),
    }).then(() => {
      setHistory([]);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const fetchHistory = async () => {
      setIsLoading(true);
      const response = await fetch("/api/orders");
      const data = await response.json();
      setHistory(data.reverse());
      setIsLoading(false);
    };
    fetchHistory();
  }, [open]);

  return { history, isLoading, toggleFavorite, open, setOpen, deleteHistoryItem, removeOrders };
}
