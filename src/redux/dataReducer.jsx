import { createSlice } from '@reduxjs/toolkit';

// const defaultLaneNames = [
//   { id: 0, name: 'Top' },
//   { id: 1, name: 'Mid' },
//   { id: 2, name: 'Jungle' },
//   { id: 3, name: 'ADC' },
//   { id: 4, name: 'Support' },
// ];

const initialState = {};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    onLoadData: (state, { payload }) => {
      state.data = payload;
      //console.log(state.data);
    },

    editRecipes: (state, { payload }) => {
      switch (payload.type) {
        case '':
          break;
      }
    },
    // editRecipe: (state, { payload }) => {
    //   switch (payload.type) {
    //     case 'DELETE_INGREDIENT':
    //       break;
    //     case 'ADD_INGREDIENT':
    //       break;
    //     case 'PROPERTY_UPDATE':
    //       //if title is empty set default name
    //       break;
    //   }
    // },
  },
  //     editSettings: (state, { payload }) => {
  //       switch (payload.type) {
  //         case 'CHANGE_PLAYER_NAME':
  //           state.settings.players[payload.id].name = payload.name;
  //           break;

  //         case 'CHANGE_LANE_NAME':
  //           state.settings.availableLanes[payload.id].name = payload.name;
  //           break;

  //         case 'CHANGE_NUMBER_OF_PLAYERS':
  //           var playersArrayLenght = state.settings.players.length;
  //           var availableLanesLength = state.settings.availableLanes.length;
  //           var payloadLength = payload.count;
  //           if (
  //             playersArrayLenght < payloadLength &&
  //             state.settings.gameType === false
  //           ) {
  //             if (availableLanesLength < payloadLength) {
  //               for (
  //                 availableLanesLength;
  //                 availableLanesLength < payloadLength;
  //                 availableLanesLength++
  //               ) {
  //                 state.settings.availableLanes.push({
  //                   id: availableLanesLength,
  //                   name: defaultLaneNames[availableLanesLength].name,
  //                 });
  //               }
  //             }
  //             for (
  //               playersArrayLenght;
  //               playersArrayLenght < payloadLength;
  //               playersArrayLenght++
  //             ) {
  //               state.settings.players.push({
  //                 id: playersArrayLenght,
  //                 name: 'Player ' + (playersArrayLenght + 1),
  //               });
  //             }
  //           } else if (
  //             playersArrayLenght > payloadLength &&
  //             state.settings.gameType === false
  //           ) {
  //             if (availableLanesLength < payloadLength) {
  //               for (
  //                 availableLanesLength;
  //                 availableLanesLength < payloadLength;
  //                 availableLanesLength++
  //               ) {
  //                 state.settings.availableLanes.push({
  //                   id: availableLanesLength,
  //                   name: defaultLaneNames[availableLanesLength].name,
  //                 });
  //               }
  //             }
  //             var tmp = playersArrayLenght - payloadLength;
  //             state.settings.players.splice(payloadLength, tmp);
  //           }
  //           if (state.settings.players.length < state.normal.normPicks.length) {
  //             var tmp = playersArrayLenght - payloadLength;
  //             state.normal.normPicks.splice(payloadLength, tmp);
  //           }
  //           break;

  //         case 'CHANGE_NUMBER_OF_LANES':
  //           var playersArrayLenght = state.settings.players.length;
  //           var availableLanesLength = state.settings.availableLanes.length;
  //           var payloadLength = payload.count;

  //           if (
  //             availableLanesLength < payloadLength &&
  //             state.settings.gameType === false
  //           ) {
  //             for (
  //               availableLanesLength;
  //               availableLanesLength < payloadLength;
  //               availableLanesLength++
  //             ) {
  //               state.settings.availableLanes.push({
  //                 id: availableLanesLength,
  //                 name: defaultLaneNames[availableLanesLength].name,
  //               });
  //             }
  //           } else if (
  //             availableLanesLength > payloadLength &&
  //             state.settings.gameType === false
  //           ) {
  //             if (playersArrayLenght >= payloadLength) {
  //               var tmp = playersArrayLenght - payloadLength;
  //               state.settings.players.splice(payloadLength, tmp);
  //             }
  //             var tmp = availableLanesLength - payloadLength;
  //             state.settings.availableLanes.splice(payloadLength, tmp);
  //           }
  //           if (
  //             state.settings.availableLanes.length < state.normal.normPicks.length
  //           ) {
  //             var tmp = playersArrayLenght - payloadLength;
  //             state.normal.normPicks.splice(payloadLength, tmp);
  //           }
  //           break;

  //         case 'CHANGE_GAME_TYPE':
  //           if (payload.value === 'true') {
  //             state.settings.gameType = true;
  //             if (state.settings.players.length < 5) {
  //               var playersArrayLenght = state.settings.players.length;
  //               for (
  //                 playersArrayLenght;
  //                 playersArrayLenght < 5;
  //                 playersArrayLenght++
  //               ) {
  //                 state.settings.players.push({
  //                   id: playersArrayLenght,
  //                   name: 'Player ' + (playersArrayLenght + 1),
  //                 });
  //               }
  //             }
  //           } else if (payload.value === 'false') {
  //             state.settings.gameType = false;
  //           }
  //           break;

  //         case 'OPTIONAL_BANS':
  //           state.settings.optBans = !state.settings.optBans;
  //           break;
  //       }
  //     },

  //     firstPick: (state, payload) => {
  //       state.draft.firstPickTeam = payload.payload;
  //       state.draft.draftPicks = [];
  //     },

  //     draftPick: (state, { payload }) => {
  //       var resp = state.draft.draftPicks.some((e) => e.id === payload.id);
  //       if (resp) {
  //         const tempArr = state.draft.draftPicks.filter(
  //           (item) => item.id !== payload.id,
  //         );
  //         state.draft.draftPicks = tempArr;
  //       } else {
  //         var resp = state.draft.draftPicks.some(
  //           (e) => e.pickPos === payload.pickPos,
  //         );
  //         if (!resp) {
  //           state.draft.draftPicks.push({
  //             pickPos: payload.pickPos,
  //             team: payload.team,
  //             id: payload.id,
  //             name: payload.name,
  //           });
  //         }
  //       }
  //       state.draft.draftPicks.sort((a, b) => a.pickPos - b.pickPos);
  //     },

  //     banOrPick: (state, { payload }) => {
  //       switch (payload.type) {
  //         case 'NORMAL_OPTIONAL_BANS':
  //           var resp = state.normal.optBans.some((e) => e.id === payload.id);
  //           if (resp) {
  //             const tempArr = state.normal.optBans.filter(
  //               (item) => item.id !== payload.id,
  //             );
  //             state.normal.optBans = tempArr;
  //           } else {
  //             if (state.normal.optBans.length < 5) {
  //               state.normal.optBans.push({ id: payload.id, name: payload.name });
  //             }
  //           }
  //           resp = state.normal.normPicks.some((e) => e.id === payload.id);
  //           if (resp) {
  //             const tempArr = state.normal.normPicks.filter(
  //               (item) => item.id !== payload.id,
  //             );
  //             state.normal.normPicks = tempArr;
  //           }
  //           break;

  //         case 'NORMAL_PICKS':
  //           var resp = state.normal.normPicks.some((e) => e.id === payload.id);
  //           if (resp) {
  //             const tempArr = state.normal.normPicks.filter(
  //               (item) => item.id !== payload.id,
  //             );
  //             state.normal.normPicks = tempArr;
  //           } else {
  //             if (state.normal.normPicks.length < state.settings.players.length) {
  //               state.normal.normPicks.push({
  //                 id: payload.id,
  //                 name: payload.name,
  //               });
  //             }
  //           }
  //           break;

  //         case 'DRAFT_ALLY_BANS':
  //           var resp = state.draft.allyBans.some((e) => e.id === payload.id);
  //           if (resp) {
  //             const tempArr = state.draft.allyBans.filter(
  //               (item) => item.id !== payload.id,
  //             );
  //             state.draft.allyBans = tempArr;
  //           } else {
  //             if (state.draft.allyBans.length < 5) {
  //               state.draft.allyBans.push({ id: payload.id, name: payload.name });
  //             }
  //           }
  //           break;

  //         case 'DRAFT_ENEMY_BANS':
  //           var resp = state.draft.enemyBans.some((e) => e.id === payload.id);
  //           if (resp) {
  //             const tempArr = state.draft.enemyBans.filter(
  //               (item) => item.id !== payload.id,
  //             );
  //             state.draft.enemyBans = tempArr;
  //           } else {
  //             if (state.draft.enemyBans.length < 5) {
  //               state.draft.enemyBans.push({
  //                 id: payload.id,
  //                 name: payload.name,
  //               });
  //             }
  //           }
  //           break;
  //       }
  //     },
  //   },
});

export const { onLoadData, editRecipes, editRecipe } = dataSlice.actions;

export const selectData = (state) => state.data;

export default dataSlice.reducer;
