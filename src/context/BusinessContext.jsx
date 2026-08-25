import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { apiClient } from "../lib/apiClient";

const BusinessContext = createContext();

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) throw new Error("useBusiness must be used within a BusinessProvider");
  return context;
};

export const BusinessProvider = ({ children }) => {
  const { data, isLoading } = useQuery("business", async () => {
    const res = await apiClient.get("/business");
    return res.data.data;
  });

  return (
    <BusinessContext.Provider value={{ business: data, isLoading }}>
      {children}
    </BusinessContext.Provider>
  );
};
