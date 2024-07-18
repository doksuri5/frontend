"use client";

import { useState, useEffect } from "react";

export default function useFormResultError(isValid: boolean) {
  const [formResultError, setFormResultError] = useState<string | undefined>("");

  useEffect(() => {
    if (!isValid) {
      setFormResultError("");
    }
  }, [isValid]);

  return { formResultError, setFormResultError };
}
