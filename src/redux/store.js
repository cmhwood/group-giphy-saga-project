import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, combineReducers } from "redux";
import axios from "axios";
import logger from "redux-logger";
import { takeEvery, put } from "redux-saga/effects";

// root saga
function* rootSaga() {
  yield takeEvery("FETCH_GIFS", fetchGifsSaga);
  yield takeEvery("FETCH_FAVORITES", fetchFavoritesSaga);
  yield takeEvery("UPDATE_CATEGORY", updateCategorySaga);
  yield takeEvery("ADD_FAVORITE", addFavoriteSaga);
  yield takeEvery("DELETE_FAVORITE", deleteFavoriteSaga);
}

// saga to GET gifs from giphy
function* fetchGifsSaga(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: "/api/search",
      params: {
        search: action.payload,
      },
    });
    console.log("ACTION PAYLOAD: ", action.payload);
    const fetchGifsAction = { type: "SET_GIFS", payload: response.data };
    yield put(fetchGifsAction);
  } catch (err) {
    alert("error searching");
    console.error(err);
  }
}

// saga to GET favorites from the server
function* fetchFavoritesSaga() {
  try {
    const response = yield axios.get("/api/favorites");
    yield put({ type: "SET_FAVORITES", payload: response.data });
  } catch (err) {
    alert("error fetching favorites");
    console.error(err);
  }
}

// saga to PUT / update the categories
function* updateCategorySaga(action) {
  try {
    yield axios.put(`/api/favorites/${action.payload.gifID}`, {
      category_id: action.payload.category_id,
      gifID: action.payload.gifID,
    });
    yield put({ type: "FETCH_FAVORITES" });
  } catch (err) {
    alert("error updating category");
    console.error(err);
  }
}

// saga to add to favorites
function* addFavoriteSaga(action) {
  try {
    yield axios.post("api/favorites", { url: action.payload });
    yield put({ type: "FETCH_FAVORITES" });
  } catch (err) {
    alert("error adding favorite");
    console.error(err);
  }
}

// saga to DELETE from favorites
function* deleteFavoriteSaga(action) {
  try {
    yield axios.delete(`/api/favorites/${action.payload}`);
    yield put({ type: "FETCH_FAVORITES" });
  } catch (error) {
    console.log("error deleting favorite", error);
  }
}

// reducers below
const gifListReducer = (state = [], action) => {
  if (action.type === "SET_GIFS") {
    return action.payload;
  } else {
    return state;
  }
};

const favoritesListReducer = (state = [], action) => {
  if (action.type === "SET_FAVORITES") {
    return action.payload;
  } else if (action.type === "ADD_FAVORITE_ITEM") {
    return [...state, action.payload];
  } else if (action.type === "DELETE_FAVORITE_ITEM") {
    return state.filter((favorite) => favorite.id != action.payload.id);
  } else {
    return state;
  }
};

// store...
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ gifs: gifListReducer, favorites: favoritesListReducer }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);
export default store;
