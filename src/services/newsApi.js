import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const newsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "408b7d8edemsh13a421909c488e4p1511b4jsnf51c9fbe08c4",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
}

const baseUrl = "https://bing-news-search1.p.rapidapi.com"
const createRequest = (url) => ({ url, headers: newsHeaders })

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi
