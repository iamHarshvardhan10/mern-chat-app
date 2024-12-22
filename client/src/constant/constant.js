export const HOST = import.meta.env.VITE_SERVER_API;

export const SIGNUP_ROUTES = `/api/auth/signup`;
export const LOGIN_ROUTES = `/api/auth/login`;
export const GET_USER_ROUTES = `/api/auth/userInfo`;
export const UPDATE_PROFILE_ROUTE = `/api/auth/updateprofile`
export const ADD_PROFILE_IMAGE = `/api/auth/addprofileimage`
export const REMOVE_PROFILE_IMAGE = `/api/auth/removeprofileimage`;
export const LOGOUT_ROUTE = `/api/auth/logout`;

export const SEARCH_CONTACTS_ROUTE = `/api/contact/search`
export const GET_DM_CONTACTS_ROUTE = `/api/contact/getContactsForDMList`
export const GET_ALL_CONTACTS = `/api/contact/getAllContacts`

export const MESSAGE_ROUTE = `/api/message/getmessage`


export const CREATE_CHANNEL_ROUTE = `/api/channel/createChannel`
