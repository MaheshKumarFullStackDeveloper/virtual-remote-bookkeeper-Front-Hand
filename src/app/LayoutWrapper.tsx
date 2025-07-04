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
import { HeaderFooterData } from "@/lib/types/types";



function InnerLayout({
  children,
  initialHeaderFooter,
}: {
  children: React.ReactNode;
  initialHeaderFooter: HeaderFooterData;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialHeaderFooter) {
      //  console.log("initial Header Footer", initialHeaderFooter)

      dispatch(setHeaderLogo(initialHeaderFooter.headerLogo ?? ""));
      dispatch(setFooterLogo(initialHeaderFooter.footerLogo ?? ""));
      dispatch(setFooterText(initialHeaderFooter.footerText ?? ""));
      dispatch(setFooterMenu(initialHeaderFooter.footerMenu));
      dispatch(setHeaderMenu(initialHeaderFooter.headerMenu));
      dispatch(setHeaderButton(initialHeaderFooter.headerButton));
      dispatch(setfooterCopywrite(initialHeaderFooter.footerCopywrite ?? ""));
      dispatch(setBlogCategories(initialHeaderFooter.blogCategories));
    }
  }, [initialHeaderFooter, dispatch]);

  return <>{children}</>;
}


export default function LayoutWrapper({
  children,
  initialHeaderFooter,
}: {
  children: React.ReactNode;
  initialHeaderFooter: HeaderFooterData;
}) {
  return (
    <Provider store={store}>
      <InnerLayout initialHeaderFooter={initialHeaderFooter}>
        {children}
      </InnerLayout>
    </Provider>
  );
}