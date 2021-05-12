import { createSlice } from "@reduxjs/toolkit";
import { produce } from 'immer'; // 불변성 유지

/* Trilog - 트릴로그 */
const trilogSlice = createSlice({
    name : "trilog",
    initialState : {
        main : {
            list : [],
            is_last : false,
            page : 1,
        },
        detail : {
            information : {
                id: 1,
                title: '',
                description: '',
                address: '',
                likeNum: 0,
                commentNum: 0,
                modifiedAt: '2011-01-01 12:00:00',
            },
            author: {
                nickname: 'Triport',
                profileImgUrl: '',
            },
            member: {
                isLike: false,
                isMember: false,
            }
        },
        parent_comment : {
            list : [],
            is_last : false,
            page : 1
        },
        child_comment : {
            list : [],
        },
    },
    reducers: {
        setTrilogMainAdd : (state, action) => produce(state, (draft) => {
            draft.main.list = [...draft.main.list, ...action.payload.results];
            draft.main.is_last = action.payload.last;
        }),

        setTrilogMain : (state, action) => produce(state, (draft) => {
            draft.main.list = action.payload.results;
            draft.main.is_last = action.payload.last;
        }),

        setTrilogMainPage : (state, action) => produce(state, (draft) => {
            draft.main.page = action.payload;
        }),

        setTrilogLike : (state, action) => produce(state, (draft) => {
            // 게시물을 찾아서 isMembers 바꿈
            let idx = draft.main.list.findIndex((e) => e.information.id === action.payload);
            draft.main.list[idx].member.isLike = !draft.main.list[idx].member.isLike;
        }),

        setTrilogParentCommentPage : (state, action) => produce(state, (draft) => {
            draft.parent_comment.page = action.payload;
        }),

        setTrilogDetail : (state, action) => produce(state, (draft) => {
            draft.detail = action.payload.results;
        }),

        setTrilogParentComment : (state, action) => produce(state, (draft) => {
            draft.parent_comment.list = action.payload.results;
            draft.parent_comment.is_last = action.payload.last;
        }),

        addTrilogParentCommentScroll : (state, action) => produce(state, (draft) => {
            draft.parent_comment.list = [...draft.parent_comment.list, ...action.payload.results];
            draft.parent_comment.is_last = action.payload.last;
        }),

        setTrilogChildComment : (state, action) => produce(state, (draft) => {
            const comment = {
                parent_id : action.payload.parent_id,
                list : action.payload.results,
                is_last : action.payload.last,
                page : 1
            };
            draft.child_comment.list = [...draft.child_comment.list, comment];
        }),

        setTrilogDetailLike : (state, action) => produce(state, (draft) => {
            if(draft.detail.member.isLike){
                draft.detail.information.likeNum -= 1;
            } else {
                draft.detail.information.likeNum += 1;
            }
            
            draft.detail.member.isLike = !draft.detail.member.isLike;
        }),

        addTrilogParentComment : (state, action) => produce(state, (draft) => {
            draft.parent_comment.list = [...draft.parent_comment.list, action.payload.results];
            draft.detail.information.commentNum += 1;
        }),

        setTrilogParentCommentLike: (state, action) => produce(state, (draft) => {
            let idx = draft.parent_comment.list.findIndex((e) => e.commentParent.id === action.payload);
            if(draft.parent_comment.list[idx].user.isLike){
                draft.parent_comment.list[idx].commentParent.likeNum -= 1;
                draft.parent_comment.list[idx].user.isLike = !draft.parent_comment.list[idx].user.isLike;
            } else {
                draft.parent_comment.list[idx].commentParent.likeNum += 1;
                draft.parent_comment.list[idx].user.isLike = !draft.parent_comment.list[idx].user.isLike;
            }
        }),

        setTrilogChildCommentLike: (state, action) => produce(state, (draft) => {
            draft.child_comment.list.forEach((val, index) => {
                if(val.id === action.payload) {
                    console.log('skip', val)
                }
            })
        }),

    },
});

