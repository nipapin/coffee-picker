"use client";

import { useCallback, useState } from "react";
import { useEffect } from "react";

export default function useHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleFavorite = useCallback((id, favorite) => {
    setIsLoading(true);
    fetch(`/api/history/${id}`, {
      method: "POST",
      body: JSON.stringify({ favorite }),
    })
      .then((res) => res.json())
      .then((data) => setHistory(data.reverse()))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteHistoryItem = useCallback((id) => {
    setIsLoading(true);
    fetch(`/api/history/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setHistory(data.reverse()))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const response = await fetch("/api/history");
      const data = await response.json();
      setHistory(data.reverse());
      setIsLoading(false);
    };
    fetchHistory();
  }, [open]);

  return { history, isLoading, toggleFavorite, open, setOpen, deleteHistoryItem };
}
