// getHeaderFooterWidgets.ts

import { HeaderFooterData } from "@/lib/types/types";

export async function getHeaderFooterWidgets() {

    const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH; // Load from .env
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/widget/headerfooterdata`, {
        headers: { origin: homeUrl ?? "" },
        cache: 'no-store' // use 'force-cache' or 'revalidate' if needed
    });

    const widgets = await res.json();

    const data: HeaderFooterData = {
        headerLogo: null,
        footerLogo: null,
        footerText: null,
        footerCopywrite: null,
        headerMenu: null,
        footerMenu: null,
        headerButton: null,
        blogCategories: null,
    };
    // console.log("initial Header Footer query", widgets.data)
    for (const item of widgets.data.widgetsList) {
        switch (item.title) {
            case 'header-logo':
                data.headerLogo = item.content;
                break;
            case 'footer-logo':
                data.footerLogo = item.content;
                break;
            case 'footer-text':
                data.footerText = item.content;
                break;
            case 'footer-copywrite':
                data.footerCopywrite = item.content;
                break;
            case 'header-button':
                data.headerButton = item.content;
                break;

        }
    }
    for (const item of widgets.data.menu) {
        switch (item.title) {
            case 'header':
                data.headerMenu = item.items;
                break;
            case 'footer':
                data.footerMenu = item.items;
                break;


        }
    }
    data.blogCategories = widgets.data.categoryList;

    return data;
}