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
} from "./store/slice/dataSlice";

interface footerMenus {
  title: string;
  link: string;
}

interface subMenus {
  title: string;
  link: string;
}
interface headerMenus {
  title: string;
  link: string;
  children: subMenus[] | null;
}

interface HeaderFooterData {
  headerLogo: string | null;
  footerLogo: string | null;
  footerText: string | null;
  footerMenu: footerMenus[] | null;
  headerMenu: headerMenus[] | null;
  headerButton: string | null;
  footerCopywrite: string | null;
}

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
      dispatch(setHeaderLogo(initialHeaderFooter.headerLogo ?? ""));
      dispatch(setFooterLogo(initialHeaderFooter.footerLogo ?? ""));
      dispatch(setFooterText(initialHeaderFooter.footerText ?? ""));
      dispatch(setFooterMenu(initialHeaderFooter.footerMenu));
      dispatch(setHeaderMenu(initialHeaderFooter.headerMenu));
      dispatch(setHeaderButton(initialHeaderFooter.headerButton));
      dispatch(setfooterCopywrite(initialHeaderFooter.footerCopywrite ?? ""));
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