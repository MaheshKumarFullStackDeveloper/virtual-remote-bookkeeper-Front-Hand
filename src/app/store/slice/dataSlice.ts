import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Adjust the path as needed
import { blogCategoryList, Page } from '@/lib/types/types';






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


interface dataState {
  data: Page | null,
  status: string;
  headerButton: string | null;
  headerLogo: string | null;
  footerLogo: string | null;
  footerCopywrite: string | null;
  error: string | null;
  value: number;
  blogCategories: blogCategoryList[] | null;
  footerMenu: footerMenus[] | null;
  headerMenu: headerMenus[] | null;
  footerText: string | null;
}


const baseUrl = process.env.NEXT_PUBLIC_API; // Load from .env



const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH; // Load from .env


export const fetchData = createAsyncThunk('data/fetchData', async (payload: { pageSlug: string, clearCache: string }) => {
  const { pageSlug, clearCache = "0" } = await payload;

  try {
    let data = null
    if (clearCache === "1") {

      const response = await fetch(`${baseUrl}/page/${pageSlug}?v=${Date.now()}`, {
        headers: {
          origin: homeUrl ?? "",
        },
        cache: "no-cache",
      });

      console.log("fetching data with clear cache", `${baseUrl}/page/${pageSlug}?v=${Date.now()}`);
      data = await response.json();
    } else {
      let cacheInterval = 60 * 60 * 6000; // 1h
      const hourKey = Math.floor(Date.now() / cacheInterval);

      const response = await fetch(`${baseUrl}/page/${pageSlug}?v=${hourKey}`, {
        headers: {
          origin: homeUrl ?? "",
        },
        cache: "force-cache",
      });

      console.log("fetching data with cache", `${baseUrl}/page/${pageSlug}?v=${hourKey}`);
      data = await response.json();
    }

    const dataPage = data?.data;

    if (data.data && dataPage.sections && dataPage?.sections?.length > 0 && dataPage.status === 'active') {
      return dataPage;
    } else {
      const newArray = {
        slug: pageSlug,
        meta: {
          title: "",
          description: ""
        },
        title: "Page not Found"
      }
      return newArray;
    }
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    const newArray = {
      slug: pageSlug,
      meta: {
        title: "",
        description: ""
      },
      title: "Page not Found"
    }
    return newArray;
  }

});



const initialState: dataState = {
  data: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  value: 0,
  headerLogo: null,
  footerText: null,
  headerButton: null,
  footerLogo: null,
  footerCopywrite: null,
  blogCategories: null,
  footerMenu: null,
  headerMenu: null

};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setHeaderLogo: (state, action: PayloadAction<string>) => {
      state.headerLogo = action.payload;
    },
    setfooterCopywrite: (state, action: PayloadAction<string>) => {
      state.footerCopywrite = action.payload;
    },
    setFooterLogo: (state, action: PayloadAction<string>) => {
      state.footerLogo = action.payload;
    },
    setFooterText: (state, action: PayloadAction<string>) => {
      state.footerText = action.payload;
    },
    setFooterMenu: (state, action: PayloadAction<footerMenus[] | null>) => {
      state.footerMenu = action.payload;
    },
    setHeaderMenu: (state, action: PayloadAction<headerMenus[] | null>) => {
      state.headerMenu = action.payload;
    },
    setBlogCategories: (state, action: PayloadAction<blogCategoryList[] | null>) => {
      state.blogCategories = action.payload;
    },
    setHeaderButton: (state, action: PayloadAction<string | null>) => {
      state.headerButton = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })

      ;
  },
});



export const selectData = (state: RootState) => state.data.data;
export const selectBlogCategories = (state: RootState) => state.data.blogCategories;
export const selectHeaderLogo = (state: RootState) => state.data.headerLogo;
export const selectHeaderButton = (state: RootState) => state.data.headerButton;
export const selectFooterLogo = (state: RootState) => state.data.footerLogo;
export const selectFooterText = (state: RootState) => state.data.footerText;
export const selectFooterMenu = (state: RootState) => state.data.footerMenu;
export const selectfooterCopywrite = (state: RootState) => state.data.footerCopywrite;
export const selectHeaderMenu = (state: RootState) => state.data.headerMenu;
export const selectStatus = (state: RootState) => state.data.status;
export const selectError = (state: RootState) => state.data.error;

export const { setHeaderLogo, setfooterCopywrite, setBlogCategories, setFooterLogo, setFooterText, setFooterMenu, setHeaderMenu, setHeaderButton } = dataSlice.actions;
export default dataSlice.reducer; 