const getTrilogMain = (filter, keyword) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        const page = getState().trilog.main.page;
        fetch(`http://13.209.8.146/api/all/boards?page=${page}&filter=${filter}&keyword=${keyword}`, {
            method: 'GET',
            headers: {
                'Authorization' : `${access_token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(page === 1){
                dispatch(setTrilogMain(data));
            } else {
                console.log('Add')
                dispatch(setTrilogMainAdd(data));
            }
            
            if(!data.last) {
                dispatch(setTrilogMainPage(page + 1));
            } else {
                dispatch(setTrilogMainPage(1));
            }
        })
        .catch(err => console.log(err, "메인 error"));
    };
};

const getTrilogMainFilter = (filter, keyword) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        const page = 1;
        fetch(`http://13.209.8.146/api/all/boards?page=${page}&filter=${filter}&keyword=${keyword}`, {
            method: 'GET',
            headers: {
                'Authorization' : `${access_token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(page === 1){
                dispatch(setTrilogMain(data));
            } else {
                dispatch(setTrilogMainAdd(data));
            }
            
            if(!data.last) {
                dispatch(setTrilogMainPage(page + 1));
            } else {
                dispatch(setTrilogMainPage(1));
            }
        })
        .catch(err => console.log(err, "메인 필터 error"));
    };
};


const getTrilogDetail = (id) => {
    return async function (dispatch, getState, { history }) {
        const page = getState().trilog.parent_comment.page;
        const access_token = localStorage.getItem("access_token");
        const detail = await fetch(`http://13.209.8.146/api/all/boards/detail/${id}`, {
            method: 'GET',
            headers: {
                'Authorization' : `${access_token}`
            }
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err, 'trilog detail'));

        const comment = await fetch(`http://13.209.8.146/api/all/boards/comments/parents/${id}?page=1`, {
            method: 'GET',
            headers: {
                'Authorization' : `${access_token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(!data.last) {
                dispatch(setTrilogParentCommentPage(page + 1));
            } else {
                dispatch(setTrilogParentCommentPage(1));
            }
            return data;
        })
        .catch(err => console.log(err, 'trilog parent comment'));

        dispatch(setTrilogDetail(detail));
        dispatch(setTrilogParentComment(comment));
    };
};

const addTrilog = (trilog) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        if(trilog.is_edit) {
            fetch(`http://13.209.8.146/api/boards/${trilog.id}`, {
                method: 'PUT',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${access_token}`,
                },
                body: JSON.stringify({
                    title : trilog.title,
                    address : trilog.address,
                    description : trilog.description,
                    imageUrlList : trilog.imageUrlList,
                })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.msg);
                history.replace('/trilog');
            })
            .catch(err => console.log(err, 'Trilog Edit'))
        } else {
            fetch('http://13.209.8.146/api/boards/', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${access_token}`,
                },
                body: JSON.stringify({
                    title : trilog.title,
                    address : trilog.address,
                    description : trilog.description,
                    imageUrlList : trilog.imageUrlList,
                })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.msg);
                history.replace('/trilog');
            })
            .catch(err => console.log(err, 'Trilog Add'))
        }
    };
};

const setLikeTrilog = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        fetch(`http://13.209.8.146/api/boards/like/${id}`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 401){
                alert('로그인을 먼저 하세요!');
            } else {
                dispatch(setTrilogLike(id));
            }
        })
        .catch(err => console.log(err, 'trilog like'));
    };
};

const setLikeTrilogDetail = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        fetch(`http://13.209.8.146/api/boards/like/${id}`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 401){
                alert('로그인을 먼저 하세요!');
            } else {
                dispatch(setTrilogDetailLike());
            }
        })
        .catch(err => console.log(err, 'trilog detail like'));
    };
};

const getParentCommentScroll = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        const page = getState().trilog.parent_comment.page;
        fetch(`http://13.209.8.146/api/all/boards/comments/parents/${id}?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization' : `${access_token}`
            }
        })
        .then(res => res.json())
        .then(data => {     
            console.log(data, 'data');  
            if(!data.last) {
                dispatch(setTrilogParentCommentPage(page + 1));
            } else {
                dispatch(setTrilogParentCommentPage(1));
            }

            dispatch(addTrilogParentCommentScroll(data));
        })
        .catch(err => console.log(err, "부모 댓글 스크롤 error"));
    }
};

const addParentComment = (id, contents) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        fetch(`http://13.209.8.146/api/boards/comments/parents/${id}`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
            body: JSON.stringify({
                contents: contents,
            })
        })
        .then(res => res.json())
        .then(data => {
            dispatch(addTrilogParentComment(data));
            alert('댓글 등록이 완료되었습니다.');
        })
        .catch(err => console.log(err, 'add comment trilog'));
    };
};

const getChildComment = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");

        fetch(`http://13.209.8.146/api/all/boards/comments/children/${id}?page=1`, {
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            const new_date = { ...data, parent_id : id }
            dispatch(setTrilogChildComment(new_date));
        })
        .catch(err => console.log(err, 'get child comment trilog'));
    };
};

const addChildComment = (id, contents) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");

        fetch(`http://13.209.8.146/api/boards/comments/children/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
            body: JSON.stringify({
                contents: contents,
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err, 'child comment post'));

    };
};

const setParentCommentLike = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        const api = `http://13.209.8.146/api/boards/comments/parents/like/${id}`;

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setTrilogParentCommentLike(id));
        })
        .catch(err => console.log(err, 'comment like'));
    };
};

const setChildCommentLike = (parent_id, id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        const api = `http://13.209.8.146/api/boards/comments/children/like/${parent_id}`;

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setTrilogChildCommentLike(id));
        })
        .catch(err => console.log(err, 'child comment like'));
    };
};

const actionCreators = {
    getTrilogMain,
    getTrilogMainFilter,
    getTrilogDetail,
    addTrilog,
    setLikeTrilog,
    setLikeTrilogDetail,
    addParentComment,
    getChildComment,
    addChildComment,
    getParentCommentScroll,
    setParentCommentLike,
    setChildCommentLike,
};

export const { 
    setTrilogMain, 
    setTrilogDetail, 
    setTrilogMainPage, 
    setTrilogMainAdd, 
    setTrilogFilter,
    setTrilogLike,
    setTrilogParentComment, 
    setTrilogDetailLike, 
    setTrilogChildComment, 
    addTrilogParentComment, 
    setTrilogParentCommentPage, 
    addTrilogParentCommentScroll, 
    setTrilogParentCommentLike, 
    setTrilogChildCommentLike } = trilogSlice.actions;
export default trilogSlice.reducer;
export { actionCreators };