"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import {
  setHeaderLogo,
  setFooterLogo,
  setFooterText,
  setfooterCopywrite,
  setFooterMenu,
  setHeaderMenu,
  setHeaderButton,
  setBlogCategories,
} from "./store/slice/dataSlice";
import { getHeaderFooterWidgets, getHeaderFooterWidgetsWithoutCache } from "./store/getHeaderFooterWidgets";

function InnerLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchHeaderFooter() {
      const searchParams = new URLSearchParams(window.location.search);
      const clearCache = searchParams.get("clearCache");
      let initialHeaderFooter;
      if (clearCache === "1") {
        initialHeaderFooter = await getHeaderFooterWidgetsWithoutCache();
      } else {
        initialHeaderFooter = await getHeaderFooterWidgets();
      }


      if (initialHeaderFooter) {
        dispatch(setHeaderLogo(initialHeaderFooter.headerLogo ?? ""));
        dispatch(setFooterLogo(initialHeaderFooter.footerLogo ?? ""));
        dispatch(setFooterText(initialHeaderFooter.footerText ?? ""));
        dispatch(setFooterMenu(initialHeaderFooter.footerMenu));
        dispatch(setHeaderMenu(initialHeaderFooter.headerMenu));
        dispatch(setHeaderButton(initialHeaderFooter.headerButton));
        dispatch(setfooterCopywrite(initialHeaderFooter.footerCopywrite ?? ""));
        dispatch(setBlogCategories(initialHeaderFooter.blogCategories));
      }
    }

    fetchHeaderFooter();
  }, [dispatch]);

  return <>{children}</>;
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InnerLayout>
        {children}
      </InnerLayout>
    </Provider>
  );
}