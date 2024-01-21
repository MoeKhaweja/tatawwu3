import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import fetchData from "../helpers/fetch";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("token", jsonValue);
  } catch (e) {
    // saving error
  }
};
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("token");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false,
  isVerified: false,
  isReset: false,
  success: false,
  extracted: null,
  rooms: [],
  notRooms: [],
  chat: {},
  communities: [],
  communityEvents: [],
  volunteerEvents: [],
  searchEvents: [],
  volunteerMatchingEvents: [],
  eventsApplicationStatus: [],
  eventApplicants: [],
  community: null,
  event: null,
};

export const createRoom = createAsyncThunk(
  "user/createRoom",
  async (details, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(createRoom.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/rooms/create",
        details,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(createRoom.fulfilled(response.data));

      console.log("Current State:", currentState);
      console.log(response);

      return response.data;
    } catch (error) {
      dispatch(createRoom.rejected(error.message));
      return rejectWithValue("error creating room");
    }
  }
);

export const createCommunity = createAsyncThunk(
  "user/createCommunity",
  async (details, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(createCommunity.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/create",
        details,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(createCommunity.fulfilled(response.data));
      return response.data;
    } catch (error) {
      dispatch(createCommunity.rejected(error.message));
      return rejectWithValue("error creating community");
    }
  }
);

export const createEvent = createAsyncThunk(
  "user/createEvent",
  async (details, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(createEvent.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/addEvent",
        details,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(createEvent.fulfilled(response.data));
      return response.data;
    } catch (error) {
      dispatch(createEvent.rejected(error.message));
      return rejectWithValue("error creating community");
    }
  }
);

export const getUserRooms = createAsyncThunk(
  "user/getUserRooms",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getUserRooms.pending());
      const currentState = getState();

      const response = await axios.get("http://192.168.1.5:8000/rooms/get", {
        headers: { Authorization: `Bearer ${currentState.user.user.token}` },
      });

      dispatch(getUserRooms.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getUserRooms.rejected(error.message));
      return rejectWithValue("error getting rooms");
    }
  }
);

export const getCommunityEvents = createAsyncThunk(
  "user/getCommunityEvents",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getCommunityEvents.pending());
      const currentState = getState();

      const response = await axios.get(
        "http://192.168.1.5:8000/community/events",
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(getCommunityEvents.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getCommunityEvents.rejected(error.message));
      return rejectWithValue("error getting events");
    }
  }
);

export const getCommunityEventsUser = createAsyncThunk(
  "user/getCommunityEventsUser",
  async (community, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getCommunityEventsUser.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/community_events",
        community,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(getCommunityEventsUser.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getCommunityEventsUser.rejected(error.message));
      return rejectWithValue("error getting events");
    }
  }
);

export const getEventApplicants = createAsyncThunk(
  "user/getEventApplicants",
  async (event, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getEventApplicants.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/events",
        event,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(getEventApplicants.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getEventApplicants.rejected(error.message));
      return rejectWithValue("error getting applicants");
    }
  }
);

export const getCommunities = createAsyncThunk(
  "user/getCommunities",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getCommunities.pending());
      const currentState = getState();

      const response = await axios.get("http://192.168.1.5:8000/community/", {
        headers: { Authorization: `Bearer ${currentState.user.user.token}` },
      });

      dispatch(getCommunities.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getCommunities.rejected(error.message));
      return rejectWithValue("error getting communities");
    }
  }
);

export const getCommunity = createAsyncThunk(
  "user/getCommunity",
  async (community, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getCommunity.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/details",
        community,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(getCommunity.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getCommunity.rejected(error.message));
      return rejectWithValue("error getting communities");
    }
  }
);

export const getEvent = createAsyncThunk(
  "user/getEvent",
  async (event, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getEvent.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/event",
        event,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(getEvent.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getEvent.rejected(error.message));
      return rejectWithValue("error getting event");
    }
  }
);

export const getAllEvents = createAsyncThunk(
  "user/getAllEvents",
  async (page, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getAllEvents.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/events",
        page,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(getAllEvents.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getAllEvents.rejected(error.message));
      return rejectWithValue("error getting events");
    }
  }
);

export const getQueryEvents = createAsyncThunk(
  "user/getQueryEvents",
  async (query, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getQueryEvents.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/search",
        query,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(getQueryEvents.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getQueryEvents.rejected(error.message));
      return rejectWithValue("error getting events");
    }
  }
);

