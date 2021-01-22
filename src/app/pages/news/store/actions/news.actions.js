export const GET_NEWS_SUCCESS = "[HOME] GET_NEWS_SUCCESS";
export const GET_NEWS_ERROR = "[HOME] GET_NEWS_ERROR";
export const GET_NEWS_PROGRESS = "[HOME] GET_NEWS_PROGRESS";

export function getNews(payload) {
  return {
    type: GET_NEWS_SUCCESS,
    payload,
  };
}
