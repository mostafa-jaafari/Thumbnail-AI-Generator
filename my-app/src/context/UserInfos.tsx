"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserInfosType = {
  userInfos: User | null;
  isLoggedIn: boolean;
};

const UserInfosContext = createContext<UserInfosType | null>(null);

export function UserInfosProvider({ children }: { children: ReactNode }) {
  const [userInfos, setUserInfos] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    // 1️⃣ جلب المستخدم الحالي عند التحميل
    const getInitialUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserInfos(data.user);
      setIsLoggedIn(!!data.user);
    };

    getInitialUser();

    // 2️⃣ الاستماع لتغير حالة Auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserInfos(session?.user || null);
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserInfosContext.Provider
      value={{
        userInfos,
        isLoggedIn,
      }}
    >
      {children}
    </UserInfosContext.Provider>
  );
}

export const useUserInfos = () => {
  const context = useContext(UserInfosContext);
  if (!context) {
    throw new Error(
      "useUserInfos should be wrapped inside the UserInfosProvider"
    );
  }
  return context;
};