export const apply = createAsyncThunk(
  "user/apply",
  async (eventId, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(apply.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/apply",
        eventId,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(apply.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(apply.rejected(error.message));
      return rejectWithValue("error applying");
    }
  }
);

export const accept = createAsyncThunk(
  "user/accept",
  async (details, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(accept.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/accept",
        details,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(accept.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(accept.rejected(error.message));
      return rejectWithValue("error accepting ");
    }
  }
);

export const reject = createAsyncThunk(
  "user/reject",
  async (details, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(reject.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/reject",
        details,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(reject.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(reject.rejected(error.message));
      return rejectWithValue("error accepting ");
    }
  }
);

export const cancel = createAsyncThunk(
  "user/cancel",
  async (eventId, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(cancel.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/community/cancel",
        eventId,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(cancel.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(cancel.rejected(error.message));
      return rejectWithValue("error applying");
    }
  }
);

export const getMatchingEvents = createAsyncThunk(
  "user/getMatchingEvents",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getMatchingEvents.pending());
      const currentState = getState();

      const response = await axios.get(
        "http://192.168.1.5:8000/community/sort",

        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(getMatchingEvents.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getMatchingEvents.rejected(error.message));
      return rejectWithValue("error getting events");
    }
  }
);

export const findEventsByApplicant = createAsyncThunk(
  "user/findEventsByApplicant",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(findEventsByApplicant.pending());
      const currentState = getState();

      const response = await axios.get(
        "http://192.168.1.5:8000/volunteer/find",

        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(findEventsByApplicant.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(findEventsByApplicant.rejected(error.message));
      return rejectWithValue("error getting events");
    }
  }
);

export const getNotUserRooms = createAsyncThunk(
  "user/getNotUserRooms",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getNotUserRooms.pending());
      const currentState = getState();

      const response = await axios.get("http://192.168.1.5:8000/rooms/join", {
        headers: { Authorization: `Bearer ${currentState.user.user.token}` },
      });

      dispatch(getNotUserRooms.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getNotUserRooms.rejected(error.message));
      return rejectWithValue("error getting rooms");
    }
  }
);

