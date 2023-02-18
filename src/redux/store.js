import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Get, Save } from '../helper/Storage';

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        title: 'Hóa đơn',
        id: create_UUID(),
        Data: [],
        Date: new Date().toLocaleString()
    },
    reducers: {
        load: (state, action) => {
            state.Data = action.payload.Data;
            state.title = action.payload.title;
            state.Date = action.payload.Date;
            state.id = action.payload.id;
        },
        change: (state, action) => {
            if (!action.payload.value && action.payload.type != 'name') {
                action.payload.value = 0;
            }
            const newItem = state.Data.find(item => item.id == action.payload.id);
            newItem[action.payload.type] = action.payload.value;

            state.Data = [...state.Data.filter(item => item.id != action.payload.id), newItem];
        },
        changeTitle: (state, action) => {
            state.title = action.payload
        },
        sort: (state) => {
            state.Data = state.Data.sort((a, b) => a.id > b.id ? 1 : b.id > a.id ? -1 : 0);
        },
        add: (state, action) => {
            state.Data = [...state.Data, {
                name: '',
                price: 0,
                SL: 1,
                id: action.payload.id
            }]
        },
        remove: (state, action) => {
            state.Data = state.Data.filter(item => item.id != action.payload.id)
        }
    }
})

const savedSlice = createSlice({
    name: 'saved',
    initialState: {
        data: Get()
    },
    reducers: {
        removeSaved: (state, action) => {
            state.data = action.payload;
            Save(action.payload)
        },
        save: (state, action) => {
            Save(action.payload);
            state.data = Get();
        }
    }
})

export const { load, change, sort, add, remove, changeTitle } = dataSlice.actions
export const { removeSaved, save } = savedSlice.actions;

export const store = configureStore({
    reducer: { data: dataSlice.reducer, saved: savedSlice.reducer }
})