"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";
import { useMutation, useQuery } from "@tanstack/react-query";

export function ThemeSwitcher({ userTheme }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme(userTheme);

  const mutation = useMutation({
    mutationFn: async (theme) => {
      const updateUser = await fetch(
        `/api/userAccount/userTheme?userTheme=${theme}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ theme: theme }),
        }
      );

      if (!updateUser.ok) {
        return "Error updating user information!";
      }

      if (updateUser.ok) {
        return "User information updated!";
      }
    },
  });

  const handleChange = () => {
    mutation.mutate(theme);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      onChange={handleChange}
      defaultSelected
      size="lg"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    ></Switch>
  );
}