export const join = createAsyncThunk(
  "user/join",
  async (room, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(join.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/rooms/join",
        room,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(join.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(join.rejected(error.message));
      return rejectWithValue("error joining room");
    }
  }
);

export const getRoom = createAsyncThunk(
  "user/getRoom",
  async (room, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(getRoom.pending());
      const currentState = getState();

      const response = await axios.post(
        "http://192.168.1.5:8000/rooms/get",
        room,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(getRoom.fulfilled(response.data));

      return response.data;
    } catch (error) {
      dispatch(getRoom.rejected(error.message));
      return rejectWithValue("error getting chats");
    }
  }
);

export const verifyToken = createAsyncThunk(
  "user/verifyToken",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = await getData();
      dispatch(verifyToken.pending());
      // console.log("token", token);
      if (token == null) {
        return rejectWithValue("no token");
      }

      const response = await axios.get("http://192.168.1.5:8000/auth/verify", {
        headers: { Authorization: `Bearer ${await token}` },
      });

      dispatch(verifyToken.fulfilled(response.data));
      const currentState = getState();

      return response.data;
    } catch (error) {
      dispatch(verifyToken.rejected(error.message));
      return rejectWithValue("Invalid token");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(loginUser.pending());

      const response = await axios.post(
        "http://192.168.1.5:8000/auth/login",
        credentials
      );

      await storeData(response.data.token);
      dispatch(loginUser.fulfilled(response.data));
      const currentState = getState();
      console.log("Current State:", currentState);

      return response.data;
    } catch (error) {
      dispatch(loginUser.rejected(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const verifyImage = createAsyncThunk(
  "user/verify",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const currentState = getState();
      console.log("Current State:", currentState);
      dispatch(verifyImage.pending());
      const response = await axios.post(
        "http://192.168.1.5:8000/auth/verify",
        data,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(verifyImage.fulfilled());
      console.log(response);

      //   dispatch(verifyImage(data));
      // Handle successful login
    } catch (error) {
      dispatch(verifyImage.rejected(error.message));
      return rejectWithValue(error.message);
    }
  }
);
export const submitDocument = createAsyncThunk(
  "user/submitDoc",
  async (doc, { dispatch, getState, rejectWithValue }) => {
    try {
      const currentState = getState();
      console.log("Current State:", currentState);
      console.log(doc);

      dispatch(submitDocument.pending());
      const response = await FileSystem.uploadAsync(
        "http://192.168.1.5:8000/auth/resume",
        doc,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "resume",
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      const dataFromBody = JSON.parse(response.body);

      console.log(dataFromBody);

      dispatch(submitDocument.fulfilled(dataFromBody));
      return dataFromBody;
    } catch (error) {
      dispatch(submitDocument.rejected(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(registerUser.pending());

      const response = await axios.post(
        "http://192.168.1.5:8000/auth/register",
        userData
      );
      console.log(response.data);
      if (response.status == 200) {
        dispatch(registerUser.fulfilled());
      }

      return response.data;
    } catch (error) {
      dispatch(registerUser.rejected(error.message));
      return rejectWithValue("error registering user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(updateUser.pending());
      const currentState = getState();
      const response = await axios.post(
        "http://192.168.1.5:8000/auth/update",
        userData,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );
      console.log(response.data);
      if (response.status == 200) {
        dispatch(updateUser.fulfilled());
      }

      return response.data;
    } catch (error) {
      dispatch(updateUser.rejected(error.message));
      return rejectWithValue("error registering user");
    }
  }
);

export const editEvent = createAsyncThunk(
  "user/editEvent",
  async (event, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(editEvent.pending());
      const currentState = getState();
      const response = await axios.post(
        "http://192.168.1.5:8000/community/editEvent",
        event,
        {
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );
      console.log(response.data);
      if (response.status == 200) {
        dispatch(editEvent.fulfilled());
      }

      return response.data;
    } catch (error) {
      dispatch(editEvent.rejected(error.message));
      return rejectWithValue("error registering user");
    }
  }
);
export const sendPin = createAsyncThunk(
  "user/pin",
  async (email, { dispatch, rejectWithValue }) => {
    try {
      dispatch(sendPin.pending());

      const response = await axios.post(
        "http://192.168.1.5:8000/mail/reset",
        email
      );
      console.log(response.data);
      if (response.status == 200) {
        dispatch(sendPin.fulfilled());
      }

      return response.data;
    } catch (error) {
      dispatch(sendPin.rejected("error registering user"));
      return rejectWithValue(error.message);
    }
  }
);

export const verifyPin = createAsyncThunk(
  "user/verifyPin",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const { email, password, token, navigation } = data;
      dispatch(verifyPin.pending());

      const response = await axios.post("http://192.168.1.5:8000/auth/reset", {
        email,
        password,
        token,
      });

      dispatch(verifyPin.fulfilled());
      navigation.navigate("Signin");

      return response.data;
    } catch (error) {
      dispatch(verifyPin.rejected("error verifying pin"));
      return rejectWithValue("error verifying pin");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyImage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user.user.isIdImageUploaded = true;
      })
      .addCase(verifyImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendPin.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendPin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendPin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyPin.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyPin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.user.user.isResumeUploaded = true;
        state.extracted = action.payload;
      })
      .addCase(submitDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRoom.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.rooms = action.payload;
      })
      .addCase(getUserRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
      })
      .addCase(getRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.chat = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getNotUserRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotUserRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notRooms = action.payload;
      })
      .addCase(getNotUserRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCommunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCommunity.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCommunityEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommunityEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.communityEvents = action.payload;
      })
      .addCase(getCommunityEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteerEvents = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMatchingEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMatchingEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteerMatchingEvents = action.payload;
      })
      .addCase(getMatchingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findEventsByApplicant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findEventsByApplicant.fulfilled, (state, action) => {
        state.loading = false;
        state.eventsApplicationStatus = action.payload;
      })
      .addCase(findEventsByApplicant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(apply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apply.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(apply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancel.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(cancel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload;
      })
      .addCase(getCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEventApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.eventApplicants = action.payload;
      })
      .addCase(getEventApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(accept.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(accept.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(accept.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(reject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(reject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCommunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommunity.fulfilled, (state, action) => {
        state.loading = false;
        state.community = action.payload;
      })
      .addCase(getCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCommunityEventsUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommunityEventsUser.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteerEvents = action.payload;
      })
      .addCase(getCommunityEventsUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(join.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(join.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(join.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const AuthActions = userSlice.actions; // No regular actions
export default userSlice.reducer;
