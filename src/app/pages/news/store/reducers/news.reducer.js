import * as Actions from "../actions/news.actions";

const initialState = {
  loading: false,
  data: [
    {
      id: 1,
      title: "Victoria Island has the best higher bidders",
      description:
        "Luxury property are begining to go higher in bids at VI, and we have raised eyebrows over the past few years as the quality of property appreciated and more stakeholder and investor are drawn by this advent to get into this business.",
      dateCreated: "2021-02-02",
    },
    {
      id: 2,
      title: "A realtor has more stories to tell than you envision",
      description:
        "A realtor just earn his first billion at 37 years over property sold at high brow areas yet they are majorly not hype as much as they deserve. And we are also trying to give them a leeway too.",
      dateCreated: "2021-02-15",
    },
    {
      id: 3,
      title: "Become a property owner with BoxByBox",
      description:
        "You can become a property owner with BoxByBox if you know better, with the right information and boxbybox on your side, you can do more, achieve better than a regular property owner.",
      dateCreated: "2021-02-23",
    },
    {
      id: 4,
      title: "Victoria Island has the best higher bidders",
      description:
        "Luxury property are begining to go higher in bids at VI, and we have raised eyebrows over the past few years as the quality of property appreciated and more stakeholder and investor are drawn by this advent to get into this business.",
      dateCreated: "2021-02-02",
    },
    {
      id: 5,
      title: "A realtor has more stories to tell than you envision",
      description:
        "A realtor just earn his first billion at 37 years over property sold at high brow areas yet they are majorly not hype as much as they deserve. And we are also trying to give them a leeway too.",
      dateCreated: "2021-02-15",
    },
    {
      id: 6,
      title: "Become a property owner with BoxByBox",
      description:
        "You can become a property owner with BoxByBox if you know better, with the right information and boxbybox on your side, you can do more, achieve better than a regular property owner.",
      dateCreated: "2021-02-23",
    },
    {
      id: 7,
      title: "Victoria Island has the best higher bidders",
      description:
        "Luxury property are begining to go higher in bids at VI, and we have raised eyebrows over the past few years as the quality of property appreciated and more stakeholder and investor are drawn by this advent to get into this business.",
      dateCreated: "2021-02-02",
    },
    {
      id: 8,
      title: "A realtor has more stories to tell than you envision",
      description:
        "A realtor just earn his first billion at 37 years over property sold at high brow areas yet they are majorly not hype as much as they deserve. And we are also trying to give them a leeway too.",
      dateCreated: "2021-02-15",
    },
    {
      id: 9,
      title: "Become a property owner with BoxByBox",
      description:
        "You can become a property owner with BoxByBox if you know better, with the right information and boxbybox on your side, you can do more, achieve better than a regular property owner.",
      dateCreated: "2021-02-23",
    },
  ],
  error: null,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_NEWS_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.GET_NEWS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default newsReducer;
